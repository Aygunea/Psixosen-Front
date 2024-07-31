import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
    const user=useSelector(state=>state.user?.user)
    const isAdmin = user?.isAdmin
    return isAdmin ? element : <Navigate to="/" />;
};

export default PrivateRoute
