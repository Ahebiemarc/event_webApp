import axios from "axios";
import { API_URL } from "./constant";

export const getUser = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`, {withCredentials: true});
      return response.data; // Les données retournées par l'API
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      throw error;
    }
  }