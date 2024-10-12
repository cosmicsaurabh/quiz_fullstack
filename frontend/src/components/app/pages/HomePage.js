import React from 'react';

const HomePage = () => {
  const styles = {
    wrapper: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa', 
      color: '#333', 
      textAlign: 'center',
      minHeight: '100vh', 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      backgroundColor: '#007bff', 
      color: 'white',
      padding: '20px',
      width: '100%',
    },
    content: {
      margin: '20px',
    },
    footer: {
      marginTop: 'auto', 
      padding: '10px',
      backgroundColor: '#343a40', 
      color: 'white',
      width: '100%',
    },
  };

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <h1>Welcome to the Home Page</h1>
      </header>
      <main style={styles.content}>
        <p>Explore our features and enjoy your stay!</p>
      </main>
      <footer style={styles.footer}>
        <p>&copy; 2024 Your Company Name</p>
      </footer>
    </div>
  );
};

export default HomePage;
