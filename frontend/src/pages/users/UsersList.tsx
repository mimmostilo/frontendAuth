import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { hasPermission } from '../../utils/authUtils';
import { userService } from '../../services/userService';
import { User } from '../../types';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import { toast } from '../../components/ui/Toast';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { PaginatedResponse } from '../../types';

const UsersList = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  useEffect(() => {
    fetchUsers();
  }, [pagination.page]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // In a real application, we would call the service to fetch users
      // For now, we'll simulate the data
      setTimeout(() => {
        const mockUsers: User[] = [
          {
            id: '1',
            nome: 'Mario',
            cognome: 'Rossi',
            email: 'mario.rossi@example.com',
            ruolo: 'ADMIN',
            permessi: ['VIEW_USERS_LIST', 'CREATE_USER', 'EDIT_USER', 'DELETE_USER'],
            dataCreazione: '2023-01-15',
            stato: 'ATTIVO'
          },
          {
            id: '2',
            nome: 'Luigi',
            cognome: 'Bianchi',
            email: 'luigi.bianchi@example.com',
            ruolo: 'MODERATOR',
            permessi: ['VIEW_USERS_LIST', 'CREATE_USER', 'EDIT_USER'],
            dataCreazione: '2023-02-20',
            stato: 'ATTIVO'
          },
          {
            id: '3',
            nome: 'Anna',
            cognome: 'Verdi',
            email: 'anna.verdi@example.com',
            ruolo: 'USER',
            permessi: ['VIEW_PROFILE'],
            dataCreazione: '2023-03-10',
            stato: 'INATTIVO'
          },
          {
            id: '4',
            nome: 'Paolo',
            cognome: 'Neri',
            email: 'paolo.neri@example.com',
            ruolo: 'USER',
            permessi: ['VIEW_PROFILE'],
            dataCreazione: '2023-04-05',
            stato: 'ATTIVO'
          },
          {
            id: '5',
            nome: 'Maria',
            cognome: 'Gialli',
            email: 'maria.gialli@example.com',
            ruolo: 'SU',
            permessi: ['VIEW_USERS_LIST', 'CREATE_USER', 'EDIT_USER', 'DELETE_USER', 'MANAGE_ALL'],
            dataCreazione: '2023-01-01',
            stato: 'ATTIVO'
          }
        ];
        
        setUsers(mockUsers);
        setPagination({
          ...pagination,
          total: mockUsers.length,
          totalPages: Math.ceil(mockUsers.length / pagination.limit)
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Errore nel caricamento degli utenti');
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Sei sicuro di voler eliminare questo utente?')) {
      return;
    }

    try {
      // In a real application, we would call the service to delete the user
      setUsers(users.filter(user => user.id !== userId));
      toast.success('Utente eliminato con successo');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Errore durante l\'eliminazione dell\'utente');
    }
  };

  const columns = [
    {
      key: 'nome',
      title: 'Nome',
      render: (record: User) => `${record.nome} ${record.cognome}`
    },
    {
      key: 'email',
      title: 'Email'
    },
    {
      key: 'ruolo',
      title: 'Ruolo'
    },
    {
      key: 'stato',
      title: 'Stato',
      render: (record: User) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          record.stato === 'ATTIVO' 
            ? 'bg-green-100 text-green-800' 
            : record.stato === 'INATTIVO'
            ? 'bg-red-100 text-red-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {record.stato}
        </span>
      )
    },
    {
      key: 'azioni',
      title: 'Azioni',
      render: (record: User) => (
        <div className="flex space-x-2">
          <Link to={`/users/detail/${record.id}`}>
            <Button size="sm" variant="outline">Dettagli</Button>
          </Link>
          <Link to={`/users/edit/${record.id}`}>
            <Button size="sm" variant="secondary">Modifica</Button>
          </Link>
          {hasPermission(currentUser, 'DELETE_USER') && (
            <Button 
              size="sm" 
              variant="danger" 
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteUser(record.id);
              }}
            >
              Elimina
            </Button>
          )}
        </div>
      )
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestione Utenti</h1>
        {hasPermission(currentUser, 'CREATE_USER') && (
          <Link to="/users/create">
            <Button>Nuovo Utente</Button>
          </Link>
        )}
      </div>
      
      <Card>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size="lg" text="Caricamento utenti..." />
          </div>
        ) : (
          <Table<User>
            columns={columns}
            data={users}
            loading={false}
            emptyText="Nessun utente trovato"
          />
        )}
      </Card>
      
      {/* Pagination controls would go here in a real implementation */}
    </div>
  );
};

export default UsersList;