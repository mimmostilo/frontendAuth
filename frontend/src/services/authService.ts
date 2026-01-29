import api from './api';
import { User } from '../types';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  nome: string;
  cognome: string;
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  async register(userData: RegisterData): Promise<LoginResponse> {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  async logout(): Promise<void> {
    // Note: The actual logout is handled by clearing the token in the store
    // The backend might have an endpoint to invalidate the token if needed
  },

  async getCurrentUser(): Promise<User> {
    // Since the token is in the header via interceptor, we can make a request to get user info
    // For now, we'll assume the backend has an endpoint to get current user info
    // If not available, we can return the user stored in local storage
    const response = await api.get('/utenti/me'); // Assuming this endpoint exists
    return response.data;
  }
};