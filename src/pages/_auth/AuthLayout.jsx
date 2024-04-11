import { Outlet, Navigate } from "react-router-dom";
import { Spinner } from "../../components/Ui/Spinners/Spinner";
import { useUserContext } from "../../context/AuthContext";


export default function AuthLayout() {
    const { isAuthenticated, isLoading } = useUserContext();

    if (isLoading) {
        return (
            <div className="flex flex-1 justify-center items-center">
                <Spinner />
            </div>);

    }
    return (
        <>
            {isAuthenticated ? (
                <Navigate to="/" />
            ) : (
                <section className="flex flex-1 justify-center items-center flex-col py-10">
                    <Outlet />
                </section>
            )}
        </>
    );
}
