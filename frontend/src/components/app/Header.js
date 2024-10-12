import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { useAuth } from '../../context/AuthContext'; 

const styles = {
  nav: {
    backgroundColor: '#0056b3', 
    padding: '10px 20px', 
    borderRadius: '8px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
  },
  logo: {
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: 'bold',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
  ul: {
    listStyleType: 'none',
    display: 'flex',
    padding: 0,
    margin: 0,
    alignItems: 'center', 
  },
  li: {
    margin: '0 15px',
  },
  link: {
    textDecoration: 'none',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '500',
    padding: '10px 15px', 
    borderRadius: '5px', 
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  linkHover: {
    backgroundColor: '#007BFF', 
    color: '#ffffff', 
  },
};
const Header = () => {
  const { isAuthenticated } = useAuth(); 

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>QuizMaster</Link>
      <ul style={styles.ul}>
        {isAuthenticated ? ( 
          <>
            <li style={styles.li}>
              <Link to="/quizzes" style={styles.link} onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                Quizzes
              </Link>
            </li>
            <li style={styles.li}>
              <Link to="/create-quiz" style={styles.link} onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                Create Quiz
              </Link>
            </li>
            <li style={styles.li}>
              <Link to="/user-results" style={styles.link} onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                My Results
              </Link>
            </li>
            <li style={styles.li}>
              <LogoutButton />
            </li>
          </>
        ) : (
          <>
            <li style={styles.li}>
              <Link to="/register" style={styles.link} onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                Register
              </Link>
            </li>
            <li style={styles.li}>
              <Link to="/login" style={styles.link} onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
