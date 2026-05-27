import { z } from "zod";
import { EntityMediaSchema } from "./media";

// ==========================================
// REGEX E SCHEMI CONDIVISI
// ==========================================
export const nameRegex = /^[a-zA-Z\s.\-']+$/;

// 🌟 I CAMPI COMUNI: Regole ferree definite una volta sola
const basePersonFields = {
  first_name: z.string()
    .trim()
    .max(100, "First name cannot exceed 100 characters")
    .refine(val => val === '' || nameRegex.test(val), {
      message: "First name contains invalid characters"
    })
    .optional(),

  last_name: z.string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(100, "Last name cannot exceed 100 characters")
    .regex(nameRegex, "Last name contains invalid characters"),

  country: z.string()
    .trim()
    .toUpperCase()
    .length(2, "Please select a valid country")
    .regex(/^[A-Z]{2}$/, "Invalid country code"),

  state: z.string()
    .trim()
    .max(100, "State/Province cannot exceed 100 characters")
    .refine(val => val === '' || nameRegex.test(val), {
      message: "State contains invalid characters"
    })
    .optional(),

  website_url: z.union([
    z.literal(""),
    z.url("Please enter a valid URL (e.g. https://...)").max(2048)
  ]).optional(),

  // 🌟 SPOSTATO QUI: Ora le note sono incluse in tutti i form
  notes: z.string()
    .trim()
    .max(200, "Notes cannot exceed 200 characters")
    .optional(),
};

// ==========================================
// SCHEMA: AGGIUNTA PERSONA
// ==========================================
export const addPersonSchema = z.object({
  ...basePersonFields,
});

export type AddPersonInput = z.infer<typeof addPersonSchema>;


// ==========================================
// SCHEMA: RICERCA DUPLICATI
// ==========================================
export const duplicateSearchSchema = addPersonSchema.pick({
  first_name: true,
  last_name: true,
  country: true
});

export type DuplicateSearchInput = z.infer<typeof duplicateSearchSchema>;


// ==========================================
// SCHEMA: MODIFICA PERSONA (EditEntitySheet)
// ==========================================
const claimedOnlyFields = {
  city: z.string()
    .trim()
    .max(100)
    .optional(),

  address_street: z.string()
    .trim()
    .max(150)
    .optional(),

  postal_code: z.string()
    .trim()
    .max(20)
    .optional(),

  bio: z.string()
    .trim()
    .max(500, "Biography cannot exceed 500 characters").optional(),

  email: z.union([
    z.literal(""),
    z.email("Please enter a valid email address").max(255)
  ]).optional(),

  phone: z.string()
    .trim()
    .max(30)
    .optional(),

  media: z.array(EntityMediaSchema)
    .default([]),
};

// 2. Schema "full" che unisce tutto
const fullEditPersonSchema = z.object({
  ...basePersonFields,
  ...claimedOnlyFields,
});

// 3. Schema "limited" prendendo solo i campi base
const limitedEditPersonSchema = z.object({
  ...basePersonFields,
});

// 4. Factory Function per ottenere lo schema corretto
export const getEditPersonSchema = (isClaimed: boolean) => {
  return isClaimed ? fullEditPersonSchema : limitedEditPersonSchema;
};

// Export del tipo (utile per i componenti)
export type PersonFormData = z.infer<typeof fullEditPersonSchema>;