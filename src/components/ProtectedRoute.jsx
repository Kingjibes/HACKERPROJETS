import React from 'react';
    import { Navigate, useLocation } from 'react-router-dom';
    import { useAuth } from '@/contexts/AuthContext';

    const ProtectedRoute = ({ children }) => {
      const { isAuthenticated, loading } = useAuth();
      const location = useLocation();

      if (loading) {
        return (
          <div className="flex-grow flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-primary"></div>
          </div>
        );
      }

      if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
      }

      return children;
    };

    export default ProtectedRoute;