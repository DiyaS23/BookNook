// src/context/AuthProvider.jsx

import React, { createContext, useState, useContext, useMemo } from 'react';
import axios from 'axios';

const AuthContext = createContext();
// Define the API Base URL once
const API_BASE_URL = 'http://localhost:8080/api';

// Helper function to generate the Basic Auth header
const generateAuthHeader = (username, password) => {
    if (!username || !password) return null;
    const credentials = `${username}:${password}`;
    const encoded = btoa(credentials);
    return `Basic ${encoded}`;
};

export const AuthProvider = ({ children }) => {
    // State for the authentication header and user details
    const [authHeader, setAuthHeader] = useState(localStorage.getItem('authHeader') || null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

    // 💡 CREATE AUTHENTICATED AXIOS INSTANCE (WITHOUT baseURL)
    const authAxios = useMemo(() => {
        const instance = axios.create({
            // 💡 FIX: REMOVE 'baseURL' here to avoid doubling the path.
            // All API calls in components must use the full path.
            headers: authHeader ? { Authorization: authHeader } : {},
        });

        // Set the Authorization header globally for this instance
        if (authHeader) {
             instance.defaults.headers.common['Authorization'] = authHeader;
        } else {
             delete instance.defaults.headers.common['Authorization'];
        }
        return instance;
    }, [authHeader]);


    // Login function
    const login = async (username, password) => {
        const header = generateAuthHeader(username, password);
        if (!header) return;

        try {
            // Use a temporary unauthenticated Axios instance for the login test
            const tempAxios = axios.create();
            
            // NOTE: Must include API_BASE_URL here for the test call.
            const response = await tempAxios.get(`${API_BASE_URL}/users/current`, { 
                headers: { Authorization: header } 
            });
            
            // Store the header and user details
            localStorage.setItem('authHeader', header);
            setAuthHeader(header);
            
            // Store the crucial details: ID and ROLE
            const fetchedUser = { 
                id: response.data.id, 
                username: response.data.username, 
                role: response.data.role 
            }; 
            localStorage.setItem('user', JSON.stringify(fetchedUser));
            setUser(fetchedUser);

            return true;
        } catch (error) {
            console.error("Login failed:", error.response || error);
            logout(); 
            throw new Error("Invalid username or password.");
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('authHeader');
        localStorage.removeItem('user');
        setAuthHeader(null);
        setUser(null);
        // Clear global default header just in case regular axios is used
        delete axios.defaults.headers.common['Authorization']; 
    };

    const value = useMemo(() => ({
        authHeader,
        user,
        authAxios, 
        login,
        logout,
        isAdmin: user?.role === 'ADMIN'
    }), [authHeader, user, authAxios]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

// 💡 EXPORT THE BASE URL for all calls (both public and protected)
export { API_BASE_URL };