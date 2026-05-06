import * as z from "zod"

export const updateEmailSchema = z.object({
    email: z
        .string()
        .email({ message: "Please enter a valid email address." })
        .trim()
        .max(100, "Email is too long."),
})

export const updatePasswordSchema = z.object({
    // La password attuale segue le stesse regole larghe del loginSchema
    current: z
        .string()
        .min(1, { message: "Current password is required." })
        .max(100),
    
    // La nuova password richiede tutta la sicurezza del registerSchema
    new: z
        .string()
        .min(8, { message: "New password must be at least 8 characters." })
        .max(100)
        .regex(/[A-Z]/, { message: "New password must contain at least one uppercase letter." })
        .regex(/[0-9]/, { message: "New password must contain at least one number." }),
    
    // La conferma la controlliamo con il refine
    confirm: z
        .string()
        .min(1, { message: "Please confirm your new password." })
        
}).refine((data) => data.new === data.confirm, {
    message: "The new passwords do not match.",
    path: ["confirm"], // Evidenzia l'errore direttamente sull'input di conferma
})

export type UpdateEmailInput = z.infer<typeof updateEmailSchema>
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>