// types/audit.ts

import { Tables } from "./database.types";
import { EntityType } from "./entity";

export type ActivityAction =
    | 'INSERT'
    | 'UPDATE'
    | 'DELETE';

// 🌟 IMPORTANTE: Deve riflettere i nomi esatti delle tabelle sul DB ('dogs', non 'akitas')
export type AuditableEntity =
    | Extract<EntityType, 'persons'>
    | Extract<EntityType, 'akitas'>
    | Extract<EntityType, 'kennels'>

// Mappa esplicita tra il nome tabella e la riga generata da Supabase
export type AuditTableMap = {
    [K in AuditableEntity]: Tables<K>;
};

export type AuditLogRow = Tables<'audit_logs'>;

export type AuditLogWithUser = AuditLogRow & {
    users?: { username: string | null } | { username: string | null }[] | null;
};

export type ReferenceMap = Record<string, {
    name: string;
    slug: string;
    public_id: number | string;
}>;

// Struttura del cambiamento pronto per essere renderizzato dalla UI (Dialog o Sheet)
export interface ExtractedAuditChange {
    key: string;
    fieldName: string;
    oldValue: unknown;
    newValue: unknown;
    formattedOld: string;
    formattedNew: string;
}

export interface ProcessedActivityLog {
    id: string;
    action: ActivityAction;
    table_name: string;
    created_at: string;
    entityName: string;
    entitySlug: string;
    entityId: string | number;
    changes: ExtractedAuditChange[];
    notes: string | null;
    authorUsername: string | null;
}

// Interfaccia tipizzata per la riga estratta direttamente dalla tabella audit_logs
export interface AuditLogWithAuthor extends Omit<Tables<'audit_logs'>, 'action' | 'table_name'> {
    // 1. Forziamo TypeScript a usare i nostri tipi ristretti e sicuri
    action: ActivityAction;
    table_name: keyof AuditTableMap;

    // 2. Aggiungiamo i campi extra derivanti dalla query (Join)
    author?: { username: string | null } | { username: string | null }[];
}

