import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { hasPermission } from '../../utils/authUtils';
import { userService } from '../../services/userService';
import { User } from '../../types';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { toast } from '../../components/ui/Toast';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      // In a real application, we would call the service to fetch user details
      // For now, we'll simulate the data
      setTimeout(() => {
        const mockUser: User = {
          id: id || '',
          nome: 'Mario',
          cognome: 'Rossi',
          email: 'mario.rossi@example.com',
          ruolo: 'ADMIN',
          permessi: ['VIEW_USERS_LIST', 'CREATE_USER', 'EDIT_USER', 'DELETE_USER'],
          dataCreazione: '2023-01-15',
          ultimaModifica: '2023-05-20',
          stato: 'ATTIVO'
        };
        
        setUser(mockUser);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching user details:', error);
      toast.error('Errore nel caricamento dei dettagli utente');
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!window.confirm('Sei sicuro di voler eliminare questo utente? Questa azione non può essere annullata.')) {
      return;
    }

    try {
      // In a real application, we would call the service to delete the user
      toast.success('Utente eliminato con successo');
      navigate('/users');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Errore durante l\'eliminazione dell\'utente');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" text="Caricamento dettagli utente..." />
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dettagli Utente</h1>
        <div className="flex space-x-3">
          {hasPermission(currentUser, 'EDIT_USER') && (
            <Link to={`/users/edit/${user.id}`}>
              <Button>Modifica</Button>
            </Link>
          )}
          {hasPermission(currentUser, 'DELETE_USER') && (
            <Button variant="danger" onClick={handleDeleteUser}>
              Elimina
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <div className="text-center">
            <div className="mx-auto bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 flex items-center justify-center text-gray-500 text-3xl">
              {user.nome.charAt(0).toUpperCase()}{user.cognome.charAt(0).toUpperCase()}
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
              {user.nome} {user.cognome}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{user.ruolo}</p>
            <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
        </Card>

        <Card title="Informazioni Utente" className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">ID</h4>
              <p className="text-gray-900 dark:text-white">{user.id}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Nome</h4>
              <p className="text-gray-900 dark:text-white">{user.nome}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Cognome</h4>
              <p className="text-gray-900 dark:text-white">{user.cognome}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h4>
              <p className="text-gray-900 dark:text-white">{user.email}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Ruolo</h4>
              <p className="text-gray-900 dark:text-white">{user.ruolo}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Stato</h4>
              <p className={`text-gray-900 dark:text-white ${
                user.stato === 'ATTIVO' 
                  ? 'text-green-600' 
                  : user.stato === 'INATTIVO'
                  ? 'text-red-600'
                  : 'text-yellow-600'
              }`}>
                {user.stato}
              </p>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Permessi</h4>
              <div className="mt-1 flex flex-wrap gap-2">
                {user.permessi.map((permesso, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100"
                  >
                    {permesso}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Dettagli Account">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Data Creazione</h4>
              <p className="text-gray-900 dark:text-white">{user.dataCreazione}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Ultima Modifica</h4>
              <p className="text-gray-900 dark:text-white">{user.ultimaModifica || 'Nessuna modifica'}</p>
            </div>
          </div>
        </Card>

        <Card title="Azioni Rapide">
          <div className="space-y-3">
            <Link to={`/users/edit/${user.id}`}>
              <Button variant="outline" className="w-full">Modifica Profilo</Button>
            </Link>
            <Button variant="outline" className="w-full">Reset Password</Button>
            <Button variant="outline" className="w-full">Visualizza Log Attività</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserDetail;