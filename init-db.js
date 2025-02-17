import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

async function initDatabase() {
  try {
    const schemaPath = path.join(__dirname, 'src', 'config', 'schema.sql')
    const schema = fs.readFileSync(schemaPath, 'utf8')

    // Split the schema into individual statements
    const statements = schema
      .split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0)

    // Execute each statement
    for (const statement of statements) {
      const { error } = await supabase.rpc('postgres_query', {
        query: statement + ';'
      })
      
      if (error) {
        console.error('Error executing statement:', statement)
        throw error
      }
    }
    
    console.log('Database initialized successfully!')
  } catch (error) {
    console.error('Error initializing database:', error.message)
  }
}

initDatabase()
