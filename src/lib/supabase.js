import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://offline-placeholder.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'offline_placeholder_key'

// Usando o método oficial do guia para navegadores (Browser Client)
export const supabase = createBrowserClient(
  supabaseUrl,
  supabaseKey
)
