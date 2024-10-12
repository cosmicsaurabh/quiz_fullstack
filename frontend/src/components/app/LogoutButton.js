import React from 'react';
import { useAuth } from '../../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { logout } = useAuth(); 
    const navigate = useNavigate();
  const handleLogout = () => {
    logout(); 
    alert('Logged out successfully'); 
    navigate('/login')
  };

  return (
    <button onClick={handleLogout} style={styles.button}>
      Logout
    </button>
  );
};

const styles = {
  button: {
    backgroundColor: '#FF4C4C',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
};

export default LogoutButton;
