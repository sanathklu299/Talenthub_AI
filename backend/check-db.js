const mysql = require('mysql2/promise');
require('dotenv').config();

async function check() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || ''
  });
  const [rows] = await connection.query('SHOW DATABASES;');
  console.log('Databases:', rows.map(r => r.Database));
  process.exit(0);
}
check();
