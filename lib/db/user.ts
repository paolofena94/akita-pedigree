import { createClient } from "@/lib/supabase/server";
import { Tables } from "@/types/database.types";
import { User } from "@supabase/supabase-js";
import { cacheLife, cacheTag } from "next/cache";
import { createAdminClient } from "../supabase/admin";
import { UserData } from "@/types/users";
import { PersonSnippet } from "@/types/person";

type UserProfileSnippet = Pick<Tables<'users'>, 'username' | 'bio' | 'avatar_url'>;


export async function getUserSnippet(userId: string): Promise<UserProfileSnippet | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('users')
        .select('username, avatar_url, bio')
        .eq('user_id', userId)
        .maybeSingle();

    if (error) {
        console.error('[DAL] getUserSnippet error:', error.message);
        return null;
    }

    return data;
}


export async function getCurrentUserSnippet(): Promise<{ 
    user: User | null; 
    profile: UserProfileSnippet | null;
    hasClaimedProfile: boolean; // Il nostro nuovo flag!
}> {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { user: null, profile: null, hasClaimedProfile: false };
    }

    // Usiamo la tua funzione originale per recuperare lo snippet
    const profile = await getUserSnippet(user.id);

    // Facciamo una query HTTP "HEAD" ultra-leggera per vedere se ha record in "persons".
    // Zero payload di rete, restituisce solo il conteggio!
    const { count, error } = await supabase
        .from('persons')
        .select('id', { count: 'exact', head: true })
        .eq('claimed_by_user_id', user.id);

    if (error) {
        console.error('[DAL] Error checking existing claims:', error.message);
    }

    const hasClaimedProfile = (count ?? 0) > 0;

    return { user, profile, hasClaimedProfile };
}


// ==========================================
// Resto del codice invariato e perfetto!
// ==========================================

export async function isUsernameTaken(newUsername: string, currentUsername: string): Promise<boolean> {
    const supabase = await createClient();

    // Efficienza: 'head: true' fa una richiesta HTTP HEAD. Il DB restituisce solo il conteggio, 
    // zero payload di rete. Evita l'eccezione nativa di .single().
    const { count, error } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('username', newUsername)
        .neq('username', currentUsername); // Corretto: comparazione tra colonne omogenee

    if (error) {
        console.error("[DAL] Errore verifica unicità username:", error.message);
        // Sicurezza (Fail-Safe): In caso di errore DB, blocca la registrazione/update restituendo true
        return true;
    }

    return (count ?? 0) > 0;
}


export async function getUserData(username: string): Promise<UserData | null> {
    "use cache";
    cacheLife('hours');
    cacheTag(`user-${username}`);

    const supabaseAdmin = createAdminClient();
    
    const { data, error } = await supabaseAdmin
        .from('users')
        .select(`
            user_id,
            username,
            avatar_url,
            bio,
            created_at,
            persons!persons_claimed_by_user_id_fkey (
                id,
                public_id,
                first_name,
                last_name,
                slug
            )
        `)
        .eq('username', username)
        .maybeSingle();

    // 1. Gestione Pulita: Errore del Database
    if (error) {
        console.error('[DAL] Error fetching user profile data:', error.message);
        return null;
    }

    // 2. Gestione Pulita: Utente non trovato (il payload 'data' è vuoto)
    if (!data) {
        return null;
    }

    const rawPerson = data.persons ?? null;

    const linkedPerson: PersonSnippet | null = rawPerson ? {
        id: rawPerson.id,                 
        public_id: rawPerson.public_id,   
        first_name: rawPerson.first_name ?? "", 
        last_name: rawPerson.last_name,
        slug: rawPerson.slug
    } : null;

    const userProfile: UserData = {
        user_id: data.user_id,
        username: data.username,
        avatar_url: data.avatar_url,
        bio: data.bio,
        created_at: data.created_at, // Se è null passa liscio alla UI
        linkedPerson: linkedPerson
    };

    return userProfile;
}