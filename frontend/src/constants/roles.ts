import { UserRole } from '../types';

export const ROLE_PERMISSIONS = {
  [UserRole.USER]: ['VIEW_DASHBOARD', 'VIEW_PROFILE'],
  [UserRole.MODERATOR]: [
    'VIEW_DASHBOARD', 
    'VIEW_PROFILE', 
    'VIEW_USERS_LIST', 
    'VIEW_USER_DETAILS', 
    'VIEW_AUDIT_LOGS',
    'CREATE_USER',
    'EDIT_USER'
  ],
  [UserRole.ADMIN]: [
    'VIEW_DASHBOARD', 
    'VIEW_PROFILE', 
    'VIEW_USERS_LIST', 
    'VIEW_USER_DETAILS', 
    'VIEW_AUDIT_LOGS',
    'CREATE_USER',
    'EDIT_USER',
    'DELETE_USER'
  ],
  [UserRole.SU]: [
    'VIEW_DASHBOARD', 
    'VIEW_PROFILE', 
    'VIEW_USERS_LIST', 
    'VIEW_USER_DETAILS', 
    'VIEW_AUDIT_LOGS',
    'CREATE_USER',
    'EDIT_USER',
    'DELETE_USER',
    'MANAGE_ALL'
  ]
} as const;

export const MENU_ITEMS = {
  [UserRole.USER]: [
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Profilo', route: '/profile' },
  ],
  [UserRole.MODERATOR]: [
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Profilo', route: '/profile' },
    { label: 'Utenti', route: '/users' },
    { label: 'Audit Logs', route: '/audit' },
  ],
  [UserRole.ADMIN]: [
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Profilo', route: '/profile' },
    { label: 'Utenti', route: '/users' },
    { label: 'Crea Utente', route: '/users/create' },
    { label: 'Audit Logs', route: '/audit' },
  ],
  [UserRole.SU]: [
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Profilo', route: '/profile' },
    { label: 'Utenti', route: '/users' },
    { label: 'Crea Utente', route: '/users/create' },
    { label: 'Audit Logs', route: '/audit' },
  ]
} as const;