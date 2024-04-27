import axios from "axios";
import { useUserContext } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers["Authorization"] = token ? `Token ${token}` : "";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const convertEventDates = (event) => ({
  ...event,
  date_start: new Date(event.date_start),
  date_end: new Date(event.date_end),
  allDay: false,
});

export const fetchActivities = async (userId) => {
  try {
    const response = await api.get(`/activity/`, {
      params: { user: userId },
    });
    const data = response.data.map(convertEventDates);
    return data;
  } catch (error) {
    console.error(error);
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

export const deleteActivity = async (id) => {
  try {
    const response = await api.delete(`/activity/${id}/`);
    if (response.status !== 204) {
      throw new Error("Failed to delete activity");
    }
  } catch (error) {
    throw new Error(`Failed to delete activity with ID ${id}`);
  }
};

export const fetchCategories = async (userId) => {
  try {
    const response = await api.get(`/category/`, {
      params: { user: userId },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Could not fetch categories from the server.");
  }
};

export const addCategory = async (category) => {
  const response = await api.post(`/category/`, category);
  if (response.status !== 201) {
    throw new Error("Failed to add category");
  }
  return response.data;
};

export const editCategory = async ({ id, category }) => {
  try {
    const response = await api.put(`/category/${id}/`, category);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update category with ID ${id}`);
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/category/${id}/`);
    if (response.status !== 204) {
      throw new Error("Failed to delete category");
    }
  } catch (error) {
    throw new Error(`Failed to delete category with ID ${id}`);
  }
};
