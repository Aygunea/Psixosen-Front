import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
    const isAdmin = true
    return isAdmin ? element : <Navigate to="/" />;
};

export default PrivateRoute