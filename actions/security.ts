"use server"

import { createClient } from "@/lib/supabase/server"
import { updateEmailSchema, updatePasswordSchema } from "@/lib/validations/security"
import { redirect } from "next/navigation"
import { createClient as createAdminClient } from "@supabase/supabase-js"

export async function updateEmailAction(formData: FormData) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { success: false, error: "Unauthorized" }

    const email = formData.get("email") as string
    const validation = updateEmailSchema.safeParse({ email })

    if (!validation.success) {
      return { success: false, error: validation.error.issues[0].message }
    }

    if (email === user.email) {
      return { success: false, error: "This is already your current email." }
    }

    const { error } = await supabase.auth.updateUser({ email })

    if (error) throw error

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update email." }
  }
}

export async function updatePasswordAction(formData: FormData) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user || !user.email) return { success: false, error: "Unauthorized" }

    const data = {
      current: formData.get("current") as string,
      new: formData.get("new") as string,
      confirm: formData.get("confirm") as string,
    }

    const validation = updatePasswordSchema.safeParse(data)
    if (!validation.success) {
      return { success: false, error: validation.error.issues[0].message }
    }

    // Verifichiamo che la password vecchia sia corretta
    // provando a fare un finto login con la password attuale
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: data.current,
    })

    if (signInError) {
      return { success: false, error: "Incorrect current password." }
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: data.new
    })

    if (updateError) throw updateError

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update password." }
  }
}

// 3. ELIMINAZIONE ACCOUNT
export async function deleteAccountAction() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { success: false, error: "Unauthorized" }

    const supabaseAdmin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id)

    if (error) throw error

    await supabase.auth.signOut()
    
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete account." }
  }
  
  redirect("/") 
}