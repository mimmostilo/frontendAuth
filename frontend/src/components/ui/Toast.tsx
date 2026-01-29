import { toast as sonnerToast, Toaster } from 'sonner';

// Wrapper for sonner toast to match our design system
export const toast = {
  success: (message: string, options?: any) => {
    return sonnerToast.success(message, {
      ...options,
      style: {
        backgroundColor: '#dcfce7',
        color: '#166534',
        border: '1px solid #bbf7d0',
        ...options?.style,
      },
    });
  },
  error: (message: string, options?: any) => {
    return sonnerToast.error(message, {
      ...options,
      style: {
        backgroundColor: '#fee2e2',
        color: '#b91c1c',
        border: '1px solid #fecaca',
        ...options?.style,
      },
    });
  },
  info: (message: string, options?: any) => {
    return sonnerToast.info(message, {
      ...options,
      style: {
        backgroundColor: '#dbeafe',
        color: '#1e40af',
        border: '1px solid #bfdbfe',
        ...options?.style,
      },
    });
  },
  warning: (message: string, options?: any) => {
    return sonnerToast(message, {
      ...options,
      style: {
        backgroundColor: '#fef3c7',
        color: '#92400e',
        border: '1px solid #fde68a',
        ...options?.style,
      },
    });
  },
  custom: (message: string, options?: any) => {
    return sonnerToast(message, options);
  },
};

export { Toaster as ToastContainer };