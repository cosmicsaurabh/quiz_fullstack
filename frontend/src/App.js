import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CreateQuiz from './components/app/pages/CreateQuiz';
import QuizList from './components/app/pages/QuizList';
import TakeQuiz from './components/app/pages/TakeQuiz';
import UserResults from './components/app/pages/UserResults';
import Header from './components/app/Header';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import ErrorPage from './components/app/ErrorPage';
import HomePage from './components/app/pages/HomePage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/login" element={<PublicRoute element={<Login />} />} />
            <Route path="/register" element={<PublicRoute element={<Register />} />} />

            <Route path="/create-quiz" element={<PrivateRoute element={<CreateQuiz />} />} />
            <Route path="/quizzes" element={<PrivateRoute element={<QuizList />} />} />
            <Route path="/quiz/:id" element={<PrivateRoute element={<TakeQuiz />} />} />
            <Route path="/user-results" element={<PrivateRoute element={<UserResults />} />} />
            <Route path="/" element={<PrivateRoute element={<HomePage />} />} />

            <Route path="*" element={<ErrorPage/>}/>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
