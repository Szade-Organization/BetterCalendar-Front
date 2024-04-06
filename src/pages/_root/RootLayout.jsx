import { Outlet, Navigate } from "react-router-dom";
import { Spinner } from "../../components/Ui/Spinners/Spinner";
import { useUserContext } from "../../context/AuthContext";

const RootLayout = () => {
    const { isAuthenticated, isLoading } = useUserContext();

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
        <div className="w-full h-full">
            <Outlet />
        </div>
    );
};

export default RootLayout;
