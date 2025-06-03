
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock client when environment variables are not available
const createMockClient = () => ({
  auth: {
    signInWithPassword: async () => ({ data: null, error: { message: 'Supabase não configurado. Configure as variáveis de ambiente.' } }),
    signInWithOAuth: async () => ({ error: { message: 'Supabase não configurado. Configure as variáveis de ambiente.' } }),
    resetPasswordForEmail: async () => ({ error: { message: 'Supabase não configurado. Configure as variáveis de ambiente.' } }),
    signOut: async () => ({ error: null }),
    getSession: async () => ({ data: { session: null }, error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
  },
  from: () => ({
    select: () => ({ data: [], error: null }),
    insert: () => ({ data: null, error: { message: 'Supabase não configurado' } }),
    update: () => ({ data: null, error: { message: 'Supabase não configurado' } }),
    delete: () => ({ data: null, error: { message: 'Supabase não configurado' } })
  })
});

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient();
