import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../hooks/useAuth';
import { hasPermission } from '../../utils/authUtils';
import { userSchema } from '../../utils/validationUtils';
import { userService } from '../../services/userService';
import { User, UserRole } from '../../types';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { toast } from '../../components/ui/Toast';

type CreateUserFormInputs = {
  nome: string;
  cognome: string;
  email: string;
  password: string;
  ruolo: string;
  stato: string;
  permessi: string[];
};

const UserCreate = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CreateUserFormInputs>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: CreateUserFormInputs) => {
    if (!hasPermission(currentUser, 'CREATE_USER')) {
      toast.error('Non hai i permessi per creare un nuovo utente');
      return;
    }

    setLoading(true);
    try {
      // In a real application, we would call the service to create the user
      // For now, we'll simulate the creation
      setTimeout(() => {
        toast.success('Utente creato con successo!');
        navigate('/users', { replace: true });
        setLoading(false);
      }, 1000);
    } catch (error: any) {
      setError('root', { message: error.message || 'Si è verificato un errore' });
      toast.error(error.message || 'Si è verificato un errore durante la creazione dell\'utente');
      setLoading(false);
    }
  };

  // Check if user has permission to create other users
  if (!hasPermission(currentUser, 'CREATE_USER')) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Accesso negato</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Non hai i permessi per creare nuovi utenti.</p>
        <Link to="/users">
          <Button className="mt-4">Torna alla lista utenti</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Crea Nuovo Utente</h1>
        <p className="text-gray-600 dark:text-gray-400">Compila i campi sottostanti per creare un nuovo utente</p>
      </div>

      <Card>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Input
                label="Nome"
                placeholder="Mario"
                error={errors.nome?.message}
                {...register('nome')}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                label="Cognome"
                placeholder="Rossi"
                error={errors.cognome?.message}
                {...register('cognome')}
              />
            </div>

            <div className="sm:col-span-4">
              <Input
                label="Email"
                type="email"
                placeholder="indirizzo@email.com"
                error={errors.email?.message}
                {...register('email')}
              />
            </div>

            <div className="sm:col-span-4">
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register('password')}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="ruolo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ruolo
              </label>
              <select
                id="ruolo"
                className={`block w-full rounded-md border ${
                  errors.ruolo 
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
                } shadow-sm py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                {...register('ruolo')}
              >
                <option value="">Seleziona un ruolo</option>
                <option value="USER">Utente</option>
                <option value="MODERATOR">Moderatore</option>
                <option value="ADMIN">Amministratore</option>
                <option value="SU">Super Utente</option>
              </select>
              {errors.ruolo && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.ruolo.message}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="stato" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Stato
              </label>
              <select
                id="stato"
                className={`block w-full rounded-md border ${
                  errors.stato 
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
                } shadow-sm py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                {...register('stato')}
              >
                <option value="ATTIVO">Attivo</option>
                <option value="INATTIVO">Inattivo</option>
                <option value="SOSPESO">Sospeso</option>
              </select>
              {errors.stato && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.stato.message}</p>
              )}
            </div>
          </div>

          {errors.root && (
            <div className="text-red-600 text-sm text-center">
              {errors.root.message}
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <Link to="/users">
              <Button variant="outline" type="button">Annulla</Button>
            </Link>
            <Button type="submit" loading={loading}>
              Crea Utente
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default UserCreate;