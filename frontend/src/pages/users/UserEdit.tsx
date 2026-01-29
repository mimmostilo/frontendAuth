import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
import LoadingSpinner from '../../components/ui/LoadingSpinner';

type EditUserFormInputs = {
  nome: string;
  cognome: string;
  email: string;
  ruolo: string;
  stato: string;
  permessi: string[];
};

const UserEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [fetching, setFetching] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset
  } = useForm<EditUserFormInputs>({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const fetchUserData = async () => {
    try {
      setFetching(true);
      // In a real application, we would call the service to fetch user data
      // For now, we'll simulate the data
      setTimeout(() => {
        const mockUser: User = {
          id: id || '',
          nome: 'Mario',
          cognome: 'Rossi',
          email: 'mario.rossi@example.com',
          ruolo: 'ADMIN',
          permessi: ['VIEW_USERS_LIST', 'CREATE_USER', 'EDIT_USER'],
          dataCreazione: '2023-01-15',
          ultimaModifica: '2023-05-20',
          stato: 'ATTIVO'
        };
        
        setUser(mockUser);
        reset({
          nome: mockUser.nome,
          cognome: mockUser.cognome,
          email: mockUser.email,
          ruolo: mockUser.ruolo,
          stato: mockUser.stato,
          permessi: mockUser.permessi
        });
        setFetching(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Errore nel caricamento dei dati utente');
      setFetching(false);
    }
  };

  const onSubmit = async (data: EditUserFormInputs) => {
    if (!hasPermission(currentUser, 'EDIT_USER')) {
      toast.error('Non hai i permessi per modificare questo utente');
      return;
    }

    setLoading(true);
    try {
      // In a real application, we would call the service to update the user
      // For now, we'll simulate the update
      setTimeout(() => {
        toast.success('Utente aggiornato con successo!');
        navigate(`/users/detail/${id}`, { replace: true });
        setLoading(false);
      }, 1000);
    } catch (error: any) {
      setError('root', { message: error.message || 'Si è verificato un errore' });
      toast.error(error.message || 'Si è verificato un errore durante l\'aggiornamento dell\'utente');
      setLoading(false);
    }
  };

  // Check if user has permission to edit other users
  if (!hasPermission(currentUser, 'EDIT_USER')) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Accesso negato</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Non hai i permessi per modificare gli utenti.</p>
        <Link to="/users">
          <Button className="mt-4">Torna alla lista utenti</Button>
        </Link>
      </div>
    );
  }

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" text="Caricamento dati utente..." />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Utente non trovato</h2>
        <Link to="/users">
          <Button className="mt-4">Torna alla lista utenti</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Modifica Utente</h1>
        <p className="text-gray-600 dark:text-gray-400">Modifica i dati dell'utente {user.nome} {user.cognome}</p>
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
            <Link to={`/users/detail/${id}`}>
              <Button variant="outline" type="button">Annulla</Button>
            </Link>
            <Button type="submit" loading={loading}>
              Salva Modifiche
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default UserEdit;