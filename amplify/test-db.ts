const { Client } = require('pg');

interface UploadRow {
  id: string;
  filename: string;
  file_type: string;
  file_size: number;
  content: string;
  uploaded_by: string;
  uploaded_at: Date;
  uploader_email: string;
}

async function testDatabase() {
  const client = new Client({
    host: 'database-esee-instance-1.eu-west-1.rds.amazonaws.com',
    port: 5432,
    database: 'database-esee',
    user: 'postgresee',
    password: 'pxY5H1UfWOD20rkGFqOl'
  });

  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('Successfully connected to database');

    // Test query
    const result = await client.query('SELECT NOW()');
    console.log('Database time:', result.rows[0].now);

    // Create tables if not exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT NOT NULL UNIQUE,
        name TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS uploads (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        filename TEXT NOT NULL,
        file_type TEXT NOT NULL,
        file_size INTEGER NOT NULL,
        content TEXT NOT NULL,
        uploaded_by UUID REFERENCES users(id),
        uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Tables created/verified');

    // Clear existing test data
    await client.query('DELETE FROM uploads');
    await client.query('DELETE FROM users WHERE email LIKE $1', ['%@example.com']);
    
    // Insert test users
    const testUsers = [
      { email: 'john.doe@example.com', name: 'John Doe' },
      { email: 'jane.smith@example.com', name: 'Jane Smith' },
      { email: 'mike.wilson@example.com', name: 'Mike Wilson' },
      { email: 'sarah.brown@example.com', name: 'Sarah Brown' },
      { email: 'alex.chen@example.com', name: 'Alex Chen' }
    ];

    for (const user of testUsers) {
      const insertResult = await client.query(
        'INSERT INTO users (email, name) VALUES ($1, $2) RETURNING *',
        [user.email, user.name]
      );
      console.log('Test user inserted:', insertResult.rows[0]);
    }

    // Query all users
    const users = await client.query('SELECT * FROM users ORDER BY created_at DESC');
    console.log('\nAll users in database:', users.rows);

    // Test file upload
    const testFile = {
      filename: 'test-document.txt',
      file_type: 'text/plain',
      file_size: 1024,
      content: 'This is a test document content with some sample text.',
      uploaded_by: users.rows[0].id // Upload by first test user
    };

    const uploadResult = await client.query(
      'INSERT INTO uploads (filename, file_type, file_size, content, uploaded_by) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [testFile.filename, testFile.file_type, testFile.file_size, testFile.content, testFile.uploaded_by]
    );
    console.log('\nTest file uploaded:', {
      ...uploadResult.rows[0],
      content: uploadResult.rows[0].content.substring(0, 50) + '...' // Truncate content for display
    });

    // Query all uploads
    const uploads = await client.query(`
      SELECT u.*, usr.email as uploader_email 
      FROM uploads u 
      JOIN users usr ON u.uploaded_by = usr.id 
      ORDER BY uploaded_at DESC
    `);
    console.log('\nAll uploads in database:', uploads.rows.map((row: UploadRow) => ({
      ...row,
      content: row.content.substring(0, 50) + '...' // Truncate content for display
    })));

  } catch (error) {
    console.error('Database test failed:', error);
  } finally {
    await client.end();
    console.log('Database connection closed');
  }
}

testDatabase();
