import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = 'https://xugpssstgcinxzcqxbzz.supabase.co'
const supabaseKey = 'sb_publishable_yIuedbhhw8wmk2Hb-Qjeog_7n17Jsr4'

// Usando o método oficial do guia para navegadores (Browser Client)
export const supabase = createBrowserClient(
  supabaseUrl,
  supabaseKey
)
