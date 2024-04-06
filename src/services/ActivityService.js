import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers['Authorization'] =  token ? `Token ${token}` : ''; 
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const convertEventDates = (event) => ({
  ...event,
  date_start: new Date(event.date_start),
  date_end: new Date(event.date_end),
});

export const fetchActivities = async () => {
  try {
    const response = await api.get(`/activity/`); 
    const data = response.data.map(convertEventDates);
    return data;
  } catch (error) {
    throw new Error("Could not fetch activities from the server.");
  }
};

export const addActivity = async (activity) => {
  const response = await api.post(`/activity/`, activity); 
  if (response.status !== 201) {
    throw new Error("Failed to add activity");
  }
  return convertEventDates(response.data);
};

export const editActivity = async ({ id, activity }) => {
  try {
    const response = await api.put(`/activity/${id}/`, activity); 
    return convertEventDates(response.data);
  } catch (error) {
    throw new Error(`Failed to update activity with ID ${id}`);
  }
};
