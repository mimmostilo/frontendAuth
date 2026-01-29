import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from '../../components/ui/Toast';
import { useAuth } from '../../hooks/useAuth';
import { loginSchema } from '../../utils/validationUtils';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { User, UserRole } from '../../types';

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true);
    try {
      const result = await login(data.email, data.password);
      if (result.success) {
        toast.success('Accesso effettuato con successo!');
        navigate('/dashboard', { replace: true });
      } else {
        setError('root', { message: result.error });
        toast.error(result.error || 'Credenziali non valide');
      }
    } catch (error: any) {
      setError('root', { message: error.message || 'Si è verificato un errore' });
      toast.error(error.message || 'Si è verificato un errore durante il login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full space-y-8 p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Accedi al tuo account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Oppure{' '}
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
              crea un nuovo account
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="indirizzo@email.com"
              error={errors.email?.message}
              {...register('email')}
            />
            
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password')}
            />
          </div>

          {errors.root && (
            <div className="text-red-600 text-sm text-center">
              {errors.root.message}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            loading={loading}
          >
            Accedi
          </Button>
        </form>
        
        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Credenziali di prova:</p>
          <p>Admin: admin@example.com / password123</p>
          <p>Utente: user@example.com / password123</p>
        </div>
      </Card>
    </div>
  );
};

export default Login;