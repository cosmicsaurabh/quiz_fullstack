import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import useAxiosWithAuth from '../axiosInstance';

const Login = () => {
  const axios = useAxiosWithAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error message
    setErrorMessage('');

    // Basic validation
    if (!email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      login(response.data.token);
      alert('Login successful!');
      navigate('/');
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      // Handle specific error messages from the server
      const message = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : 'Login failed. Please check your credentials.';
      setErrorMessage(message);
    }
  };

  return (
    <form style={styles.formContainer} onSubmit={handleSubmit}>
      <h2>Login</h2>
      {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
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
      <button style={styles.button} type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;

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
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#218838',
  },
  inputFocus: {
    borderColor: '#28a745',
    outline: 'none',
  },
};