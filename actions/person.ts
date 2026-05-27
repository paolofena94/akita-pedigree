// app/actions/person.ts
'use server'

import { createClient } from "@/lib/supabase/server"
import { AddPersonInput, addPersonSchema, duplicateSearchSchema, getEditPersonSchema } from "@/lib/validations/person"
import { SupabaseClient } from "@supabase/supabase-js"
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import z from "zod"

export async function checkExistingPersonsAction(firstName: string, lastName: string, country: string) {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        return { success: false, error: "Unauthorized request." }
    }

    const parsedInput = duplicateSearchSchema.safeParse({
        first_name: firstName,
        last_name: lastName,
        country: country
    })

    if (!parsedInput.success) {
        const flatErrors = z.flattenError(parsedInput.error).fieldErrors;
        console.error("Zod Validation Failed:", flatErrors);
        return { success: false, error: "Invalid data provided." };
    }

    const safeData = parsedInput.data;

    try {
        let query = supabase
            .from('persons')
            .select('id, public_id, first_name, last_name, slug, country, state')
            .eq('country', safeData.country)
            .ilike('last_name', `%${safeData.last_name}%`)

        if (safeData.first_name) {
            query = query.ilike('first_name', `%${safeData.first_name}%`)
        }

        const { data, error } = await query.limit(5)

        if (error) throw error;

        return { success: true, data }

    } catch (error) {
        console.error("[ACTION ERROR] checkExistingPersonsAction:", error)
        return { success: false, error: "Internal server error during duplicate check." }
    }
}

export async function createPersonAction(rawInput: AddPersonInput) {
    const supabase = await createClient()

    // 1. AUTENTICAZIONE
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        return { success: false, error: "Unauthorized access." }
    }

    // 2. VALIDAZIONE
    const parsedInput = addPersonSchema.safeParse(rawInput)
    if (!parsedInput.success) {
        const flatErrors = z.flattenError(parsedInput.error).fieldErrors;
        console.error("Validation failed:", flatErrors);
        return { success: false, error: "Invalid data provided." }
    }

    const safeData = parsedInput.data;
    let targetPath = ""

    try {
        // 3. INSERIMENTO
        const { data, error } = await supabase
            .from('persons')
            .insert({
                first_name: safeData.first_name || null,
                last_name: safeData.last_name,
                country: safeData.country,
                state: safeData.state || null,
                website_url: safeData.website_url || null,
                notes: safeData.notes || null,
            })
            .select('public_id, slug')
            .single()

        if (error) throw error

        targetPath = `/persons/${data.public_id}/${data.slug}`

        // INVALIDAZIONE CACHE (Next 16)
        revalidatePath('/persons')
        revalidateTag(`activity-user-${user.id}`, 'hours')

    } catch (error) {
        console.error("[ACTION ERROR]:", error)
        return { success: false, error: "Errore durante la creazione." }
    }

    redirect(targetPath)
}

export async function claimPersonAction(personId: string, personPublicId: string, personSlug: string | null) {
    const supabase = await createClient();

    // 1. Verifica autenticazione
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { success: false, error: "You must be logged in to claim a profile." };
    }

    const { data: existingClaim, error: checkError } = await supabase
        .from('persons')
        .select('id')
        .eq('claimed_by_user_id', user.id)
        .limit(1)
        .maybeSingle();

    if (checkError) {
        console.error("[ACTION] Error checking existing claim:", checkError.message);
        return { success: false, error: "An error occurred while verifying your account." };
    }

    if (existingClaim) {
        return { success: false, error: "You have already claimed a profile. Each user can only manage one profile." };
    }

    // 2. Aggiorna il database
    const { error } = await supabase
        .from('persons')
        .update({
            claimed_by_user_id: user.id,
            notes: null
        })
        .eq('id', personId)
        .is('claimed_by_user_id', null);

    if (error) {
        console.error("[ACTION] Error claiming person:", error.message);
        return { success: false, error: "Failed to claim profile. It might have already been claimed." };
    }

    // INVALIDAZIONE CACHE (Next 16)
    revalidateTag(`person-${personPublicId}`, 'hours');
    revalidateTag(`activity-user-${user.id}`, 'hours'); // Aggiunto per aggiornare i log attività del claimer

    const redirectUrl = `/persons/${personPublicId}${personSlug ? `/${personSlug}` : ''}`;
    revalidatePath(redirectUrl, 'page');

    return { success: true };
}

export async function updatePersonAction(recordId: string, rawFormData: unknown) {
    try {
        const supabase = await createClient();

        // 1. Otteniamo l'utente corrente
        const { data: { user } } = await supabase.auth.getUser();

        // 2. Recuperiamo lo stato ATTUALE del record dal database
        const { data: currentPerson, error: fetchError } = await supabase
            .from('persons')
            .select('id, public_id, claimed_by_user_id')
            .eq('id', recordId)
            .single();

        if (fetchError || !currentPerson) {
            throw new Error("Record not found or database error.");
        }

        const isClaimed = !!currentPerson.claimed_by_user_id;

        // 3. CONTROLLO AUTORIZZAZIONI STRINGER
        if (isClaimed) {
            if (!user || user.id !== currentPerson.claimed_by_user_id) {
                throw new Error("Unauthorized: Only the owner can edit this claimed profile.");
            }
        }

        // 4. VALIDAZIONE ZOD LATO SERVER
        const schema = getEditPersonSchema(isClaimed);
        const parsed = schema.safeParse(rawFormData);

        if (!parsed.success) {
            console.error("Validation Error:", parsed.error.format());
            throw new Error("Invalid data provided.");
        }

        const validData = parsed.data;

        // 5. GESTIONE MEDIA (Upload su Storage)
        let finalMediaArray = [];
        if ('media' in validData && Array.isArray(validData.media)) {
            for (const mediaItem of validData.media) {
                if (mediaItem.file instanceof File) {
                    // 🌟 È un NUOVO file caricato dall'utente, eseguiamo l'upload!
                    try {
                        const publicUrl = await uploadEntityMedia(
                            supabase,
                            mediaItem.file,
                            'persons', // La root folder (passerai 'akitas' nella action dell'Akita)
                            recordId   // La sub-folder (l'ID del record)
                        );

                        finalMediaArray.push({
                            src: publicUrl,
                            description: mediaItem.description || "",
                            copyright: mediaItem.copyright || ""
                        });
                    } catch (uploadErr) {
                        console.error("Media upload failed for one item:", uploadErr);
                        throw new Error("Failed to upload one or more images.");
                    }
                } else if (mediaItem.src && !mediaItem.src.startsWith('blob:')) {
                    // 🌟 È un'immagine VECCHIA. Mantieni i testi, conserva l'URL.
                    finalMediaArray.push({
                        src: mediaItem.src,
                        description: mediaItem.description || "",
                        copyright: mediaItem.copyright || ""
                    });
                }
            }
        }

        // 6. PREPARAZIONE DATI PER IL DB (Sanificazione stringhe vuote in NULL)
        const dbPayload: any = {
            first_name: validData.first_name || null,
            last_name: validData.last_name,
            country: validData.country,
            state: validData.state || null,
            website_url: validData.website_url || null,
            notes: validData.notes || null,
        };

        if (isClaimed) {
            const fullData = validData as any;
            dbPayload.city = fullData.city || null;
            dbPayload.address_street = fullData.address_street || null;
            dbPayload.postal_code = fullData.postal_code || null;
            dbPayload.bio = fullData.bio || null;
            dbPayload.email = fullData.email || null;
            dbPayload.phone = fullData.phone || null;
            dbPayload.media = finalMediaArray;
        }

        // 7. ESECUZIONE DELL'UPDATE SUL DB
        const { error: updateError } = await supabase
            .from('persons')
            .update(dbPayload)
            .eq('id', recordId);

        if (updateError) {
            console.error("DB Update Error:", updateError);
            throw new Error("Failed to save changes to the database.");
        }

        // 8. AUDIT LOG 
        await supabase.from('audit_logs').insert({
            table_name: 'persons',
            record_id: recordId,
            action: 'UPDATE',
            author_id: user?.id || null,
            changes: dbPayload,
            edit_notes: validData.notes || null // <-- Corretto
        });

        // 9. INVALIDAZIONE CACHE (Next.js 16)
        revalidateTag(`person-${currentPerson.public_id}`, 'hours');
        revalidateTag(`activity-entity-${recordId}`, 'hours');

        if (user) {
            revalidateTag(`activity-user-${user.id}`, 'hours');
        }

        return { success: true };

    } catch (error: any) {
        return { success: false, error: error.message || "An unexpected error occurred." };
    }
}


export async function uploadEntityMedia(
    supabase: SupabaseClient,
    file: File,
    entityType: string,
    recordId: string
): Promise<string> {

    // 1. Pulizia e generazione nome (Timestamp + 6 caratteri random)
    const fileExt = file.name.split('.').pop() || 'jpg';
    const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

    // 2. Struttura cartelle: entityType/recordId/fileName
    const filePath = `${entityType}/${recordId}/${cleanFileName}`;

    // 3. Upload nel bucket 'gallery' (assicurati di crearlo in Supabase e renderlo PUBBLICO)
    const { error: uploadError } = await supabase
        .storage
        .from('gallery')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false // False perché con il timestamp il nome è sempre unico
        });

    if (uploadError) {
        console.error("Storage upload error:", uploadError);
        throw new Error("Failed to upload image.");
    }

    // 4. Ottieni l'URL finale per salvarlo nel database JSONB
    const { data: { publicUrl } } = supabase
        .storage
        .from('gallery')
        .getPublicUrl(filePath);

    return publicUrl;
}