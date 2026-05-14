// app/actions/person.ts
'use server'

import { createClient } from "@/lib/supabase/server"
import { AddPersonInput, addPersonSchema, duplicateSearchSchema } from "@/lib/validations/person" // <--- Importiamo lo schema
import { revalidatePath } from "next/cache"
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
            .select('id, profile_id, first_name, last_name, slug, country, state')
            .eq('country', safeData.country)
            .ilike('last_name', `%${safeData.last_name}%`) // Usiamo i dati puliti

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

    // 2. VALIDAZIONE (Zod v4 syntax)
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
            .select('profile_id, slug')
            .single()

        if (error) throw error
        
        targetPath = `/persons/${data.profile_id}/${data.slug}`
        
        // In Next.js 16 è fondamentale invalidare la cache 
        // per vedere subito la nuova persona nelle liste
        revalidatePath('/persons') 

    } catch (error) {
        console.error("[ACTION ERROR]:", error)
        return { success: false, error: "Errore durante la creazione." }
    }

    // Il redirect va SEMPRE fuori dal blocco try/catch 
    // perché internamente lancia un errore che Next deve gestire
    redirect(targetPath)
}