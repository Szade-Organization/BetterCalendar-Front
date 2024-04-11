import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { getUser } from "../services/AuthService";

export const initialUser = {
  id: "",
  username: "",
  email: "",
};

const INITIAL_STATE = {
  user: initialUser,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  isLoading: false,
};

const AuthContext = createContext(INITIAL_STATE);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuth = async () => {
    const token = localStorage.getItem("jwt");
    if (token && token !== "undefined" && token !== "") {
      setIsLoading(true);
      try {
        const data = await getUser();
        setUser(data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("An error occurred: ", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = (userData) => {
    setUser(userData.user);
    localStorage.setItem("jwt", userData.token);
    setIsAuthenticated(true);
    navigate("/");
  };

  const logout = async () => {
    localStorage.removeItem("jwt");
    setUser(initialUser);
    setIsAuthenticated(false);
    navigate("/login");
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    isLoading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => {
  return useContext(AuthContext);
};
