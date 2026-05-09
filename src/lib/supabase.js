import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xugpssstgcinxzcqxbzz.supabase.co'
const supabaseAnonKey = 'sb_publishable_yluedbhhw8wmk2hsqsbgtgnfx2sqxbzz'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
