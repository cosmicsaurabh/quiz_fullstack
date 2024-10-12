import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosWithAuth from '../../axiosInstance';
const TakeQuiz = () => {
  const location = useLocation();
  const axios = useAxiosWithAuth();

  const quizId = location.state; 
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();
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
      fontSize: '16px',
      lineHeight: '1.6',
      color: '#333',
    },
    title: {
      textAlign: 'center',
      color: '#007BFF',
      fontSize: '28px',
      marginBottom: '20px',
      fontWeight: 'bold',
    },
    question: {
      marginBottom: '15px',
      fontSize: '20px',
      fontWeight: '500',
      color: '#444',
    },
    label: {
      display: 'block',
      marginBottom: '10px',
      padding: '10px',
      backgroundColor: '#f2f2f2',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    input: {
      marginRight: '10px',
    },
    button: {
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      padding: '12px 25px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '18px',
      transition: 'background-color 0.3s, transform 0.3s',
      marginTop: '20px',
      width: '100%',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
      transform: 'scale(1.05)',
    },
    errorMessage: {
      color: '#D9534F',
      fontSize: '14px',
      marginTop: '10px',
      textAlign: 'center',
    },
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get(`http://localhost:5000/api/app/${quizId}`,{headers: { Authorization: `Bearer ${token}` } });
        setQuiz(response.data.quiz);
        setAnswers(new Array(response.data.quiz.questions.length).fill(null)); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz', error);
        alert('Failed to load quiz, please try again.');
        setLoading(false);
      }
    };

    if (quizId) {
      fetchQuiz();
    }
  }, [quizId]);

  const submitAnswers = async () => {
    if (answers.includes(null)) {
      alert('Please answer all questions before submitting.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/app/${quiz._id}/take`, 
        { answers, timeTaken: 200 }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Quiz submitted successfully!');
      navigate('/')
    } catch (error) {
      console.error('Error submitting answers', error);
      alert('Failed to submit quiz, please try again.');
    }
  };

  if (loading) {
    return <p style={{ textAlign: 'center', fontSize: '18px', color: '#333' }}>Loading quiz...</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{quiz ? quiz.title : 'Loading...'}</h1>
      {quiz && (
        <div>
          {quiz.questions.map((q, i) => (
            <div key={i}>
              <p style={styles.question}>{q.question}</p>
              {q.options.map((opt, idx) => (
                <label key={idx} style={styles.label}>
                  <input
                    type="radio"
                    name={`question-${i}`}
                    value={idx}
                    checked={answers[i] === idx}
                    style={styles.input}
                    onChange={() => {
                      const updatedAnswers = [...answers];
                      updatedAnswers[i] = idx;
                      setAnswers(updatedAnswers);
                    }}
                  />
                  {opt}
                </label>
              ))}
            </div>
          ))}
          <button 
            onClick={submitAnswers} 
            style={styles.button}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default TakeQuiz;
