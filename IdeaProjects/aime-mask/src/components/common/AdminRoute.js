import { Navigate } from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";

const AdminRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/auth/sign-in" />;
    }

    if (user.role !== "admin") {
        return <Navigate to="/" />;
    }

    return children;
};

export default AdminRoute;
