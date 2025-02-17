import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;


// Database connection
const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
});

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://localhost:5173', 'http://192.168.1.23:5173', 'https://192.168.1.23:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Test route to check if server is running
app.get('/test', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});

// API Routes
app.get('/api/articles', async (req, res) => {
  console.log("Received GET /api/articles");
  try {
    let query = 'SELECT * FROM articles ORDER BY updated_at DESC';
    console.log("Executing query:", query);
    const result = await pool.query(query);
    console.log("Query succeeded:", result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

app.get('/api/articles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM articles WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

app.post('/api/articles', async (req, res) => {
  try {
    const {
      title,
      slug,
      content,
      excerpt,
      status,
      category,
      tags,
      seo_title,
      seo_description,
      image_url
    } = req.body;

    const result = await pool.query(
      `INSERT INTO articles (
        title, slug, content, excerpt, status, category, tags,
        seo_title, seo_description, image_url, created_at, updated_at,
        published_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW(), $11)
      RETURNING *`,
      [
        title,
        slug,
        content,
        excerpt,
        status,
        category,
        tags,
        seo_title,
        seo_description,
        image_url,
        status === 'PUBLISHED' ? new Date() : null
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
});

app.put('/api/articles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      content,
      excerpt,
      status,
      category,
      tags,
      seoTitle,
      seoDescription,
      image
    } = req.body;

    // Check if we need to update published_at
    const currentArticle = await pool.query('SELECT status FROM articles WHERE id = $1', [id]);
    const wasPublished = currentArticle.rows[0]?.status === 'PUBLISHED';
    const isPublishing = status === 'PUBLISHED' && !wasPublished;

    const result = await pool.query(
      `UPDATE articles SET
        title = $1, slug = $2, content = $3, excerpt = $4,
        status = $5, category = $6, tags = $7, seo_title = $8,
        seo_description = $9, image_url = $10, updated_at = NOW(),
        published_at = CASE WHEN $11 THEN NOW() ELSE published_at END
        WHERE id = $12
        RETURNING *`,
      [
        title,
        slug,
        content,
        excerpt,
        status,
        category,
        tags || [],
        seoTitle,
        seoDescription,
        image,
        isPublishing,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'Failed to update article' });
  }
});

app.delete('/api/articles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM articles WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

// Start server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
