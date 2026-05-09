import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xugpssstgcinxzcqxbzz.supabase.co'
const supabaseAnonKey = 'sb_publishable_yIuedbhhw8wmk2Hb-Qjeog_7n17Jsr4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
