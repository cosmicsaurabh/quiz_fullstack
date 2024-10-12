import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
const PublicRoute = ({ element }) => {
    const { isAuthenticated } = useAuth();
    
    return !isAuthenticated ? element : <Navigate to="/" />;
  };
  
  export default PublicRoute;
  