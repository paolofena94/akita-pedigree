"use server";

import { getEntityAuditLogsFromDb } from "@/lib/db/audit-log";
import { ProcessedActivityLog } from "@/types/audit-log";

// Questa è la funzione che esporrai ai Client Components
export async function getEntityAuditLogsAction(
    tableName: string, 
    recordId: string
): Promise<ProcessedActivityLog[]> {
    
    // Richiama in sicurezza la funzione pura del database
    return await getEntityAuditLogsFromDb(tableName, recordId);
}