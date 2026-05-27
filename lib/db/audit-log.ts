import { createAdminClient } from '@/lib/supabase/admin';
import { AuditableEntity, AuditLogRow, ProcessedActivityLog, ReferenceMap } from '@/types/audit-log';
import { formatAuditLogForUI } from '../audit-formatter';
import { cacheLife, cacheTag } from 'next/cache';

export interface ActivityFetchParams {
  userId: string;
  page: number;
  limit: number;
  actionFilter?: string;
  entityFilter?: string;
  fromFilter?: string;
  toFilter?: string;
}

// Helper di idratazione (eseguito dentro la cache)
export async function hydrateAuditLogReferences(data: AuditLogRow[]): Promise<ReferenceMap> {
    const supabaseAdmin = createAdminClient();
    const idsToFetch = new Set<string>();
    const userIdsToFetch = new Set<string>(); // 🌟 NUOVO: Set per raccogliere gli UUID degli utenti (Claim/Unclaim)

    data.forEach((log: any) => {
        const oldD = log.old_data || {};
        const newD = log.new_data || {};

        // 1. Idratazione relazioni cani (Akitas)
        if (log.table_name === 'akitas') {
            ['sire_id', 'dam_id', 'breeder_id', 'kennel_id'].forEach(key => {
                if (typeof oldD[key] === 'string') idsToFetch.add(oldD[key]);
                if (typeof newD[key] === 'string') idsToFetch.add(newD[key]);
            });
        }

        // 🌟 2. NUOVO: Idratazione relazioni Claim su persone (Persons)
        if (log.table_name === 'persons') {
            if (typeof oldD['claimed_by_user_id'] === 'string') userIdsToFetch.add(oldD['claimed_by_user_id']);
            if (typeof newD['claimed_by_user_id'] === 'string') userIdsToFetch.add(newD['claimed_by_user_id']);
        }
    });

    const referenceMap: ReferenceMap = {};

    // Fetch delle entità standard (Cani, Persone, Allevamenti)
    if (idsToFetch.size > 0) {
        const uniqueIds = Array.from(idsToFetch);

        const { data: akitas } = await supabaseAdmin.from('akitas').select('id, name, public_id, slug').in('id', uniqueIds);
        akitas?.forEach(a => referenceMap[a.id] = { name: a.name, public_id: a.public_id, slug: a.slug });

        const { data: persons } = await supabaseAdmin.from('persons').select('id, first_name, last_name, public_id, slug').in('id', uniqueIds);
        persons?.forEach(p => referenceMap[p.id] = { name: `${p.first_name || ''} ${p.last_name || ''}`.trim(), public_id: p.public_id, slug: p.slug });

        const { data: kennels } = await supabaseAdmin.from('kennels').select('id, name, public_id, slug').in('id', uniqueIds);
        kennels?.forEach(k => referenceMap[k.id] = { name: k.name, public_id: k.public_id, slug: k.slug });
    }

    // 🌟 3. NUOVO: Fetch degli utenti per convertire gli UUID in Username reali
    if (userIdsToFetch.size > 0) {
        const uniqueUserIds = Array.from(userIdsToFetch);
        
        const { data: users } = await supabaseAdmin
            .from('users')
            .select('user_id, username')
            .in('user_id', uniqueUserIds);

        users?.forEach(u => {
            // Mappiamo l'UUID dell'utente sul suo username, così l'audit-formatter
            // saprà generare il link corretto [username](/users/username)
            referenceMap[u.user_id] = { 
                name: u.username || 'Unknown User', 
                public_id: u.username || '', 
                slug: '' 
            };
        });
    }

    return referenceMap;
}

// -----------------------------------------------------------------------------
// FUNZIONE 1 CACHATA: Per la Activity Board globale dell'utente
// -----------------------------------------------------------------------------
export async function getUserActivityLogs({
  userId, page, limit, actionFilter, entityFilter, fromFilter, toFilter
}: ActivityFetchParams): Promise<{ logs: ProcessedActivityLog[]; totalPages: number }> {
  
  "use cache";
  cacheLife('hours');
  cacheTag(`activity-user-${userId}`); 

  const supabaseAdmin = createAdminClient();

  let query = supabaseAdmin
    .from('audit_logs')
    .select('*, users(username)', { count: 'exact' })
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (actionFilter && actionFilter !== "ALL") query = query.eq('action', actionFilter);
  if (entityFilter && entityFilter !== "ALL") query = query.eq('table_name', entityFilter);
  if (fromFilter) query = query.gte('created_at', new Date(fromFilter).toISOString());
  if (toFilter) {
    const endDate = new Date(toFilter);
    endDate.setHours(23, 59, 59, 999);
    query = query.lte('created_at', endDate.toISOString());
  }

  const fromIndex = (page - 1) * limit;
  query = query.range(fromIndex, fromIndex + limit - 1);

  const { data, count, error } = await query;

  if (error || !data || data.length === 0) {
      if (error) console.error('[DAL] Error fetching activity logs:', error.message);
      return { logs: [], totalPages: 0 };
  }

  const referenceMap = await hydrateAuditLogReferences(data);
  const totalPages = count ? Math.ceil(count / limit) : 0;
  const processedLogs = data.map((log: AuditLogRow) => formatAuditLogForUI(log, referenceMap));

  return { logs: processedLogs, totalPages };
}

// -----------------------------------------------------------------------------
// FUNZIONE 2 CACHATA: Per la timeline del singolo record (es. Hachiko o Persona)
// -----------------------------------------------------------------------------
export async function getEntityAuditLogsFromDb(
    tableName: AuditableEntity, 
    recordId: string
): Promise<ProcessedActivityLog[]> {
    
    "use cache";
    cacheLife('hours');
    cacheTag(`activity-entity-${recordId}`); 

    const supabaseAdmin = createAdminClient();

    // 1. Fetch dello storico log
    const { data, error } = await supabaseAdmin
        .from('audit_logs')
        .select('*, users(username)') 
        .eq('table_name', tableName)
        .eq('record_id', recordId)
        .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
        if (error) console.error('[DAL] Error fetching entity logs:', error.message);
        return [];
    }

    // 🌟 2. FETCH DELLO STATO ATTUALE
    // Usiamo maybeSingle() così se il record è stato eliminato non andiamo in crash
    const { data: currentRecord } = await supabaseAdmin
        .from(tableName)
        .select('*')
        .eq('id', recordId)
        .maybeSingle();

    // 3. Risoluzione delle referenze esterne (ID -> Nomi)
    const referenceMap = await hydrateAuditLogReferences(data);
    
    // 🌟 4. Passiamo lo stato attuale al formattatore (fallback a {} se il record è stato cancellato)
    return data.map((log: any) => 
        formatAuditLogForUI(log, referenceMap, currentRecord || {})
    );
}