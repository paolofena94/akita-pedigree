'use server'

import { isUsernameTaken } from "@/lib/db/user";
import { createClient } from "@/lib/supabase/server";
import { LoginInput, RegisterInput } from "@/lib/validations/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signUpAction(data: RegisterInput) {
    // Passiamo una stringa vuota per currentUserId perché l'utente non esiste ancora
    const usernameTaken = await isUsernameTaken(data.username, "")

    if (usernameTaken) {
        return { 
            success: false, 
            error: "This username is already taken. Please choose another one." 
        }
    }

    const supabase = await createClient()
    
    const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: { 
            data: { username: data.username } 
        }
    })

    if (error) {
        return { success: false, error: error.message }
    }
    
    return { success: true }
}

export async function loginAction(data: LoginInput, redirectTo?: string) {
    const supabase = await createClient()
    
    const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
    })

    if (error) {
        return { success: false, error: error.message }
    }

    redirect(redirectTo || "/")
}

export async function signOutAction() {
    const supabase = await createClient();
    await supabase.auth.signOut();

    revalidatePath('/', 'layout');
    redirect('/');
}