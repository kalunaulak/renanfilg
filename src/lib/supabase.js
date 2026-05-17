import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Usando o método oficial do guia para navegadores (Browser Client)
export const supabase = createBrowserClient(
  supabaseUrl,
  supabaseKey
)
