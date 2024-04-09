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

export const fetchEventsWithPagination = async (page = 1, limit = 20) => {
  try {
    const response = await axios.get(`${API_URL}/events-pagination?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    throw error; // Vous pouvez gérer l'erreur différemment selon vos besoins
  }
};


