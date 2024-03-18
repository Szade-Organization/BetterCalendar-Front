import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';



export const initialUser = {
    _id: '',
    username: '',
    email: ''
};

const INITIAL_STATE = {
    user: initialUser,
    login: () => { },
    logout: () => { },
    isAuthenticated: false,
    isLoading: false
};

const AuthContext = createContext(INITIAL_STATE);

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(initialUser);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const checkAuthUser = async () => {
        setIsLoading(true);
        console.log('checking user');
        try {
            // const data = await getCurrentUser();
            // const data = {
            //     _id: "421421",
            //     username: "user1",
            //     email: "user@email.com"
            // };
            const data=null;
            if (data) {
                setUser(data);
                setIsAuthenticated(true);
                navigate('/');
                return true;
            }
            navigate("/login");
            return false;
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuthUser();
    }, []);


    const login = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
        navigate('/');
    };


    const logout = async () => {
        // const data = await logoutUser();
        setUser(initialUser);
        setIsAuthenticated(false);
        navigate('/login');
    };


    const value = {
        user,
        login,
        logout,
        isAuthenticated,
        isLoading
    };
    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    );

}

export const useUserContext = () => {
    return useContext(AuthContext);
}