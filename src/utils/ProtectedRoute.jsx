import React from 'react'
import { Navigate, Outlet  } from "react-router-dom"
import { useSelector } from 'react-redux'


const ProtectedRoute = ({user}) => {
    if (!user.isAuthenticated) {
        return <Navigate to="/login" />;
    }
    return <Outlet />;
};

export default ProtectedRoute;