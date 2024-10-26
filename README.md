Book Management System
This project is a RESTful API for a Book Management System that includes user authentication, profile management, book management, and email notifications. It's built using Node.js, Express, MongoDB, and EJS for templating. Users can register, log in, manage their profiles, and maintain a collection of books. A welcome email is sent to users upon successful registration.

Table of Contents
    Project Overview
    Features
    Setup Guide
    Project Structure
    Environment Variables
    Database Setup
    Postman Documentation
    ERD Diagram
    License

Project Overview
The Book Management System provides a robust API for managing users and their book collections. User authentication is implemented with JSON Web Tokens (JWT), and each route is protected accordingly. A welcome email is sent to new users upon registration using EJS templating. Environment variables store sensitive information for enhanced security.

Tech Stack
Backend: Node.js, Express
Database: MongoDB
Templating: EJS
Authentication: JWT,cookie-based authentication
Email Service: Nodemailer with environment-based credentials

Features
User Management
User registration with email verification.
Secure password hashing.
Login and JWT-based authentication for API access.
Profile Management
View, update, and delete user profiles.
Book Management
Add, view, update, and delete books.
Search and filter books by genre, author, and rating.
Pagination for efficient data retrieval.
API Documentation
Comprehensive Postman documentation for all API endpoints.

Email Notifications

Welcome email sent upon successful registration using EJS templating.
Bonus Features

Optional ERD for database schema.
Enhanced search options by title or author.

Setup Guide
1. Clone the Repository
git clone https://github.com/Retpaul/book_app_backend.git
cd book-management-system
2. Install Dependencies
npm install
3. Environment Variables
Create a .env file in the root directory with the following configuration:

PORT=3000
JWT_SECRET=your_jwt_secret
DB_URI=your_database_uri
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_smtp_username
EMAIL_PASS=your_smtp_password
4. Run the Application
npm run dev
The application will be running on http://localhost:3000.

Project Structure

book-management-system/
├── controllers/          # Controller files for handling route logic
├── models/               # Mongoose schemas for data models (e.g., User, Book)
├── routes/               # Route handlers for different endpoints
├── views/                # EJS templates for emails
├── .env                  # Environment variables
├── README.md             # Project README
└── server.js             # Entry point of the application
Controllers: Functions for handling user and book operations.
Models: MongoDB models for User and Book entities.
Routes: API endpoints for user authentication, profile management, and book management.
Views: EJS template for the welcome email sent during registration.
Environment Variables
Ensure to set up the following environment variables for the application:

PORT: Port for the server (default: 3000).
JWT_SECRET: Secret key for JWT token generation.
DB_URI: MongoDB connection string.
EMAIL_HOST: SMTP server host.
EMAIL_PORT: SMTP server port.
EMAIL_USER: SMTP username.
EMAIL_PASS: SMTP password.
Database Setup
Database: This project uses MongoDB. You can set up a MongoDB instance on MongoDB Atlas or run a local MongoDB server.
Connection URI: Update the DB_URI environment variable in .env with your MongoDB connection URI.
Postman Documentation
The API documentation, grouped by functionality, is available as a Postman collection:

Endpoints:
User Authentication: /api/register, /api/login
Profile Management: /api/profile
Book Management: /api/books, /api/books/:id
Authorization: Demonstrates JWT-based authorization for protected routes.
Environment Setup: A Postman environment setup with common variables (base_url, auth_token) for easy testing.
To view the Postman documentation, go here https://documenter.getpostman.com/view/29921932/2sAY4sjQ1h