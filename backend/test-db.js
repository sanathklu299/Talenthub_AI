const pool = require('./config/db');

async function testConnection() {
  try {
    const [rows] = await pool.query('SHOW TABLES');
    console.log('Database connection successful. Tables:', rows);
    process.exit(0);
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

testConnection();
