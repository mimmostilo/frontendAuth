import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/authService';
import { userService } from '../../services/userService';
import { User } from '../../types';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { toast } from '../../components/ui/Toast';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const Profile = () => {
  const { user: currentUser, setUser } = useAuth();
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setUserState(currentUser);
      setFormData({
        nome: currentUser.nome,
        cognome: currentUser.cognome,
        email: currentUser.email,
      });
      setLoading(false);
    }
  }, [currentUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // In a real application, we would call the service to update the user profile
      // For now, we'll simulate the update
      setTimeout(() => {
        const updatedUser = {
          ...user,
          ...formData
        } as User;
        
        setUser(updatedUser);
        setUserState(updatedUser);
        setEditing(false);
        toast.success('Profilo aggiornato con successo!');
        setSaving(false);
      }, 1000);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Errore durante l\'aggiornamento del profilo');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" text="Caricamento profilo..." />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profilo non trovato</h2>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profilo Utente</h1>
        <p className="text-gray-600 dark:text-gray-400">Gestisci le informazioni del tuo profilo</p>
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

        <Card title="Informazioni Personali" className="lg:col-span-2">
          {editing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Il tuo nome"
                />
                <Input
                  label="Cognome"
                  name="cognome"
                  value={formData.cognome}
                  onChange={handleInputChange}
                  placeholder="Il tuo cognome"
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="indirizzo@email.com"
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setEditing(false);
                    setFormData({
                      nome: user.nome,
                      cognome: user.cognome,
                      email: user.email,
                    });
                  }}
                >
                  Annulla
                </Button>
                <Button type="submit" loading={saving}>
                  Salva Modifiche
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => setEditing(true)}>
                  Modifica Profilo
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Sicurezza">
          <div className="space-y-4">
            <Button variant="outline" className="w-full">Cambia Password</Button>
            <Button variant="outline" className="w-full">Dispositivi Connessi</Button>
            <Button variant="outline" className="w-full">Impostazioni Privacy</Button>
          </div>
        </Card>

        <Card title="Account">
          <div className="space-y-4">
            <Button variant="outline" className="w-full">Esporta Dati</Button>
            <Button variant="outline" className="w-full">Archivia Account</Button>
            <Button variant="danger" className="w-full">Elimina Account</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;