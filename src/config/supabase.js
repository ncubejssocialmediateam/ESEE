import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const missingVars = []
if (!supabaseUrl) missingVars.push('VITE_SUPABASE_URL')
if (!supabaseAnonKey) missingVars.push('VITE_SUPABASE_ANON_KEY')

if (missingVars.length > 0) {
  throw new Error(`Missing Supabase environment variables: ${missingVars.join(', ')}`)
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to get service role client (for admin operations)
export const getServiceRoleClient = () => {
  const serviceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceRoleKey) {
    throw new Error('Missing environment variable: SUPABASE_SERVICE_ROLE_KEY')
  }
  return createClient(supabaseUrl, serviceRoleKey)
}
