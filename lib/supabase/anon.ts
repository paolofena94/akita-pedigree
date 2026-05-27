import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

export const createAnonClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Manutenibilità: Allineamento al nuovo standard delle chiavi Supabase
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  // Affidabilità: Pattern Fail-fast aggiornato con i nomi corretti delle variabili
  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      '[Supabase Config Error] NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY mancanti.'
    );
  }

  return createClient<Database>(
    supabaseUrl,
    supabaseKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    }
  );
};