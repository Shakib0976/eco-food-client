import React, { Children, use } from 'react';
import UseUserRole from '../Hooks/UseUserRole';
import { AuthContext } from '../Context/AuthContext';
import { Navigate } from 'react-router';


const AdminRoute = ({ children }) => {
    const { user, loading } = use(AuthContext)
    const { role, roleLoading } = UseUserRole();

    if (loading || roleLoading) {
        return <span className="loading loading-spinner loading-xl"></span>
    }

    if (!user || role !== 'admin') {
        return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    }

    return children;
};

export default AdminRoute;