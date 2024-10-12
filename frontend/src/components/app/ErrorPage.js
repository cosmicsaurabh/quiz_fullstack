import { NavLink } from "react-router-dom";

const styles = {
    errorPage: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      textAlign: "center",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f4f4f4",
      color: "#333"
    },
    content: {
      maxWidth: "600px",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      padding: "30px",
    },
    header: {
      fontSize: "5rem",
      color: "#6947bf",
      marginBottom: "10px",
    },
    subHeader: {
      fontSize: "1.5rem",
      margin: "10px 0",
    },
    paragraph: {
      fontSize: "1rem",
      lineHeight: "1.5",
      margin: "20px 0",
    },
    btns: {
      marginTop: "20px",
    },
    button: {
      display: "inline-block",
      padding: "10px 20px",
      backgroundColor: "#6947bf",
      color: "white",
      textDecoration: "none",
      borderRadius: "5px",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#286bb5",
    },
    '@media (maxWidth: 768px)': {
      header: {
        fontSize: "3rem",
      },
      subHeader: {
        fontSize: "1.2rem",
      },
      paragraph: {
        fontSize: "0.9rem",
      },
      content: {
        padding: "20px",
      },
    },
    '@media (maxWidth: 480px)': {
      header: {
        fontSize: "2.5rem",
      },
      subHeader: {
        fontSize: "1rem",
      },
      paragraph: {
        fontSize: "0.85rem",
      },
      button: {
        padding: "8px 16px",
      },
    },
  };
  
  const ErrorPage = () => {
    return (
      <section style={styles.errorPage}>
        <div style={styles.content}>
          <h2 style={styles.header}>404</h2>
          <h4 style={styles.subHeader}>Sorry! Page not found</h4>
          <p style={styles.paragraph}>
            Oops! It seems like the page you're trying to access doesn't exist.
            Please check the URL and try again.
          </p>
          <div style={styles.btns}>
            <NavLink to="/" style={styles.button}>
              Home Coming...
            </NavLink>
          </div>
        </div>
      </section>
    );
  };
  
  
export default ErrorPage;

