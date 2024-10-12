import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosWithAuth from '../../axiosInstance';
const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();
  const axios = useAxiosWithAuth();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BACKEND_BASE_URL}app/quizzes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuizzes(response.data.quizzes);
      } catch (error) {
        console.error('Error fetching quizzes', error);
      }
    };
    fetchQuizzes();
  }, [axios]);

  const handleClick = (quizId) => {
    navigate(`/quiz/${quizId}`, { state: quizId });
  };

  

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Available Quizzes</h2>
      <ul style={styles.quizList}>
        {quizzes.length === 0 ? (
          <p style={styles.noQuizzesMessage}>No quizzes available at the moment</p>
        ) : (
          quizzes.map((quiz) => (
            <li
              key={quiz._id}
              style={styles.quizItem}
              onClick={() => handleClick(quiz.quizId)}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e7f3ff')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
            >
              <h3 style={styles.quizTitle}>{quiz.title}</h3>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default QuizList;

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  quizList: {
    listStyleType: 'none',
    padding: 0,
  },
  quizItem: {
    padding: '10px 15px',
    margin: '10px 0',
    border: '1px solid #007bff',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  quizTitle: {
    color: '#007bff',
    textDecoration: 'underline',
    fontSize: '20px',
  },
  noQuizzesMessage: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
};
