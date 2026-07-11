# TalentHub Job Board

A full-stack Job Board application with separate frontend (React + Tailwind CSS) and backend (Node.js + Express + MySQL) architectures. Ready for deployment on Vercel.

## Project Structure

- `/frontend` - React application (Vite)
- `/backend` - Node.js/Express application
- `/backend/database/schema.sql` - MySQL Database schema

## Features

- **Authentication**: JWT-based, Role-based (Job Seeker, Employer, Admin)
- **Job Seekers**: Browse jobs, apply, manage profile.
- **Employers**: Post jobs, manage applications, company profile.
- **Admin**: Dashboard, analytics, manage users/jobs.
- **UI/UX**: Responsive, modern design using Tailwind CSS.
- **Security**: Rate limiting, Helmet, bcrypt password hashing.

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- MySQL (v8+)

### 1. Database Setup

1. Create a MySQL database named `talenthub_db`.
2. Run the SQL script located at `backend/database/schema.sql` to create the tables.

### 2. Backend Setup

1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example` and update the database credentials.
4. Start the server: `node server.js`

### 3. Frontend Setup

1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Deployment

This project is configured for deployment on Vercel. A GitHub Actions CI/CD pipeline is provided in `.github/workflows/deploy.yml`.

To deploy:
1. Push the code to a GitHub repository.
2. Set up a project in Vercel.
3. Add `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` to your GitHub secrets.
4. Ensure the database (e.g. PlanetScale, AWS RDS, etc.) is remotely accessible and configure the environment variables in Vercel.
