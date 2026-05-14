import { z } from "zod";

/**
 * Architettura: Schema di validazione per i filtri URL.
 * L'uso di .catch() garantisce che input malevoli o errati
 * (es. ?page=invalid) non causino un errore 500 sul server,
 * ma degradino fluidamente ai valori di default.
 */
export const activityParamsSchema = z.object({
  page: z.coerce.number().int().min(1).catch(1),
  action: z.enum(["ALL", "INSERT", "UPDATE", "DELETE"]).catch("ALL"),
  entity: z.enum(["ALL", "akitas", "kennels", "persons"]).catch("ALL"),
  from: z.iso.date().optional().catch(undefined),
  to: z.iso.date().optional().catch(undefined),
});

export type ActivityParams = z.infer<typeof activityParamsSchema>;