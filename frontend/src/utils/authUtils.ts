import { User, UserRole } from '../types';

export const getTokenExpiration = (token: string): Date | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return new Date(payload.exp * 1000);
  } catch (error) {
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const expirationDate = getTokenExpiration(token);
  if (!expirationDate) return true;
  return expirationDate < new Date();
};

export const hasPermission = (user: User | null, permission: string): boolean => {
  if (!user) return false;
  return user.permessi.includes(permission);
};

export const hasRole = (user: User | null, role: UserRole): boolean => {
  if (!user) return false;
  return user.ruolo === role;
};

export const hasHigherOrEqualRole = (user: User | null, minRole: UserRole): boolean => {
  if (!user) return false;
  
  const roleHierarchy = {
    [UserRole.USER]: 1,
    [UserRole.MODERATOR]: 2,
    [UserRole.ADMIN]: 3,
    [UserRole.SU]: 4,
  };
  
  return roleHierarchy[user.ruolo] >= roleHierarchy[minRole];
};