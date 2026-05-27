"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath, revalidateTag } from "next/cache" // Aggiunto revalidateTag
import { avatarFileSchema, ProfileInput } from "@/lib/validations/user"
import { isUsernameTaken } from "@/lib/db/user"

// Helper per centralizzare la rivalidazione dell'utente
// Evitiamo di ripetere queste 3 righe in ogni azione
async function revalidateUserCache(userId: string, oldUsername?: string, newUsername?: string) {
    // Invalida i dati granulari dell'utente
    revalidateTag(`user-${userId}`, 'hours')
    revalidateTag(`activity-${userId}`, 'hours')
    
    // Invalida la pagina delle impostazioni
    revalidatePath('/settings/profile')
    
    // INVECE di resettare tutto il blocco [username], colpiamo solo i due interessati:
    if (oldUsername) {
        revalidatePath(`/users/${oldUsername}`) // Forza il vecchio a diventare 404 subito
    }
    if (newUsername) {
        revalidatePath(`/users/${newUsername}`) // Forza il nuovo a mostrare i dati freschi
    }
}

export async function updateUserProfileAction(values: Partial<ProfileInput>) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { success: false, error: "Unauthorized access." }

    // 1. RECUPERIAMO IL VECCHIO USERNAME PRIMA DI AGGIORNARE
    // Ne approfittiamo per prenderlo dalla tabella users
    const { data: currentUserData } = await supabase
      .from('users')
      .select('username')
      .eq('user_id', user.id)
      .single()
      
    const oldUsername = currentUserData?.username

    // 2. CONTROLLO USERNAME DUPLICATO (Se l'utente sta provando a cambiarlo)
    if (values.username && values.username !== oldUsername) {
        const usernameTaken = await isUsernameTaken(values.username, user.id)
        if (usernameTaken) {
            return { success: false, error: "This username is already taken." }
        }
    }

    // 3. AGGIORNAMENTO
    const { error: updateError } = await supabase
      .from('users')
      .update(values)
      .eq('user_id', user.id)

    if (updateError) throw updateError

    // 4. RIVALIDAZIONE CHIRURGICA
    // Passiamo l'ID dell'utente, il vecchio username (per farlo diventare 404) 
    // e il nuovo username (se è stato modificato, altrimenti passiamo lo stesso)
    await revalidateUserCache(user.id, oldUsername, values.username || oldUsername)
    
    return { success: true }

  } catch (error) {
    console.error("Profile Action Error:", error)
    return { success: false, error: "An error occurred while saving your profile." }
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

    const validation = avatarFileSchema.safeParse({ file })
    if (!validation.success) {
      return { success: false, error: validation.error.issues[0].message }
    }

    await clearUserAvatarFolder(supabase, user.id)

    const fileExt = file.name.split('.').pop()
    const fileName = `${user.id}/${Date.now()}.${fileExt}`

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

    // TRUCCO: Aggiungiamo .select('username').single() per recuperare l'username al volo
    const { data: userData, error: dbError } = await supabase
      .from('users')
      .update({ avatar_url: publicUrl })
      .eq('user_id', user.id)
      .select('username')
      .single()

    if (dbError) throw dbError

    // RIVALIDAZIONE CHIRURGICA
    // Passiamo lo stesso username sia come vecchio che come nuovo perché in questo caso non è cambiato,
    // ma vogliamo che la pagina pubblica di questo specifico utente si aggiorni con il nuovo avatar!
    if (userData?.username) {
        await revalidateUserCache(user.id, userData.username, userData.username)
    }
    
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

    await clearUserAvatarFolder(supabase, user.id)

    // Stesso trucco qui: recuperiamo l'username mentre impostiamo l'avatar a null
    const { data: userData, error: dbError } = await supabase
      .from('users')
      .update({ avatar_url: null })
      .eq('user_id', user.id)
      .select('username')
      .single()

    if (dbError) throw dbError

    // RIVALIDAZIONE CHIRURGICA
    if (userData?.username) {
        await revalidateUserCache(user.id, userData.username, userData.username)
    }
    
    return { success: true }

  } catch (error: any) {
    console.error("Remove error:", error.message)
    return { success: false, error: "Critical error during removal. Please try again." }
  }
}

// Questo helper va benissimo così com'è, non necessita di modifiche alla cache
async function clearUserAvatarFolder(supabase: any, userId: string) {
  const { data: existingFiles } = await supabase.storage
    .from('avatars')
    .list(userId)

  if (existingFiles && existingFiles.length > 0) {
    const filesToRemove = existingFiles.map((file: any) => `${userId}/${file.name}`)
    await supabase.storage.from('avatars').remove(filesToRemove)
  }
}