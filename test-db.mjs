import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: 'postgresql://Junkie:7bLWw3yJcnb0IMyQg2NV@esee-data.czigmm0iurad.eu-west-1.rds.amazonaws.com:5432/postgres?sslmode=no-verify'
});

async function testConnection() {
  try {
    // Test connection
    const client = await pool.connect();
    console.log('Successfully connected to the database');

    // Test query
    const result = await client.query('SELECT current_timestamp');
    console.log('Database time:', result.rows[0].current_timestamp);

    // Release client
    client.release();
    
    // Close pool
    await pool.end();
    
  } catch (err) {
    console.error('Database connection error:', err.message);
    if (err.original) {
      console.error('Original error:', err.original);
    }
    console.error('Error code:', err.code);
    console.error('Error stack:', err.stack);
  }
}

testConnection();
