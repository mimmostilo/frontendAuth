import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/authService';
import { User } from '../types';

export const useAuth = () => {
  const { user, token, isAuthenticated, isLoading, login, logout, setIsAuthenticated } = useAuthStore();
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          // Attempt to validate the token by fetching user data
          // If this fails, the interceptor will handle logout
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Token validation failed:', error);
          logout();
        }
      }
      setIsAuthenticated(!!token);
      setInitialLoadComplete(true);
    };

    initializeAuth();
  }, [token, setIsAuthenticated, logout]);

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      login(response.user, response.token);
      return { success: true, user: response.user };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Errore durante il login' 
      };
    }
  };

  const registerUser = async (userData: { nome: string; cognome: string; email: string; password: string }) => {
    try {
      const response = await authService.register(userData);
      login(response.user, response.token);
      return { success: true, user: response.user };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Errore durante la registrazione' 
      };
    }
  };

  const logoutUser = () => {
    logout();
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading: isLoading && !initialLoadComplete,
    initialLoadComplete,
    login: loginUser,
    register: registerUser,
    logout: logoutUser,
  };
};