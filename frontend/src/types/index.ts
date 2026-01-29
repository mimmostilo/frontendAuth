export interface User {
  id: string;
  nome: string;
  cognome: string;
  email: string;
  ruolo: UserRole;
  permessi: string[];
  dataCreazione: string;
  ultimaModifica?: string;
  stato: 'ATTIVO' | 'INATTIVO' | 'SOSPESO';
}

export enum UserRole {
  USER = 'USER',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
  SU = 'SU'
}

export interface AuditLog {
  id: string;
  utenteEmail: string;
  azione: string;
  timestamp: string;
  ip: string;
  userAgent: string;
  esito: 'SUCCESSO' | 'FALLITA';
  dettagli?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}