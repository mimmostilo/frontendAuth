import api from './api';
import { User, PaginatedResponse } from '../types';

interface CreateUserRequest {
  nome: string;
  cognome: string;
  email: string;
  password: string;
  ruolo: string;
  permessi: string[];
  stato: 'ATTIVO' | 'INATTIVO' | 'SOSPESO';
}

interface UpdateUserRequest {
  nome: string;
  cognome: string;
  email: string;
  ruolo: string;
  permessi: string[];
  stato: 'ATTIVO' | 'INATTIVO' | 'SOSPESO';
}

export const userService = {
  async getUsers(page: number = 1, limit: number = 10): Promise<PaginatedResponse<User>> {
    const response = await api.get(`/utenti?page=${page}&limit=${limit}`);
    return response.data;
  },

  async getUserById(id: string): Promise<User> {
    const response = await api.get(`/utenti/${id}`);
    return response.data;
  },

  async getUserByEmail(email: string): Promise<User> {
    const response = await api.get(`/utenti/email/${email}`);
    return response.data;
  },

  async createUser(userData: CreateUserRequest): Promise<User> {
    const response = await api.post('/utenti', userData);
    return response.data;
  },

  async updateUser(id: string, userData: UpdateUserRequest): Promise<User> {
    const response = await api.put(`/utenti/${id}`, userData);
    return response.data;
  },

  async deleteUser(id: string): Promise<void> {
    await api.delete(`/utenti/${id}`);
  },
};