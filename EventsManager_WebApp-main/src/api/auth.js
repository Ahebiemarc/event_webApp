import axios from "axios"
import { API_URL } from "./constant";


export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, userData,  {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
        
    } catch (error) {
        console.log('Erreur lors de l\'inscription T1 :', error);
        throw error;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, userData, { withCredentials: true });
        return response.data;
        
    } catch (error) {
        console.log('Erreur lors de la connexion :', error);
        throw error;
    }
}


export const logoutUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/logout`, { withCredentials: true });
      //const isAuth = response.data.isAuthenticated;
      //const userID = response.data.userID
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'authentification', error);
    }
  };