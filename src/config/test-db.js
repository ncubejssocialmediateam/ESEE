const { Pool } = require('pg');

const pool = new Pool({
  user: 'Junkie',
  password: '7bLWw3yJcnb0IMyQg2NV',
  host: 'esee-data.czigmm0iurad.eu-west-1.rds.amazonaws.com',
  port: 5432,
  database: 'postgres',
  ssl: {
    rejectUnauthorized: false
  }
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Database connection successful');
    
    // Test a simple query
    const result = await client.query('SELECT NOW()');
    console.log('Query result:', result.rows[0]);
    
    client.release();
  } catch (err) {
    console.error('Error testing database connection:', err);
  } finally {
    // Close the pool
    await pool.end();
  }
}

testConnection();
