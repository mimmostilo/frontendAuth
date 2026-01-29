import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { hasPermission } from '../../utils/authUtils';
import { auditService } from '../../services/auditService';
import { AuditLog } from '../../types';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import { toast } from '../../components/ui/Toast';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const AuditLogs = () => {
  const { user: currentUser } = useAuth();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    utenteEmail: '',
    azione: '',
    esito: '',
  });

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const fetchAuditLogs = async () => {
    try {
      setLoading(true);
      // In a real application, we would call the service to fetch audit logs
      // For now, we'll simulate the data
      setTimeout(() => {
        const mockLogs: AuditLog[] = [
          {
            id: '1',
            utenteEmail: 'admin@example.com',
            azione: 'LOGIN',
            timestamp: '2023-05-20T10:30:00Z',
            ip: '192.168.1.100',
            userAgent: 'Mozilla/5.0...',
            esito: 'SUCCESSO',
            dettagli: 'Login effettuato con successo'
          },
          {
            id: '2',
            utenteEmail: 'user@example.com',
            azione: 'CREATE_USER',
            timestamp: '2023-05-20T11:15:00Z',
            ip: '192.168.1.101',
            userAgent: 'Mozilla/5.0...',
            esito: 'SUCCESSO',
            dettagli: 'Creato utente mario.rossi@example.com'
          },
          {
            id: '3',
            utenteEmail: 'unknown@example.com',
            azione: 'LOGIN',
            timestamp: '2023-05-20T12:00:00Z',
            ip: '192.168.1.102',
            userAgent: 'Mozilla/5.0...',
            esito: 'FALLITA',
            dettagli: 'Credenziali non valide'
          },
          {
            id: '4',
            utenteEmail: 'moderator@example.com',
            azione: 'UPDATE_USER',
            timestamp: '2023-05-20T14:30:00Z',
            ip: '192.168.1.103',
            userAgent: 'Mozilla/5.0...',
            esito: 'SUCCESSO',
            dettagli: 'Aggiornato stato utente'
          },
          {
            id: '5',
            utenteEmail: 'admin@example.com',
            azione: 'DELETE_USER',
            timestamp: '2023-05-20T16:45:00Z',
            ip: '192.168.1.100',
            userAgent: 'Mozilla/5.0...',
            esito: 'SUCCESSO',
            dettagli: 'Eliminato utente'
          }
        ];
        
        setLogs(mockLogs);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      toast.error('Errore nel caricamento dei log di audit');
      setLoading(false);
    }
  };

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const applyFilters = () => {
    // In a real application, we would call the service with filters
    toast.info('Filtri applicati (simulazione)');
  };

  const clearFilters = () => {
    setFilters({
      utenteEmail: '',
      azione: '',
      esito: '',
    });
    // In a real application, we would fetch all logs again
    toast.info('Filtri rimossi (simulazione)');
  };

  // Check if user has permission to view audit logs
  if (!hasPermission(currentUser, 'VIEW_AUDIT_LOGS')) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Accesso negato</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Non hai i permessi per visualizzare i log di audit.</p>
      </div>
    );
  }

  const columns = [
    {
      key: 'timestamp',
      title: 'Data/Ora',
      render: (record: AuditLog) => new Date(record.timestamp).toLocaleString('it-IT')
    },
    {
      key: 'utenteEmail',
      title: 'Utente'
    },
    {
      key: 'azione',
      title: 'Azione'
    },
    {
      key: 'ip',
      title: 'IP'
    },
    {
      key: 'esito',
      title: 'Esito',
      render: (record: AuditLog) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          record.esito === 'SUCCESSO' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {record.esito}
        </span>
      )
    },
    {
      key: 'dettagli',
      title: 'Dettagli'
    }
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Log di Audit</h1>
        <p className="text-gray-600 dark:text-gray-400">Registro delle attività di sistema e utenti</p>
      </div>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label htmlFor="utenteEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Utente
            </label>
            <input
              type="text"
              id="utenteEmail"
              className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              value={filters.utenteEmail}
              onChange={(e) => handleFilterChange('utenteEmail', e.target.value)}
              placeholder="Filtra per email"
            />
          </div>
          
          <div>
            <label htmlFor="azione" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Azione
            </label>
            <select
              id="azione"
              className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              value={filters.azione}
              onChange={(e) => handleFilterChange('azione', e.target.value)}
            >
              <option value="">Tutte le azioni</option>
              <option value="LOGIN">Login</option>
              <option value="LOGOUT">Logout</option>
              <option value="CREATE_USER">Creazione Utente</option>
              <option value="UPDATE_USER">Modifica Utente</option>
              <option value="DELETE_USER">Eliminazione Utente</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="esito" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Esito
            </label>
            <select
              id="esito"
              className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              value={filters.esito}
              onChange={(e) => handleFilterChange('esito', e.target.value)}
            >
              <option value="">Tutti</option>
              <option value="SUCCESSO">Successo</option>
              <option value="FALLITA">Fallita</option>
            </select>
          </div>
          
          <div className="flex items-end space-x-2">
            <Button variant="outline" className="w-full" onClick={applyFilters}>
              Applica Filtri
            </Button>
            <Button variant="ghost" className="w-full" onClick={clearFilters}>
              Azzera
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size="lg" text="Caricamento log di audit..." />
          </div>
        ) : (
          <Table<AuditLog>
            columns={columns}
            data={logs}
            loading={false}
            emptyText="Nessun log di audit trovato"
          />
        )}
      </Card>
    </div>
  );
};

export default AuditLogs;