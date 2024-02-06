import PropTypes from 'prop-types';
import { Navigate, Outlet } from "react-router-dom"


const ProtectedRoute = ({ user }) => {
    if (!user.isAuthenticated) {
        return <Navigate to="/login" />;
    }
    return <Outlet />;
};

ProtectedRoute.propTypes = {
    user: PropTypes.shape({
        isAuthenticated: PropTypes.bool.isRequired,
    }).isRequired,
};

export default ProtectedRoute;