import * as z from "zod"

export const loginSchema = z.object({
    email: z.email({ message: "Please enter a valid email address." }).trim().max(100),
    password: z.string().min(1, { message: "Password is required." }).max(100),
})

export const registerSchema = z.object({
    email: z.email({ message: "Please enter a valid email address." })
        .trim()
        .max(100, "Email is too long."),

    username: z.string()
        .trim()
        .min(3, { message: "Username must be at least 3 characters." })
        .max(30, { message: "Username cannot exceed 30 characters." })
        .regex(/^[a-zA-Z0-9._-]+$/, "Only letters, numbers, dots, dashes, and underscores allowed."),

    password: z.string()
        .min(8, { message: "Password must be at least 8 characters." })
        .max(100)
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
        .regex(/[0-9]/, { message: "Password must contain at least one number." }),

    terms: z.boolean()
        .refine(val => val === true, { message: "You must accept the terms." }),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>