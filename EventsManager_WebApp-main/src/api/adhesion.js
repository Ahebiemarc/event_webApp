import axios from "axios";
import { API_URL } from "./constant";


export const adhererEvent = async (eventId) => {
  try {
    const response = await axios.post(
      `${API_URL}/adhesion/${eventId}`, 
      {}, // Empty body
      { withCredentials: true } // Config object with `withCredentials`
    );
    return response.data; // Les données retournées par l'API
  } catch (error) {
    console.error('Erreur lors de l\'adhésion à l\'événement:', error);
    throw error;
  }
};

