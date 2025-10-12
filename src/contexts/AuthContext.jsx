// src/contexts/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import { getCurrentUser, loginUser, registerUser, logoutUser, isAuthenticated as checkAuth } from '../api/users';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const initAuth = async () => {
            if (checkAuth()) {
                try {
                    const userData = await getCurrentUser();
                    setUser(userData);
                } catch (err) {
                    console.error('Failed to get user:', err);
                    logoutUser();
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (credentials) => {
        try {
            setError(null);
            await loginUser(credentials);
            const userData = await getCurrentUser();
            setUser(userData);
            return { success: true };
        } catch (err) {
            const errorMessage = err.response?.data?.detail || 'Login failed';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const register = async (userData) => {
        try {
            setError(null);
            await registerUser(userData);
            await login({ email: userData.email, password: userData.password });
            return { success: true };
        } catch (err) {
            const errorMessage = err.response?.data?.detail || 'Registration failed';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const logout = () => {
        logoutUser();
        setUser(null);
    };

    const updateUser = async (userData) => {
        try {
            setError(null);
            const updatedUser = await updateUserProfile(userData);
            setUser(updatedUser);
            return { success: true };
        } catch (err) {
            const errorMessage = err.response?.data?.detail || 'Update failed';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;