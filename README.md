# Student Learning Platform

This repository contains two microservices: **User Service** and **Course Service**, designed for managing users, courses, and enrollments in a student-teacher environment.

## Table of Contents
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Running the Services](#running-the-services)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Features](#features)
- [Logging](#logging)
- [License](#license)

---

## Project Structure

### User Service
```bash
user-service/
├── src/
│ ├── config/ # DB + environment config
│ ├── controllers/ # Request handlers
│ ├── middleware/ # Auth, logging
│ ├── models/ # DB entities
│ ├── routes/ # API routes
│ ├── services/ # Business logic
│ ├── app.ts # Express setup
│ └── index.ts # Entrypoint
├── swagger/ # OpenAPI docs
├── logs/ # Log files
├── package.json
└── .env
```

### Course Service

```bash
course-service/
├── src/
│ ├── config/ # DB + environment config
│ ├── controllers/ # Request handlers
│ ├── middleware/ # Logging, API key validation
│ ├── models/ # Course & Enrollment entities
│ ├── routes/ # API routes
│ ├── services/ # Business logic
│ ├── app.ts # Express setup
│ └── index.ts # Entrypoint
├── swagger/ # OpenAPI docs
├── logs/ # Log files
├── package.json
└── .env
```

---

## Technologies
- **Node.js & Express** – Server runtime and framework  
- **TypeScript** – Type safety and maintainability  
- **TypeORM** – ORM for database interaction  
- **MySQL** – Primary database  
- **JWT Authentication** – Secure user sessions  
- **Swagger (OpenAPI)** – API documentation  
- **bcryptjs** – Strong password hashing  
- **cors, morgan** – Express middleware

---

## Environment Variables

Create a `.env` file in each service folder.

### User Service (`user-service/.env`)
```env
PORT=4000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=yourpassword
DB_NAME=user_service
JWT_SECRET=your_jwt_secret_should_be_long_and_complex
```

### Installation
```bash
# Clone the repository
git clone https://github.com/Vishal-V-D/Week-2-task-prime-internship.git
cd Week-2-task-prime-internship/backend

# Install dependencies for User Service
cd user-service
npm install

# Install dependencies for Course Service
cd ../course-service
npm install

```


### Running the Services

```bash
# Start User Service
cd user-service
npx ts-node-dev src/index.ts

# Start Course Service
cd course-service
npx ts-node-dev src/index.ts

```

## User Service → http://localhost:4000

## Course Service → http://localhost:5000

## API Documentation

Swagger documentation is available when services are running:

- **User Service Swagger:** [http://localhost:4000/api-docs](http://localhost:4000/api-docs)  
- **Course Service Swagger:** [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

## Authentication

- Users authenticate using **JWT tokens**.  
- Endpoints are protected using `authMiddleware`.  
- Roles supported: `student` and `teacher`.  
- Some endpoints (like managing courses or listing users) are **teacher-only**.

---

## Features

### User Service
- Register/Login users  
- JWT-based authentication  
- Role-based access control  
- Get/update/delete user profiles  
- List all users (**teacher-only**)  
- Get user by ID (**teacher-only**)  
- Swagger API docs

### Course Service
- Create, read, update, delete courses (**teacher-only**)  
- Enroll students into courses  
- Validate inter-service requests via **API key**  
- Logging via middleware  
- Swagger API docs

---

## Logging
- `morgan`,`winston` is used for HTTP request logging  
- Logs are stored in `logs/app.log` within each service

---

## License
This project is licensed under the **MIT License**.
