// lib/audit-formatter.ts
import { Json } from "@/types/database.types";
import { getCountryName } from "@/lib/nations";
import { AuditTableMap, ExtractedAuditChange, ActivityAction, ProcessedActivityLog, ReferenceMap, AuditLogWithUser } from "@/types/audit-log";

export const isEmpty = (val: unknown): boolean => val === null || val === undefined || val === '';

// --- MOTORE DI MASCHERAMENTO PRIVACY (GDPR) ---
const maskEmail = (email: string): string => {
    if (!email || !email.includes('@')) return '••••••••';
    const [local, domain] = email.split('@');
    if (local.length <= 2) return `•••@${domain}`;
    return `${local[0]}•••${local[local.length - 1]}@${domain}`;
};

const maskPhone = (phone: string): string => {
    if (!phone || phone.length <= 4) return '••••••••';
    return `•••• •••• ${phone.slice(-3)}`;
};

const maskAddress = () => '••••••••';
const maskLongText = () => '[Text content hidden]';

// 🌟 STRATEGY PATTERN: Configurazioni specifiche per ogni tabella
interface TableAuditConfig {
    ignoredFields: string[];
    fieldOrder: string[];
    maskRules: Record<string, (val: any) => string>;
}

// REMOVED 'media' from ignored fields so we can process it
const COMMON_IGNORED = ['id', 'updated_at', 'created_at', 'slug', 'public_id', 'notes'];

const TABLE_CONFIGS: Record<keyof AuditTableMap, TableAuditConfig> = {
    persons: {
        ignoredFields: [...COMMON_IGNORED],
        fieldOrder: ['first_name', 'last_name', 'email', 'phone', 'country', 'state', 'city', 'address_street', 'postal_code', 'website_url', 'bio', 'media'],
        maskRules: {
            email: maskEmail,
            phone: maskPhone,
            address_street: maskAddress,
            postal_code: maskAddress,
            city: maskAddress, 
            bio: maskLongText
        }
    },
    kennels: {
        ignoredFields: [...COMMON_IGNORED],
        fieldOrder: ['name', 'email', 'phone', 'website_url', 'country', 'state', 'city', 'address_street', 'postal_code', 'description', 'media'],
        maskRules: {
            email: maskEmail,
            phone: maskPhone,
            address_street: maskAddress,
            description: maskLongText
        }
    },
    akitas: {
        ignoredFields: [...COMMON_IGNORED, 'owner_id'],
        fieldOrder: [
            'name', 'call_name', 'reg_number', 'gender', 'color',
            'sire_id', 'dam_id', 'breeder_id', 'kennel_id', 
            'date_of_birth', 'date_of_death', 'land_of_birth', 'land_of_standing', 'media'
        ],
        maskRules: {}
    }
};

/**
 * Parsifica il JSONB di Supabase e lo mappa sulla tabella corretta.
 */
export function typedLogData<T extends keyof AuditTableMap>(
    tableName: T,
    jsonData: Json | undefined | null
): AuditTableMap[T] | null {
    if (!jsonData || typeof jsonData !== 'object' || Array.isArray(jsonData)) return null;
    return jsonData as unknown as AuditTableMap[T];
}

/**
 * Confronta old_data e new_data usando le REGOLE SPECIFICHE DELLA TABELLA
 * @param currentRecordState - Lo stato ATTUALE del record nel db. Serve per non mascherare i dati vecchi.
 */
export function extractAuditChanges(
    tableName: keyof AuditTableMap,
    action: ActivityAction,
    oldData: Record<string, unknown> | null,
    newData: Record<string, unknown> | null,
    refMap: ReferenceMap = {},
    currentRecordState: Record<string, unknown> = {} // 🌟 Aggiunto stato attuale
): ExtractedAuditChange[] {
    const oldD = oldData || {};
    const newD = newData || {};
    const config = TABLE_CONFIGS[tableName];

    const allKeys = Array.from(new Set([...Object.keys(oldD), ...Object.keys(newD)]));

    const extracted = allKeys.map((key) => {
        if (config.ignoredFields.includes(key)) return null;

        const oldValue = oldD[key];
        const newValue = newD[key];

        // Se i valori sono identici, scartiamo la modifica. 
        if (JSON.stringify(oldValue) === JSON.stringify(newValue)) return null;
        
        if (action === 'INSERT' && isEmpty(newValue)) return null;
        if (action === 'DELETE' && isEmpty(oldValue)) return null;
        if (action === 'UPDATE' && isEmpty(oldValue) && isEmpty(newValue)) return null;

        // --- GESTIONE SPECIALE PER MEDIA ---
        if (key === 'media') {
             return {
                 key,
                 fieldName: 'Media Gallery',
                 oldValue,
                 newValue,
                 formattedOld: oldValue ? "Previous media content" : "No media",
                 formattedNew: newValue ? "Media gallery updated" : "Media cleared"
             };
        }

        // 🌟 La funzione di formattazione intelligente
        const formatValue = (val: unknown, k: string) => {
            if (isEmpty(val)) return "";

            if (k === 'claimed_by_user_id' && typeof val === 'string') {
                const userRef = refMap[val];
                if (userRef) {
                    return `[${userRef.name}](/users/${userRef.name})`;
                }
                return "Unknown User";
            }
            
            if (typeof val === 'string' && k.endsWith('_id') && refMap[val]) {
                const ref = refMap[val];
                const targetTable = k.replace('_id', 's');

                let entityTable = targetTable;
                if (k === 'sire_id' || k === 'dam_id') entityTable = 'akitas';
                if (k === 'breeder_id') entityTable = 'persons';

                return `[${ref.name}](/${entityTable}/${ref.public_id}/${ref.slug})`;
            }

            // 🌟 LOGICA PRIVACY TEMPORALE
            const currentDbValue = currentRecordState[k];
            if (config.maskRules[k] && typeof val === 'string') {
                // Se il valore nel log è DIVERSO dal valore attualmente salvato nel DB 
                // significa che è un dato storico superato, quindi lo MASCHERIAMO.
                // Se invece è UGUALE, è il dato attuale e lo lasciamo IN CHIARO.
                if (val !== currentDbValue) {
                    return config.maskRules[k](val);
                } else {
                    return val;
                }
            }

            if (k === 'country' && typeof val === 'string') return getCountryName(val) || val;
            if (typeof val === 'boolean') return val ? 'true' : 'false';
            if (typeof val === 'object') return JSON.stringify(val);
            return String(val);
        };

        const cleanFieldName = key.replace(/_id$/, '').replace(/_/g, ' ');

        return {
            key,
            fieldName: cleanFieldName,
            oldValue,
            newValue,
            formattedOld: formatValue(oldValue, key),
            formattedNew: formatValue(newValue, key)
        };
    }).filter((item): item is ExtractedAuditChange => item !== null);

    return extracted.sort((a, b) => {
        const indexA = config.fieldOrder.indexOf(a.key);
        const indexB = config.fieldOrder.indexOf(b.key);
        return (indexA === -1 ? 99 : indexA) - (indexB === -1 ? 99 : indexB);
    });
}

export function formatAuditLogForUI(
    log: AuditLogWithUser, 
    refMap: ReferenceMap = {},
    currentRecordState: Record<string, unknown> = {} // 🌟 Aggiunto stato attuale
): ProcessedActivityLog {
    const tableName = log.table_name as keyof AuditTableMap;
    const action = log.action as ActivityAction;

    // 1. Parsing sicuro
    const safeOldData = typedLogData(tableName, log.old_data);
    const safeNewData = typedLogData(tableName, log.new_data);

    // 2. Selezione Payload per estrarre Nome e Link
    const payload = (action === 'DELETE' ? safeOldData : safeNewData) as Record<string, unknown> | null;

    const firstName = payload?.first_name as string | undefined;
    const lastName = payload?.last_name as string | undefined;
    const personFullName = lastName ? [firstName, lastName].filter(Boolean).join(' ') : null;

    const entityName = (personFullName || payload?.name || payload?.title || "Unknown Resource") as string;
    const entitySlug = (payload?.slug || "") as string;
    const entityId = (payload?.public_id || log.record_id) as string | number;

    // 3. Diffing & Privacy Masking
    const changes = extractAuditChanges(
        tableName,
        action,
        safeOldData as Record<string, unknown> | null,
        safeNewData as Record<string, unknown> | null,
        refMap,
        currentRecordState // 🌟 Passato il parametro all'estrattore
    );

    // 4. Estrazione Note
    const note = (action === 'DELETE' ? safeOldData?.notes : safeNewData?.notes) as string | null;

    // 5. ESTRAZIONE AUTORE
    let authorUsername = null;
    if (log.users) {
        if (!Array.isArray(log.users) && log.users.username) {
            authorUsername = log.users.username;
        } else if (Array.isArray(log.users) && log.users[0]?.username) {
            authorUsername = log.users[0].username;
        }
    }

    // 6. Assemblaggio Finale
    return {
        id: log.id,
        action,
        table_name: tableName,
        created_at: log.created_at || new Date().toISOString(),
        entityName,
        entitySlug,
        entityId,
        changes,
        notes: note,
        authorUsername
    };
}