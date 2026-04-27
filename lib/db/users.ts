import { createClient } from "@/lib/supabase/server";

export async function getCurrentUserProfile() {
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { user: null, profile: null };
    }

    const { data: profile, error } = await supabase
        .from('users')
        .select('username, avatar_url')
        .eq('user_id', user.id)
        .maybeSingle();

    if (error) {
        console.error("Errore nel recupero del profilo:", error.message);
    }

    return { user, profile };
}