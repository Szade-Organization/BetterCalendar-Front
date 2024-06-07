import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { getUser } from "../services/AuthService";

export const initialUser = {
  id: "",
  username: "",
  email: "",
};

const AuthContext = createContext();

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
    } else {
      setIsLoading(false);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (userData) => {
    localStorage.setItem("jwt", userData.token);
    await checkAuth();
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
