# QuizApp

QuizApp is a full-stack application that allows users to take quizzes, track scores, and create a quiz.
The application includes user registration, authentication, and quiz management functionality.
It uses React for the frontend, Node.js and Express for the backend, and MongoDB as the database.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [License](#license)

## Features

- User authentication (Register/Login) using JWT.
- Quiz creation, listing, and participation.
- Real-time score tracking.
- Leaderboard functionality.
- Mobile-first, responsive UI.
- RESTful API with secure JWT-based authentication.

## Technologies

### Frontend
- **React**: For building the user interface.
- **Axios**: For handling HTTP requests.
- **React Router**: For navigation between routes.
- **CSS/Styled Components**: For responsive and styled UI.
- **Environment Variables**: To handle different environments (development/production).

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Backend framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing users and quizzes.
- **Mongoose**: MongoDB object modeling.
- **JWT (JSON Web Tokens)**: For authentication and secure communication.
- **CORS**: For handling cross-origin requests.

## Setup

### Prerequisites
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Git

### Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/cosmicsaurabh/quiz_fullstack
   ```

### Frontend Setup

1. **navigate to frontend directory**:
   ```bash
   cd frontend
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Setup env variables**:
   ```bash
   REACT_APP_BACKEND_BASE_URL=http://localhost:5000/api/
   ```
4. **Start the React development server**:
   ```bash
   npm start
   ```
***The app will be running on http://localhost:3000.***


### Backend Setup

1. **navigate to backend directory**:
   ```bash
   cd backend
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Setup env variables**:
   ```bash
   MONGO_URI=your-mongodb-connection-string
    JWT_SECRET=your-jwt-secret-key

   ```
4. **Start the React development server**:
   ```bash
   nodemon app.js
   ```
***The backend is up and running at http://localhost:5000.***







