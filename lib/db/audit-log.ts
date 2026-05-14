// lib/dal/audit-logs.ts
import { cache } from 'react';
import { createClient } from '@/lib/supabase/server';
import { Tables } from '@/types/database.types';

// Architettura: Estensione type-safe che include la JOIN su users 
// e garantisce la presenza dei payload jsonb originali.
export interface AuditLogEntry extends Tables<'audit_logs'> {
  author: Pick<Tables<'users'>, 'username' | 'avatar_url'> | null;
}

export const getUserActivityLogs = cache(async (userId: string, page: number, limit: number) => {
  const supabase = await createClient();
  
  const safePage = Math.max(1, page);
  const safeLimit = Math.min(Math.max(1, limit), 50);
  const from = (safePage - 1) * safeLimit;
  const to = from + safeLimit - 1;

  // Efficienza: Singola query DB. La relazione 'users' viene risolta tramite Foreign Key su user_id.
  const { data, count, error } = await supabase
    .from('audit_logs')
    .select(`
      *,
      author:users!audit_logs_user_id_fkey(username, avatar_url)
    `, { count: 'exact' })
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('[DAL] Error fetching audit logs:', error.message);
    return { data: [] as AuditLogEntry[], count: 0 };
  }

  return { 
    data: data as unknown as AuditLogEntry[], 
    count: count ?? 0 
  };
});