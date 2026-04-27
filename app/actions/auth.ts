'use server'

import { createClient } from "@/lib/supabase/server";
import { LoginInput, RegisterInput } from "@/lib/validations/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signUpAction(data: RegisterInput) {
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

export async function signInAction(data: LoginInput) {
    const supabase = await createClient()
    
    const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
    })

    if (error) {
        return { success: false, error: error.message }
    }

    return { success: true }
}

export async function signOutAction() {
    const supabase = await createClient();
    await supabase.auth.signOut();

    revalidatePath('/', 'layout');
    redirect('/');
}