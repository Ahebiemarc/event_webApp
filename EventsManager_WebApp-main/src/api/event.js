import axios from 'axios';
import { API_URL } from './constant';

export const createEvent = async (eventData) => {
  try {
    const formData = new FormData();
    formData.append('title', eventData.title);
    formData.append('description', eventData.description);
    formData.append('price', eventData.price);
    formData.append('date', eventData.date);
    formData.append('location', eventData.location);
    formData.append('photo', eventData.photo);

    const response = await axios.post(`${API_URL}/event/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de l\'événement:', error);
    throw error;
  }
};


export const getEventsWithLimit = async (limit) => {
  try {
    const response = await axios.get(`${API_URL}/events-limit`, {
      params: {
        limit: limit,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    throw error;
  }
};

export const getEventById = async (eventId) => {
  try {
    const response = await axios.get(`${API_URL}/event/${eventId}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    throw error;
  }
};

export const fetchEventsWithPagination = async (page = 1, limit = 8) => {
  try {
    const response = await axios.get(`${API_URL}/events-pagination?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    throw error; // Vous pouvez gérer l'erreur différemment selon vos besoins
  }
};


export const fetchAllEventTags = async () => {
  try {
    const response = await axios.get(`${API_URL}/events/tags`);
    return response.data;  // Retourne les données directement
  } catch (error) {
    console.error('Erreur lors de la récupération des tags d\'événements:', error);
    throw error; // Rethrow l'erreur pour gestion ultérieure
  }
};


export const fetchAllEventSearch = async (search) => {
  try {
    const response = await axios.get(`${API_URL}/events`, {
      params: {
        search: search,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    throw error;
  }
};


export const fetchAllEventByUserId = async (page=1, limit=4) => {
  try {
    const response = await axios.get(`${API_URL}/events/by-userId?page=${page}&limit=${limit}`, {withCredentials: true,});
    return response.data;  // Retourne les données directement
  } catch (error) {
    console.error('Erreur lors de la récupération des tags d\'événements:', error);
    throw error; // Rethrow l'erreur pour gestion ultérieure
  }
};


export const updateEvent = async (eventId, eventData) => {
  try {
    const formData = new FormData();
    
    // Ajoutez les champs modifiés à formData
    if (eventData.title) {
      formData.append('title', eventData.title);
    }
    if (eventData.description) {
      formData.append('description', eventData.description);
    }
    if (eventData.price) {
      formData.append('price', eventData.price);
    }
    if (eventData.date) {
      formData.append('date', eventData.date);
    }
    if (eventData.location) {
      formData.append('location', eventData.location);
    }
    if (eventData.photo) {
      console.log(eventData.photo);
      formData.append('photo', eventData.photo);
    }

    const response = await axios.put(`${API_URL}/event/upload/${eventId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data'},
      withCredentials: true
    });

    return response.data; // Les données retournées par l'API
  } catch (error) {
    console.error('Erreur lors de la modification des données de l\'évènement:', error);
    throw error;
  }
};


export const deleteEvent = async (eventId) => {
  try {
    const response = await axios.delete(`${API_URL}/event/delete/${eventId}`, {withCredentials: true});
    return response.data; // Les données retournées par l'API
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'évènement:', error);
    throw error;
  }
}

