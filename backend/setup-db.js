const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupDatabase() {
  let connection;
  try {
    // Connect without database selected first
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      multipleStatements: true // Important for running multiple queries from the file
    });

    console.log('Connected to MySQL. Creating database and tables...');

    // Read the schema.sql file
    const schemaPath = path.join(__dirname, 'database', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Execute the queries
    await connection.query(schema);

    console.log('Database and tables created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Failed to setup database:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupDatabase();
