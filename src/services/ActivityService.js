const API_URL = import.meta.env.VITE_API_URL;

const convertEventDates = (event) => ({
  ...event,
  date_start: new Date(event.date_start),
  date_end: new Date(event.date_end),
});

export const fetchActivities = async () => {
  const response = await fetch(`${API_URL}/activity/`);
  if (!response.ok) {
    throw new Error("Could not fetch activities from the server.");
  }
  const data = await response.json();
  return data.map(convertEventDates);
};

export const addActivity = async (activity) => {
  const response = await fetch(`${API_URL}/activity/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activity),
  });
  if (!response.created) {
    throw new Error("Failed to add activity");
  }
  const data = await response.json();
  console.log(data);
  return convertEventDates(data);
};

export const editActivity = async ({ id, activity }) => {
  const response = await fetch(`${API_URL}/activity/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activity),
  });
  console.log("json", JSON.stringify(activity));
  if (!response.ok) {
    throw new Error(`Failed to update activity with ID ${id}`);
  }
  const data = await response.json();
  console.log(data);
  return convertEventDates(data);
};
