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
};


export const updateUser = async (userId, userData) => {
  try {
    const formData = new FormData();
    
    // Ajoutez les champs modifiés à formData
    if (userData.username) {
      formData.append('username', userData.username);
    }
    if (userData.email) {
      formData.append('email', userData.email);
    }
    if (userData.number) {
      formData.append('number', userData.number);
    }
    if (userData.password) {
      formData.append('password', userData.password);
    }
    if (userData.profilePhoto) {
      //console.log(userData.profilePhoto);
      formData.append('profilePhoto', userData.profilePhoto);
    }

    const response = await axios.put(`${API_URL}/user/${userId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data'},
      withCredentials: true
    });

     // Si la mise à jour réussit, enregistrez l'URL de l'image dans le localStorage
     if (userData.profilePhoto) {
      localStorage.setItem('profilePhoto', response.data.profilePhoto);
    }

    return response.data; // Les données retournées par l'API
  } catch (error) {
    console.error('Erreur lors de la modification des données de l\'utilisateur:', error);
    throw error;
  }
};
