export type ActivityAction = 'INSERT' | 'UPDATE' | 'DELETE' | 'ALL';
export type ActivityEntity = 'akitas' | 'persons' | 'kennels' | 'ALL';

export interface AuditLog {
  id: string;
  table_name: string;
  record_id: string;
  user_id: string;
  action: ActivityAction;
  old_data?: Record<string, unknown> | null;
  new_data?: Record<string, unknown> | null;
  created_at: string;
}