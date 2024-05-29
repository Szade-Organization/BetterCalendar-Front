import { Outlet, Navigate } from "react-router-dom";
import { Spinner } from "../../components/Ui/Spinners/Spinner";
import { useUserContext } from "../../context/AuthContext";
import { AddActivityModalProvider } from "../../context/AddActivityModalContext";

const RootLayout = () => {
    const { isAuthenticated, user, isLoading } = useUserContext();

    if (isLoading) {
        return (
            <div className="flex flex-1 justify-center items-center">
                <Spinner />
            </div>);
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <AddActivityModalProvider>
            <div className="w-full h-full">
                <Outlet />
            </div>
        </AddActivityModalProvider>
    );
};

export default RootLayout;
