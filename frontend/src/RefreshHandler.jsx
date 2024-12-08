import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefreshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            if (
                location.pathname === '/' ||
                location.pathname === '/login' ||
                location.pathname === '/signup'
            ) {
                navigate('/home', { replace: true }); // Simplified navigation logic
            }
        } else {
            setIsAuthenticated(false); // Optionally handle logout scenario
        }
    }, [location, navigate, setIsAuthenticated]);

    return null; // Doesn't render anything, just handles side-effects
}

export default RefreshHandler;
