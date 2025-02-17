import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing required environment variables. Please check your .env file.')
}

console.log('Starting database test...')
console.log('URL:', supabaseUrl)
console.log('Using service role key for admin access')

const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
