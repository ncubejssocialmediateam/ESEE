import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://Junkie:7bLWw3yJcnb0IMyQg2NV@esee-data.czigmm0iurad.eu-west-1.rds.amazonaws.com:5432/postgres?sslmode=no-verify'
});

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
  } else {
    console.log('Successfully connected to database');
    release();
  }
});

export default pool;
