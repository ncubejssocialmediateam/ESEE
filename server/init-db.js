import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const initializeDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        content TEXT NOT NULL,
        excerpt TEXT,
        status VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
        category VARCHAR(20) NOT NULL DEFAULT 'NEWS',
        tags TEXT[] DEFAULT '{}',
        seo_title VARCHAR(255),
        seo_description TEXT,
        image_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        published_at TIMESTAMP WITH TIME ZONE
      );

      CREATE INDEX IF NOT EXISTS articles_status_idx ON articles(status);
      CREATE INDEX IF NOT EXISTS articles_category_idx ON articles(category);
      CREATE INDEX IF NOT EXISTS articles_slug_idx ON articles(slug);
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    await pool.end();
  }
};

initializeDatabase().catch(console.error);
