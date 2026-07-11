const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
require('dotenv').config();

const seedUsers = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'talenthub_db',
    });

    console.log('Connected to database. Seeding users...');

    const users = [
      // Employers
      { full_name: 'Tech Corp Recruiting', email: 'hr@techcorp.com', password: 'Password123!', role: 'employer' },
      { full_name: 'Data Systems Admin', email: 'admin@datasystems.com', password: 'Password123!', role: 'employer' },
      { full_name: 'Creative Agency Hiring', email: 'jobs@creativeagency.com', password: 'Password123!', role: 'employer' },
      { full_name: 'CloudNet Inc HR', email: 'careers@cloudnet.com', password: 'Password123!', role: 'employer' },
      { full_name: 'Innovate LLC Team', email: 'join@innovatellc.com', password: 'Password123!', role: 'employer' },
      // Job Seekers
      { full_name: 'Alice Smith', email: 'alice.smith@example.com', password: 'Password123!', role: 'seeker' },
      { full_name: 'Mark Johnson', email: 'mark.johnson@example.com', password: 'Password123!', role: 'seeker' },
      { full_name: 'Sarah Lee', email: 'sarah.lee@example.com', password: 'Password123!', role: 'seeker' },
      { full_name: 'David Chen', email: 'david.chen@example.com', password: 'Password123!', role: 'seeker' },
      { full_name: 'Emily Davis', email: 'emily.davis@example.com', password: 'Password123!', role: 'seeker' },
    ];

    for (const user of users) {
      const [existing] = await connection.execute('SELECT id FROM users WHERE email = ?', [user.email]);
      
      if (existing.length === 0) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await connection.execute(
          'INSERT INTO users (full_name, email, password_hash, role) VALUES (?, ?, ?, ?)',
          [user.full_name, user.email, hashedPassword, user.role]
        );
        console.log(`Created ${user.role}: ${user.email}`);
      } else {
        console.log(`User already exists: ${user.email}`);
      }
    }

    await connection.end();
    console.log('Seeding complete.');
  } catch (error) {
    console.error('Seeding error:', error);
  }
};

seedUsers();
