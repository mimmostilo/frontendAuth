import { z } from 'zod';

// Common validation schemas
export const emailSchema = z.string()
  .min(1, 'L\'email è richiesta')
  .email('Formato email non valido');

export const passwordSchema = z.string()
  .min(8, 'La password deve contenere almeno 8 caratteri')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'La password deve contenere almeno una lettera maiuscola, una minuscola e un numero');

export const nameSchema = z.string()
  .min(2, 'Il nome deve contenere almeno 2 caratteri')
  .max(50, 'Il nome non può superare i 50 caratteri')
  .regex(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/, 'Nome non valido');

export const userSchema = z.object({
  nome: nameSchema,
  cognome: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  ruolo: z.enum(['USER', 'MODERATOR', 'ADMIN', 'SU'], {
    required_error: 'Seleziona un ruolo',
    invalid_type_error: 'Ruolo non valido'
  }),
  stato: z.enum(['ATTIVO', 'INATTIVO', 'SOSPESO']),
  permessi: z.array(z.string()).optional(),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'La password è richiesta'),
});

export const registerSchema = z.object({
  nome: nameSchema,
  cognome: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});