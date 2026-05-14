import { createClient } from "@/lib/supabase/server";
import { Database, Tables } from "@/types/database.types";
import { QueryData, SupabaseClient, User } from "@supabase/supabase-js";
import { cacheTag } from "next/cache";
import { cache } from "react";


type UserProfileSnippet = Pick<Tables<'users'>, 'username' | 'bio' | 'avatar_url'>;

/**
 * Single Source of Truth per l'estrazione dello snippet utente.
 */
export const getUserSnippet = cache(async (userId: string): Promise<UserProfileSnippet | null> => {
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
});

/**
 * Risolutore del contesto di sessione.
 */
export const getCurrentUserSnippet = cache(async (): Promise<{ user: User | null, profile: UserProfileSnippet | null }> => {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { user: null, profile: null };
    }

    const profile = await getUserSnippet(user.id);

    return { user, profile };
});

/* export async function isUsernameTaken(newUsername: string, currentUsername: string) {
    const supabase = await createClient()

    const { data } = await supabase
        .from('users')
        .select('user_id')
        .eq('username', newUsername)
        .neq('user_id', currentUsername)
        .single()

    // Il "!!" trasforma un oggetto in true (se esiste) o false (se è null)
    return !!data
} */

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

const getUserProfileQuery = (supabase: SupabaseClient<Database>, username: string) =>
    supabase
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

// TypeScript ora dedurrà un oggetto completo e i relativi array relazionali
export type UserProfilePageData = QueryData<ReturnType<typeof getUserProfileQuery>>;

export async function getUserProfilePageData(username: string) {
    // Efficienza: Caching persistente dell'output della funzione (Next.js 16)
    "use cache";
    
    // Affidabilità: Assegnazione di un tag univoco per invalidazione mirata
    cacheTag(`user-${username}`);

    const supabase = await createClient();
    const query = getUserProfileQuery(supabase, username);
    const { data, error } = await query;

    if (error) {
        console.error('[DAL] Error fetching user profile page data:', error.message);
        return null;
    }

    return data as UserProfilePageData;
}