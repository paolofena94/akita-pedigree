import { cacheTag, cacheLife } from "next/cache"
import { createAnonClient } from "../supabase/anon";
import { PersonData } from "@/types/person";
import { parseEntityMedia } from "../parsers/media-parser";

type AuditAuthor = { username: string | null };

export async function getPersonData(publicId: string): Promise<PersonData | null> {
    "use cache"

    const numericId = parseInt(publicId, 10);
    if (isNaN(numericId)) return null;

    cacheTag(`person-${numericId}`)
    cacheLife('hours')

    const supabase = createAnonClient()

    // 1. QUERY PRINCIPALE
    // 🌟 RISOLTO: puntiamo alla foreign key 'claimed_by_user_id' ed estraiamo 'user_id' e 'username' da users
    const { data: person, error: personError } = await supabase
        .from('persons')
        .select(`
            *,
            claimed_by:users!claimed_by_user_id ( user_id, username ) 
        `)
        .eq('public_id', numericId)
        .maybeSingle()

    if (personError) {
        console.error("[DAL] Database error fetching person:", personError.message);
        return null;
    }

    if (!person) return null;

    // 2. QUERY IN PARALLELO
    const [
        creationLogRes,
        updateLogRes,
        bredDogsRes,
        ownedDogsRes,
        kennelsRes
    ] = await Promise.all([
        supabase.from('audit_logs').select(`created_at, author:users (username)`).eq('table_name', 'persons').eq('record_id', person.id).eq('action', 'INSERT').maybeSingle(),
        supabase.from('audit_logs').select(`created_at, author:users (username)`).eq('table_name', 'persons').eq('record_id', person.id).eq('action', 'UPDATE').order('created_at', { ascending: false }).limit(1).maybeSingle(),
        supabase.from('akitas').select('id', { count: 'exact', head: true }).eq('breeder_id', person.id),
        supabase.from('akitas').select('id', { count: 'exact', head: true }).eq('owner_id', person.id), 
        supabase.from('kennel_members').select('id', { count: 'exact', head: true }).eq('person_id', person.id)
    ]);

    // 3. ESTRAZIONE AUTORI LOG IN MODO DIFENSIVO
    const extractUser = (userData: unknown): AuditAuthor | null => {
        if (!userData) return null;
        
        if (Array.isArray(userData)) {
            const first = userData[0];
            return first && typeof first === 'object' && 'username' in first 
                ? (first as AuditAuthor) 
                : null;
        }
        
        if (typeof userData === 'object' && 'username' in userData) {
            return userData as AuditAuthor;
        }
        
        return null;
    };
    
    const createdAuthor = extractUser(creationLogRes.data?.author);
    const updatedAuthor = extractUser(updateLogRes.data?.author);

    // 4. PREPARAZIONE MEDIA E PULIZIA
    const safeMedia = parseEntityMedia(person.media);

    // 🌟 Rimuoviamo la chiave esterna originale dalla radice per non sporcare l'oggetto tipizzato
    const { claimed_by_user_id, ...personData } = person; 

    // 5. ASSEMBLAGGIO FINALE
    return {
        ...personData,
        media: safeMedia,
        // 🌟 Mappato correttamente con il tipo { user_id, username }
        claimed_by: person.claimed_by as { user_id: string; username: string } | null,
        metadata: {
            created: creationLogRes.data ? {
                created_at: creationLogRes.data.created_at,
                username: createdAuthor?.username || null,
            } : null,
            last_modified: updateLogRes.data ? {
                created_at: updateLogRes.data.created_at,
                username: updatedAuthor?.username || null,
            } : null
        },
        stats: {
            bredDogsCount: bredDogsRes.count || 0,
            ownedDogsCount: ownedDogsRes.count || 0,
            kennelsCount: kennelsRes.count || 0,
        }
    };
}