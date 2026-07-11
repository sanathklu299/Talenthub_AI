# API Documentation

## Base URL
`/api`

## Authentication

### Register a User
- **URL**: `/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "seeker" // seeker, employer, admin
  }
  ```
- **Response**: `201 Created`

### Login
- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: `200 OK` (returns JWT token)

## Users

### Get Profile
- **URL**: `/users/profile`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK`

### Update Profile
- **URL**: `/users/profile`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK`

## Jobs

### Get All Jobs
- **URL**: `/jobs`
- **Method**: `GET`
- **Response**: `200 OK` (Array of jobs)

### Get Job by ID
- **URL**: `/jobs/:id`
- **Method**: `GET`
- **Response**: `200 OK`

### Create Job (Employer Only)
- **URL**: `/jobs`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `201 Created`

## Applications

### Apply to Job
- **URL**: `/jobs/:id/apply`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `201 Created`

### Update Application Status (Employer Only)
- **URL**: `/applications/:id/status`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "status": "Under Review"
  }
  ```
- **Response**: `200 OK`
