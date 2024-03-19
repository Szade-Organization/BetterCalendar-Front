import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const convertEventDates = (event) => ({
  ...event,
  date_start: new Date(event.date_start),
  date_end: new Date(event.date_end),
});

export const fetchActivities = async () => {
  try {
    const response = await axios.get(`${API_URL}/activity/`);
    const data = response.data.map(convertEventDates);
    return data;
  } catch (error) {
    throw new Error("Could not fetch activities from the server.");
  }
};

export const addActivity = async (activity) => {
  const response = await axios.post(`${API_URL}/activity/`, activity, {
    headers: {
      "Content-Type": "application/json",
    },
  }); 
  if (response.status !== 201) {
    throw new Error("Failed to add activity");
  }
  return convertEventDates(response.data);
};

export const editActivity = async ({ id, activity }) => {
  try {
    const response = await axios.put(`${API_URL}/activity/${id}/`, activity, {
      headers: {
        "Content-Type": "application/json",
      },
    });  
    return convertEventDates(response.data);
  } catch (error) {
    throw new Error(`Failed to update activity with ID ${id}`);
  }
};

export const createUserAccount = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/user/`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status !== 201) {
      throw new Error("Failed to create user account");
    }
    return response.data;
  } catch (error) {
    throw new Error("Failed to create user account");
  }
};

export const loginUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/user/`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status !== 201) {
      throw new Error("Failed to create user account");
    }
    return response.data;
  } catch (error) {
    throw new Error("Failed to create user account");
  }
};
