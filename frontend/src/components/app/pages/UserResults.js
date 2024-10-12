import React, { useState, useEffect } from 'react';
import useAxiosWithAuth from '../../axiosInstance';
const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const styles = {
  container: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '700px',
    margin: '50px auto',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  title: {
    textAlign: 'center',
    color: '#007BFF',
    fontSize: '28px',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'background-color 0.3s',
    cursor: 'pointer', 
  },
  listItemHover: {
    backgroundColor: '#e9ecef', 
  },
  score: {
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#333',
  },
  quizTitle: {
    fontSize: '18px',
    fontWeight: '500',
    color: '#444',
  },
  details: {
    fontSize: '14px',
    color: '#555',
    marginTop: '5px',
  },
  errorMessage: {
    color: '#D9534F',
    fontSize: '16px',
    marginTop: '10px',
    textAlign: 'center',
  },
};

const UserResults = () => {
  const [results, setResults] = useState([]);
  const axios = useAxiosWithAuth();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BACKEND_BASE_URL}app/results`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResults(response.data.results);
      } catch (error) {
        console.error('Error fetching results', error);
      }
    };
    fetchResults();
  }, [axios]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Quiz Results</h2>
      {results.length === 0 ? (
        <p style={styles.errorMessage}>No results available.</p>
      ) : (
        <ul style={styles.list}>
          {results.map((result) => (
            <li
              key={result._id} 
              style={styles.listItem}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.listItemHover.backgroundColor)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f9f9f9')}
            >
              <div>
                <span style={styles.quizTitle}>{result.quizId.title}</span>
                
                <div style={styles.details}>
                  <p>Score: {result.score}</p>
                  <p>OutOf: {result.totalQuestions}</p>
                  <p>Correct Answers: {result.correctAnswers}</p>
                  <p>Wrong Answers: {result.wrongAnswers}</p>
                  <p>Time Taken: {result.timeTaken} seconds</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserResults;
