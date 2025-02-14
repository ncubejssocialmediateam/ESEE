import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ohilbvmoozeygfregggy.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oaWxidm1vb3pleWdmcmVnZ2d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1NDUwODMsImV4cCI6MjA1NTEyMTA4M30.WCrR9u7Jylri7taYD8gI8CmUxtB7_ZsJvQu_M7b2gUA'

console.log('Starting database test...')
console.log('URL:', SUPABASE_URL)
console.log('Key exists:', !!SUPABASE_ANON_KEY)

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function testDatabase() {
  try {
    console.log('Attempting to fetch articles first...')
    const { data: articles, error: fetchError } = await supabase
      .from('articles')
      .select('*')
      .limit(1)

    if (fetchError) {
      console.error('Fetch error:', fetchError)
      console.error('Full fetch error object:', JSON.stringify(fetchError, null, 2))
      throw fetchError
    }

    console.log('Current articles:', articles)
    
    console.log('Attempting to create test article...')
    const { data, error } = await supabase
      .from('articles')
      .insert([
        {
          title: 'Test Article',
          content: 'This is a test article to verify database connection.',
          status: 'draft'
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Insert error:', error)
      console.error('Full insert error object:', JSON.stringify(error, null, 2))
      throw error
    }
    
    console.log('Test article created successfully:', data)

    // Clean up by deleting the test article
    const { error: deleteError } = await supabase
      .from('articles')
      .delete()
      .eq('id', data.id)

    if (deleteError) {
      console.error('Delete error:', deleteError)
      console.error('Full delete error object:', JSON.stringify(deleteError, null, 2))
      throw deleteError
    }
    
    console.log('Test article cleaned up successfully')
    console.log('Database connection and operations are working!')
  } catch (error) {
    console.error('Database test error:', error)
    console.error('Full error object:', JSON.stringify(error, null, 2))
  }
}

testDatabase()
