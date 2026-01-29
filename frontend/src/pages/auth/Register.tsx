import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from '../../components/ui/Toast';
import { useAuth } from '../../hooks/useAuth';
import { registerSchema } from '../../utils/validationUtils';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

type RegisterFormInputs = {
  nome: string;
  cognome: string;
  email: string;
  password: string;
};

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    setLoading(true);
    try {
      const result = await registerUser(data);
      if (result.success) {
        toast.success('Registrazione completata con successo!');
        navigate('/dashboard', { replace: true });
      } else {
        setError('root', { message: result.error });
        toast.error(result.error || 'Errore durante la registrazione');
      }
    } catch (error: any) {
      setError('root', { message: error.message || 'Si è verificato un errore' });
      toast.error(error.message || 'Si è verificato un errore durante la registrazione');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full space-y-8 p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Crea un nuovo account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Oppure{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              accedi al tuo account esistente
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
            <Input
              label="Nome"
              placeholder="Mario"
              error={errors.nome?.message}
              {...register('nome')}
            />
            
            <Input
              label="Cognome"
              placeholder="Rossi"
              error={errors.cognome?.message}
              {...register('cognome')}
            />
            
            <Input
              label="Email"
              type="email"
              placeholder="indirizzo@email.com"
              className="sm:col-span-2"
              error={errors.email?.message}
              {...register('email')}
            />
            
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              className="sm:col-span-2"
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
            Registrati
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Register;