const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

console.log('Starting database test...')
console.log('URL:', process.env.VITE_SUPABASE_URL)
console.log('Key exists:', !!process.env.VITE_SUPABASE_ANON_KEY)

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)

async function testDatabase() {
  try {
    console.log('Attempting to create test article...')
    
    // Try to create a test article
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
      console.error('Insert error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint
      })
      throw error
    }
    
    console.log('Test article created successfully:', data)

    // Clean up by deleting the test article
    const { error: deleteError } = await supabase
      .from('articles')
      .delete()
      .eq('id', data.id)

    if (deleteError) {
      console.error('Delete error details:', {
        message: deleteError.message,
        details: deleteError.details,
        hint: deleteError.hint
      })
      throw deleteError
    }
    
    console.log('Test article cleaned up successfully')
    console.log('Database connection and operations are working!')
  } catch (error) {
    console.error('Database test error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    })
  }
}

testDatabase()
