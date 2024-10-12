import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosWithAuth from '../axiosInstance';
const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const axios = useAxiosWithAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name || !email || !password) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_BASE_URL}auth/register`, { name, email, password });
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      setErrorMessage(error.response?.data?.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <form style={styles.formContainer} onSubmit={handleSubmit}>
      <h2>Register</h2>
      {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
      <label style={styles.label}>Name:</label>
      <input
        style={styles.input}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label style={styles.label}>Email:</label>
      <input
        style={styles.input}
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label style={styles.label}>Password:</label>
      <input
        style={styles.input}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button style={styles.button} type="submit">Register</button>
    </form>
  );
};
export default Register;
const styles = {
  formContainer: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    margin: 'auto',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  inputFocus: {
    borderColor: '#007bff',
    outline: 'none',
  },
  errorMessage: {
    color: 'red',
    marginBottom: '10px',
  },
};
