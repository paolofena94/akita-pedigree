import { createClient } from "@/lib/supabase/server";

export async function getCurrentUserProfile() {
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { user: null, profile: null };
    }

    const { data: profile, error } = await supabase
        .from('users')
        .select('username, bio, avatar_url')
        .eq('user_id', user.id)
        .maybeSingle();

    if (error) {
        console.error("Errore nel recupero del profilo:", error.message);
    }

    return { user, profile };
}

export async function isUsernameTaken(newUsername: string, currentUsername: string) {
  const supabase = await createClient()
  
  const { data } = await supabase
    .from('users')
    .select('user_id')
    .eq('username', newUsername)
    .neq('user_id', currentUsername)
    .single()

  // Il "!!" trasforma un oggetto in true (se esiste) o false (se è null)
  return !!data 
}