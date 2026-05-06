import * as z from "zod"

export const userProfileSchema = z.object({
  username: z.string().min(3, "Minimo 3 caratteri").max(25, "Massimo 25 caratteri"),
  bio: z.string().max(160, "Massimo 160 caratteri").nullable(),
})

export type ProfileInput = z.infer<typeof userProfileSchema>

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const avatarFileSchema = z.object({
  file: z
    .custom<File>()
    .refine((file) => file instanceof File, "Si prega di selezionare un file valido.")
    .refine((file) => file.size <= MAX_FILE_SIZE, `La dimensione massima è 2MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Sono supportati solo i formati .jpg, .png e .webp."
    ),
})

export type AvatarFileInput = z.infer<typeof avatarFileSchema>