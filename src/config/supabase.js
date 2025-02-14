import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ohilbvmoozeygfregggy.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oaWxidm1vb3pleWdmcmVnZ2d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1NDUwODMsImV4cCI6MjA1NTEyMTA4M30.WCrR9u7Jylri7taYD8gI8CmUxtB7_ZsJvQu_M7b2gUA'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oaWxidm1vb3pleWdmcmVnZ2d5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTU0NTA4MywiZXhwIjoyMDU1MTIxMDgzfQ.GcKrDcMStuPm-wDWxn8T7_QpmRKUmbAij_BH0exXN6Q'

// Create Supabase client
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
)

// Helper function to get service role client (for admin operations)
export const getServiceRoleClient = () => {
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}
