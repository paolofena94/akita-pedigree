"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { avatarFileSchema, ProfileInput } from "@/lib/validations/user"
import { isUsernameTaken } from "@/lib/db/user"

export async function updateUserProfileAction(values: Partial<ProfileInput>) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { success: false, error: "Unauthorized access." }

    if (values.username) {
        const usernameTaken = await isUsernameTaken(values.username, user.id)
        if (usernameTaken) {
            return { success: false, error: "This username is already taken." }
        }
    }

    const { error: updateError } = await supabase
      .from('users')
      .update(values)
      .eq('user_id', user.id)

    if (updateError) throw updateError

    revalidatePath('/settings/profile')
    return { success: true }

  } catch (error) {
    console.error("Profile Action Error:", error)
    return { success: false, error: "An error occurred while saving your profile." }
  }
}

async function clearUserAvatarFolder(supabase: any, userId: string) {
  const { data: existingFiles } = await supabase.storage
    .from('avatars')
    .list(userId)

  if (existingFiles && existingFiles.length > 0) {
    const filesToRemove = existingFiles.map((file: any) => `${userId}/${file.name}`)
    await supabase.storage.from('avatars').remove(filesToRemove)
  }
}

// --- AZIONE 1: UPLOAD AVATAR ---
export async function uploadAvatarAction(formData: FormData) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { success: false, error: "Unauthorized access." }

    const file = formData.get("file") as File
    if (!file) return { success: false, error: "No file provided." }

    // Validazione
    const validation = avatarFileSchema.safeParse({ file })
    if (!validation.success) {
      return { success: false, error: validation.error.issues[0].message }
    }

    // 1. FACCIAMO PIAZZA PULITA! Cancelliamo tutto ciò che c'è nella sua cartella
    await clearUserAvatarFolder(supabase, user.id)

    const fileExt = file.name.split('.').pop()
    const fileName = `${user.id}/${Date.now()}.${fileExt}`

    // 2. Carichiamo il file nuovo fiammante
    const { data: storageData, error: storageError } = await supabase
      .storage
      .from('avatars')
      .upload(fileName, file, {
        upsert: true,
        contentType: file.type
      })

    if (storageError) throw storageError

    const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(fileName)
    const publicUrl = publicUrlData.publicUrl

    // 3. Aggiorniamo il DB
    const { error: dbError } = await supabase
      .from('users')
      .update({ avatar_url: publicUrl })
      .eq('user_id', user.id)

    if (dbError) throw dbError

    revalidatePath('/settings/profile')
    return { success: true, url: publicUrl }

  } catch (error: any) {
    console.error("Upload error:", error.message)
    return { success: false, error: "Critical error during upload. Please try again." }
  }
}

// --- AZIONE 2: RIMUOVI AVATAR ---
export async function removeAvatarAction() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { success: false, error: "Unauthorized access." }

    // 1. FACCIAMO PIAZZA PULITA! (Riutilizziamo la stessa identica logica)
    await clearUserAvatarFolder(supabase, user.id)

    // 2. Aggiorniamo il DB impostando a null
    const { error: dbError } = await supabase
      .from('users')
      .update({ avatar_url: null })
      .eq('user_id', user.id)

    if (dbError) throw dbError

    revalidatePath('/settings/profile')
    return { success: true }

  } catch (error: any) {
    console.error("Remove error:", error.message)
    return { success: false, error: "Critical error during removal. Please try again." }
  }
}