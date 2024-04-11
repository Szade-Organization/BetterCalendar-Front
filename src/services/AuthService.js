import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const createUserAccount = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register/`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      const customError = new Error("Validation error");
      customError.statusCode = 400;
      customError.body = error.response.data;
      throw customError;
    } else {
      throw new Error("Something went wrong, try again");
    }
  }
};

export const loginUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login/`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      const customError = new Error("Bad request");
      customError.statusCode = 400;
      customError.body = error.response.data;
      throw customError;
    } else {
      throw new Error("Something went wrong, try again");
    }
  }
};

export const getUser = async () => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.get(`${API_URL}/auth/profile/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error("Bad request");
    } else {
      throw new Error("Something went wrong, try again");
    }
  }
};

export const logoutUser = async () => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.post(`${API_URL}/auth/logout/`, null, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error("Bad request");
    } else {
      throw new Error("Something went wrong, try again");
    }
  }
};

export const changePassword = async (changePasswordRequest) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.post(
      `${API_URL}/auth/change-password/`,
      changePasswordRequest,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      const customError = new Error("Bad request");
      customError.statusCode = 400;
      customError.body = error.response.data;
      throw customError;
    } else {
      throw new Error("Something went wrong, try again");
    }
  }
};

export const changeEmail = async (changeEmailRequest) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.post(
      `${API_URL}/auth/change-email/`,
      changeEmailRequest,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      const customError = new Error("Bad request");
      customError.statusCode = 400;
      customError.body = error.response.data;
      throw customError;
    } else {
      throw new Error("Something went wrong, try again");
    }
  }
};
