import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ohilbvmoozeygfregggy.supabase.co'
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oaWxidm1vb3pleWdmcmVnZ2d5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTU0NTA4MywiZXhwIjoyMDU1MTIxMDgzfQ.GcKrDcMStuPm-wDWxn8T7_QpmRKUmbAij_BH0exXN6Q'

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

async function initDatabase() {
  try {
    console.log('Initializing database...')
    
    // Create articles table
    const { error: createTableError } = await supabase
      .from('articles')
      .insert(null)
      .select()
      .maybeSingle()
      .then(async () => {
        // If table doesn't exist, create it
        const { error } = await supabase
          .from('articles')
          .create({
            id: 'uuid default gen_random_uuid() primary key',
            title: 'text not null',
            content: 'text not null',
            status: "text not null default 'draft'",
            category: 'text',
            tags: 'text[]',
            author_id: 'uuid',
            created_at: "timestamp with time zone default timezone('utc'::text, now()) not null",
            updated_at: "timestamp with time zone default timezone('utc'::text, now()) not null"
          })
        return { error }
      })

    if (createTableError) {
      console.error('Error creating table:', createTableError)
      throw createTableError
    }

    // Enable RLS
    const { error: rlsError } = await supabase
      .rpc('enable_rls', { table_name: 'articles' })

    if (rlsError) {
      console.error('Error enabling RLS:', rlsError)
      throw rlsError
    }

    // Create policies
    const policies = [
      {
        name: 'Public articles are viewable by everyone',
        operation: 'SELECT',
        using: "status = 'published'"
      },
      {
        name: 'Users can create articles',
        operation: 'INSERT',
        check: "auth.role() = 'authenticated'"
      },
      {
        name: 'Users can update their own articles',
        operation: 'UPDATE',
        using: 'auth.uid() = author_id',
        check: 'auth.uid() = author_id'
      },
      {
        name: 'Users can delete their own articles',
        operation: 'DELETE',
        using: 'auth.uid() = author_id'
      }
    ]

    for (const policy of policies) {
      const { error: policyError } = await supabase
        .rpc('create_policy', {
          table_name: 'articles',
          policy_name: policy.name,
          operation: policy.operation,
          using_expr: policy.using,
          check_expr: policy.check
        })

      if (policyError) {
        console.error(`Error creating policy "${policy.name}":`, policyError)
        throw policyError
      }
    }

    // Create updated_at trigger
    const { error: triggerError } = await supabase
      .rpc('create_trigger', {
        table_name: 'articles',
        trigger_name: 'articles_updated_at',
        function_name: 'handle_updated_at'
      })

    if (triggerError) {
      console.error('Error creating trigger:', triggerError)
      throw triggerError
    }

    console.log('Database initialized successfully!')
  } catch (error) {
    console.error('Failed to initialize database:', error)
  }
}

initDatabase()
