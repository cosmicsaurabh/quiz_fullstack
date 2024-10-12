import React, { useState } from 'react';
import useAxiosWithAuth from '../../axiosInstance';
const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  const [error, setError] = useState(''); 
  const axios = useAxiosWithAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); 
    setError(''); 
    if (!title) {
      setError('Title is required.');
      return;
    }

    for (const question of questions) {
      if (!question.question) {
        setError('All questions must have a question text.');
        return;
      }
      for (const option of question.options) {
        if (!option) {
          setError('All options must be filled.');
          return;
        }
      }
      if (question.correctAnswer < 0 || question.correctAnswer > 3) {
        setError('Correct answer index must be between 0 and 3.');
        return;
      }
    }

    try {
      const token = localStorage.getItem('token'); 
      await axios.post(`${BACKEND_BASE_URL}app/create`, { title, questions }, { headers: { Authorization: `Bearer ${token}` } });
      setError('');
      alert('Quiz created!');
      setTitle('');
      setQuestions([{ question: '', options: ['', '', '', ''], correctAnswer: 0 }]);
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      setError('Quiz creation failed: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  };

  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][e.target.name] = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const isFormValid = () => {
    if (!title) return false;
    for (const question of questions) {
      if (!question.question) return false;
      for (const option of question.options) {
        if (!option) return false;
      }
      if (question.correctAnswer < 0 || question.correctAnswer > 3) return false;
    }
    return true;
  };

  return (
    <form style={styles.formContainer} onSubmit={handleSubmit}>
      <h2>Create Quiz</h2>
      {error && <p style={styles.error}>{error}</p>} 
      <label style={styles.label}>Title:</label>
      <input
        style={styles.input}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter quiz title"
      />

      {questions.map((q, i) => (
        <div key={i} style={styles.questionBlock}>
          <label style={styles.label}>Question:</label>
          <input
            style={styles.input}
            type="text"
            name="question"
            value={q.question}
            onChange={(e) => handleQuestionChange(i, e)}
            placeholder="Enter question"
          />
          <label style={styles.label}>Options:</label>
          {q.options.map((opt, idx) => (
            <input
              key={idx}
              style={styles.input}
              type="text"
              value={opt}
              placeholder={`Option ${idx + 1}`}
              onChange={(e) => handleOptionChange(i, idx, e.target.value)}
            />
          ))}
          <label style={styles.label}>Correct Answer Index:</label>
          <input
            style={styles.input}
            type="number"
            name="correctAnswer"
            value={q.correctAnswer}
            onChange={(e) => handleQuestionChange(i, e)}
            min="0"
            max="3"
            placeholder="Enter correct answer index"
          />
        </div>
      ))}
      <button style={styles.addQuestionButton} type="button" onClick={addQuestion}>
        Add Question
      </button>
      <button 
      style={{
        ...styles.button,
        backgroundColor: isFormValid() ? '#007BFF' : '#232424', 
      }}
     type="submit" >
        Create Quiz
      </button>
    </form>
  );
};

const styles = {
  formContainer: {
    backgroundColor: '#f9f9f9',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
  },
  label: {
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
  },
  questionBlock: {
    marginBottom: '20px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  addQuestionButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
};

export default CreateQuiz;
