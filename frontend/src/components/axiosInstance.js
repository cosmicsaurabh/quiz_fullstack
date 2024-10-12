import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {  useNavigate } from 'react-router-dom';

const useAxiosWithAuth = () => {
  const { logout } = useAuth();
  const navigate = useNavigate()
  const axiosInstance = axios.create({
    
  });

  axiosInstance.interceptors.response.use(
    response => response, 
    error => {
      if (error.response?.status === 401) {
        
        logout(); 
        navigate('/login')
        alert('Session expired. Please log in again.');
      }
      return Promise.reject(error); 
    }
  );

  return axiosInstance;
};

export default useAxiosWithAuth;
