import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

export const createAdminClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      '[Supabase Admin Client] Variabili d\'ambiente mancanti. Assicurati di aver impostato NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.'
    );
  }

  // Creiamo un client "pulito" che non tenta di gestire sessioni o cookie,
  // poiché il suo unico scopo è eseguire query autoritative lato server.
  return createClient<Database>(
    supabaseUrl,
    supabaseServiceKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    }
  );
};