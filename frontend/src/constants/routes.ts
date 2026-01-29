export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  USERS: {
    LIST: '/users',
    CREATE: '/users/create',
    EDIT: '/users/edit/:id',
    DETAIL: '/users/detail/:id',
  },
  AUDIT: '/audit',
} as const;

export type RouteKey = keyof typeof ROUTES;