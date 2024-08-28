import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    return isLoggedIn ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
