import { z } from "zod";

// ==========================================
// REGEX CONDIVISE
// ==========================================
// Permette: Lettere (maiuscole/minuscole), spazi, punti, trattini e apostrofi.
// Questa costante può essere esportata se vuoi usarla altrove, 
// ma di solito rimane "privata" in questo file.
export const nameRegex = /^[a-zA-Z\s.\-']+$/;

// ==========================================
// SCHEMA PRINCIPALE (Aggiunta Persona)
// ==========================================
export const addPersonSchema = z.object({
  first_name: z.string()
    .trim()
    .max(100, "First name cannot exceed 100 characters")
    // Se la stringa NON è vuota, controlliamo che rispetti la Regex.
    // Usiamo .refine al posto di .regex perché .regex fallirebbe sulle stringhe vuote.
    .refine(val => val === '' || nameRegex.test(val), {
      message: "First name contains invalid characters (only letters, spaces, ., -, ' allowed)"
    })
    .optional(),

  last_name: z.string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(100, "Last name cannot exceed 100 characters")
    // Essendo obbligatorio, qui possiamo usare direttamente .regex()
    .regex(nameRegex, "Last name contains invalid characters (only letters, spaces, ., -, ' allowed)"),

  country: z.string()
    .trim()
    .length(2, "Please select a valid country")
    .toUpperCase(),

  state: z.string()
    .trim()
    .max(100, "State/Region cannot exceed 100 characters")
    // Se lo stato non è una nazione fissa ma un testo libero inserito dall'utente,
    // è buona pratica proteggere anche questo con la stessa regex dei nomi.
    .refine(val => val === '' || nameRegex.test(val), {
        message: "State contains invalid characters"
    })
    .optional(),

  website_url: z.string()
    .trim()
    .refine(val => val === '' || z.string().url().safeParse(val).success, {
      message: "Please enter a valid URL (e.g. https://...)"
    })
    .refine(val => val.length <= 2048, {
      message: "URL is too long"
    })
    .optional(),

  notes: z.string()
    .trim()
    .max(2000, "Notes cannot exceed 2000 characters")
    // Le note sono testo libero, quindi NON mettiamo la regex dei nomi qui,
    // altrimenti gli utenti non potrebbero usare virgole, numeri o punti interrogativi!
    .optional(),
});

export type AddPersonInput = z.infer<typeof addPersonSchema>;


// ==========================================
// SCHEMA RICERCA DUPLICATI
// ==========================================
export const duplicateSearchSchema = addPersonSchema.pick({
    first_name: true,
    last_name: true,
    country: true
});

export type DuplicateSearchInput = z.infer<typeof duplicateSearchSchema>;