import api from './api';
import { AuditLog, PaginatedResponse } from '../types';

export const auditService = {
  async getAuditLogs(
    page: number = 1, 
    limit: number = 10,
    filters?: {
      utenteEmail?: string;
      azione?: string;
      esito?: string;
      startDate?: string;
      endDate?: string;
    }
  ): Promise<PaginatedResponse<AuditLog>> {
    let url = `/audit?page=${page}&limit=${limit}`;
    
    if (filters) {
      const searchParams = new URLSearchParams();
      
      if (filters.utenteEmail) searchParams.append('utenteEmail', filters.utenteEmail);
      if (filters.azione) searchParams.append('azione', filters.azione);
      if (filters.esito) searchParams.append('esito', filters.esito);
      if (filters.startDate) searchParams.append('startDate', filters.startDate);
      if (filters.endDate) searchParams.append('endDate', filters.endDate);
      
      if (searchParams.toString()) {
        url += `&${searchParams.toString()}`;
      }
    }
    
    const response = await api.get(url);
    return response.data;
  },

  async getAuditLogsByUser(email: string, page: number = 1, limit: number = 10): Promise<PaginatedResponse<AuditLog>> {
    const response = await api.get(`/audit/utente/${email}?page=${page}&limit=${limit}`);
    return response.data;
  },

  async getAuditLogsByResult(esito: string, page: number = 1, limit: number = 10): Promise<PaginatedResponse<AuditLog>> {
    const response = await api.get(`/audit/esito/${esito}?page=${page}&limit=${limit}`);
    return response.data;
  },

  async getAuditLogsByActionAndResult(azione: string, esito: string, page: number = 1, limit: number = 10): Promise<PaginatedResponse<AuditLog>> {
    const response = await api.get(`/audit/azione/${azione}/esito/${esito}?page=${page}&limit=${limit}`);
    return response.data;
  },
};