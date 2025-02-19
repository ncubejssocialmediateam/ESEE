import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const API_KEY = process.env.API_KEY; // Load API key from environment

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
    allowedHeaders: ['Content-Type', 'x-api-key']
}));
app.use(express.json());

// API Key Middleware
app.use((req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== API_KEY) {
        return res.status(403).json({ error: 'Forbidden: Invalid API Key' });
    }
    next();
});

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

// Other routes...

// Start server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
