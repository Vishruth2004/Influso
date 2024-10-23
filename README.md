# Influso AI Login WebApp

## Overview

This project is a full-stack application built with React for the frontend and Node.js with Express for the backend. It allows users to register, log in, and access protected routes using JWT authentication. The application is designed to manage user credentials securely and includes a basic "Forgot Password" route.

## Features

- User registration and login functionality
- JWT-based authentication
- "Forgot Password" placeholder route
- Responsive design for a better user experience
- Error handling for invalid login attempts

## Technologies Used

- **Frontend**: React, Formik, Yup, Axios
- **Backend**: Node.js, Express, Sequelize, SQLite
- **Authentication**: JWT (JSON Web Tokens)
- **CSS**: Custom styles for the user interface

## Running the Application

1. **Start the backend server (runs in `localhost:5000`)**:
   Navigate to the `back` directory and run the following in terminal:
   ```
   cd back
   npm install
   ```
   Then Run:
   ```
   node index.js
   ```

3. **Start the frontend (runs in `localhost:5000`)**:
   Navigate to the `front` directory and run the following in terminal:

   ```
   cd front
   npm install
   ```
   Then Run:
   ```
   npm run start-legacy
   ```
   
5. **Access the application**:
   Open your browser and go to `http://localhost:3000` to access the frontend.

## Endpoints

- **POST** `/login` - Login to the application.
- **POST** `/signup` - Register a new user.
- **GET** `/home` - Protected route, requires JWT token for access.
- **GET** `/forgot-password` - Placeholder for forgot password functionality.
