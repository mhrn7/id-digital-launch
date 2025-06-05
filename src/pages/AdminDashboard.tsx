import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Download,
  LogOut
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/components/LanguageProvider';
import LanguageSelector from '@/components/LanguageSelector';

interface Client {
  id: string;
  name: string;
  email: string;
  plan: 'Start' | 'Pro';
  monthlyValue: number;
  currency: string;
  startDate: string;
}

interface Report {
  id: string;
  clientName: string;
  title: string;
  date: string;
  file_url: string;
}

const translations = {
  PT: {
    adminPanel: 'Painel Administrativo',
    manageSystem: 'Gerencie o sistema e os dados',
    clients: 'Clientes',
    reports: 'Relatórios',
    settings: 'Configurações',
    addClient: 'Adicionar Cliente',
    editClient: 'Editar Cliente',
    deleteClient: 'Excluir Cliente',
    name: 'Nome',
    email: 'Email',
    plan: 'Plano',
    monthlyValue: 'Valor Mensal',
    currency: 'Moeda',
    startDate: 'Data de Início',
    actions: 'Ações',
    save: 'Salvar',
    cancel: 'Cancelar',
    loading: 'Carregando...',
    logout: 'Sair',
    confirmDelete: 'Confirmar Exclusão',
    confirmDeleteMessage: 'Tem certeza que deseja excluir este cliente?',
    yes: 'Sim',
    no: 'Não',
  },
  EN: {
    adminPanel: 'Admin Panel',
    manageSystem: 'Manage system and data',
    clients: 'Clients',
    reports: 'Reports',
    settings: 'Settings',
    addClient: 'Add Client',
    editClient: 'Edit Client',
    deleteClient: 'Delete Client',
    name: 'Name',
    email: 'Email',
    plan: 'Plan',
    monthlyValue: 'Monthly Value',
    currency: 'Currency',
    startDate: 'Start Date',
    actions: 'Actions',
    save: 'Save',
    cancel: 'Cancel',
    loading: 'Loading...',
    logout: 'Logout',
    confirmDelete: 'Confirm Deletion',
    confirmDeleteMessage: 'Are you sure you want to delete this client?',
    yes: 'Yes',
    no: 'No',
  },
  ES: {
    adminPanel: 'Panel Administrativo',
    manageSystem: 'Gestionar sistema y datos',
    clients: 'Clientes',
    reports: 'Informes',
    settings: 'Configuraciones',
    addClient: 'Agregar Cliente',
    editClient: 'Editar Cliente',
    deleteClient: 'Eliminar Cliente',
    name: 'Nombre',
    email: 'Correo electrónico',
    plan: 'Plan',
    monthlyValue: 'Valor Mensual',
    currency: 'Moneda',
    startDate: 'Fecha de Início',
    actions: 'Acciones',
    save: 'Guardar',
    cancel: 'Cancelar',
    loading: 'Cargando...',
    logout: 'Salir',
    confirmDelete: 'Confirmar Eliminación',
    confirmDeleteMessage: '¿Está seguro de que desea eliminar este cliente?',
    yes: 'Sí',
    no: 'No',
  }
};

const AdminDashboard = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    plan: 'Start' as 'Start' | 'Pro',
    monthlyValue: 0,
    currency: 'BRL',
    startDate: '',
  });

  const { toast } = useToast();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    // Load clients from localStorage or API
    const storedClients = localStorage.getItem('adminClients');
    if (storedClients) {
      setClients(JSON.parse(storedClients));
    }
    setLoading(false);
  }, []);

  const saveClients = (updatedClients: Client[]) => {
    setClients(updatedClients);
    localStorage.setItem('adminClients', JSON.stringify(updatedClients));
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
    toast({
      title: t.logout,
      description: "Você foi desconectado com sucesso.",
    });
  };

  const openAddClientDialog = () => {
    setSelectedClient(null);
    setFormData({
      name: '',
      email: '',
      plan: 'Start',
      monthlyValue: 0,
      currency: 'BRL',
      startDate: '',
    });
    setIsDialogOpen(true);
  };

  const openEditClientDialog = (client: Client) => {
    setSelectedClient(client);
    setFormData({
      name: client.name,
      email: client.email,
      plan: client.plan,
      monthlyValue: client.monthlyValue,
      currency: client.currency,
      startDate: client.startDate,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteClient = (client: Client) => {
    setClientToDelete(client);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteClient = () => {
    if (clientToDelete) {
      const updatedClients = clients.filter(c => c.id !== clientToDelete.id);
      saveClients(updatedClients);
      setIsDeleteDialogOpen(false);
      toast({
        title: t.deleteClient,
        description: `${clientToDelete.name} ${t.deleteClient.toLowerCase()}d.`,
      });
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'monthlyValue' ? Number(value) : value,
    }));
  };

  const handleSaveClient = () => {
    if (!formData.name || !formData.email) {
      toast({
        title: 'Erro',
        description: 'Nome e email são obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    if (selectedClient) {
      // Edit existing client
      const updatedClients = clients.map(c => 
        c.id === selectedClient.id ? { ...c, ...formData } : c
      );
      saveClients(updatedClients);
      toast({
        title: t.editClient,
        description: `${formData.name} atualizado com sucesso.`,
      });
    } else {
      // Add new client
      const newClient: Client = {
        id: Date.now().toString(),
        ...formData,
      };
      saveClients([...clients, newClient]);
      toast({
        title: t.addClient,
        description: `${formData.name} adicionado com sucesso.`,
      });
    }
    setIsDialogOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-idBlack flex items-center justify-center">
        <div className="text-white">{t.loading}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-idBlack text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-idDarkBlack">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-idOrange">{t.adminPanel}</h1>
            <p className="text-gray-400">{t.manageSystem}</p>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <Button variant="outline" onClick={handleLogout} className="border-gray-700">
              <LogOut className="w-4 h-4 mr-2" />
              {t.logout}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="clients" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="clients">{t.clients}</TabsTrigger>
            <TabsTrigger value="reports" disabled>{t.reports}</TabsTrigger>
            <TabsTrigger value="settings" disabled>{t.settings}</TabsTrigger>
          </TabsList>

          <TabsContent value="clients">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{t.clients}</h2>
              <Button onClick={openAddClientDialog}>
                <Plus className="w-4 h-4 mr-2" />
                {t.addClient}
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border border-gray-700 rounded-lg">
                <thead className="bg-idDarkBlack border-b border-gray-700">
                  <tr>
                    <th className="px-4 py-2">{t.name}</th>
                    <th className="px-4 py-2">{t.email}</th>
                    <th className="px-4 py-2">{t.plan}</th>
                    <th className="px-4 py-2">{t.monthlyValue}</th>
                    <th className="px-4 py-2">{t.currency}</th>
                    <th className="px-4 py-2">{t.startDate}</th>
                    <th className="px-4 py-2">{t.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-4 text-gray-400">
                        Nenhum cliente encontrado.
                      </td>
                    </tr>
                  )}
                  {clients.map(client => (
                    <tr key={client.id} className="border-b border-gray-700 hover:bg-idDarkBlack">
                      <td className="px-4 py-2">{client.name}</td>
                      <td className="px-4 py-2">{client.email}</td>
                      <td className="px-4 py-2">{client.plan}</td>
                      <td className="px-4 py-2">{client.monthlyValue}</td>
                      <td className="px-4 py-2">{client.currency}</td>
                      <td className="px-4 py-2">{client.startDate}</td>
                      <td className="px-4 py-2 space-x-2">
                        <Button size="sm" variant="outline" onClick={() => openEditClientDialog(client)} title={t.editClient}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteClient(client)} title={t.deleteClient} className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <p className="text-gray-400">Funcionalidade de relatórios em desenvolvimento.</p>
          </TabsContent>

          <TabsContent value="settings">
            <p className="text-gray-400">Configurações do sistema em desenvolvimento.</p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add/Edit Client Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedClient ? t.editClient : t.addClient}</DialogTitle>
            <DialogDescription>
              {selectedClient ? `Editando cliente ${selectedClient.name}` : 'Preencha os dados do novo cliente.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="name">{t.name}</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                placeholder={t.name} 
              />
            </div>
            <div>
              <Label htmlFor="email">{t.email}</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                placeholder={t.email} 
              />
            </div>
            <div>
              <Label htmlFor="plan">{t.plan}</Label>
              <Select name="plan" value={formData.plan} onValueChange={(value) => setFormData(prev => ({ ...prev, plan: value as 'Start' | 'Pro' }))}>
                <SelectTrigger id="plan" className="w-full">
                  <SelectValue placeholder={t.plan} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Start">Start</SelectItem>
                  <SelectItem value="Pro">Pro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="monthlyValue">{t.monthlyValue}</Label>
              <Input 
                id="monthlyValue" 
                name="monthlyValue" 
                type="number" 
                value={formData.monthlyValue} 
                onChange={handleInputChange} 
                placeholder={t.monthlyValue} 
                min={0}
              />
            </div>
            <div>
              <Label htmlFor="currency">{t.currency}</Label>
              <Select name="currency" value={formData.currency} onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}>
                <SelectTrigger id="currency" className="w-full">
                  <SelectValue placeholder={t.currency} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BRL">BRL</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="startDate">{t.startDate}</Label>
              <Input 
                id="startDate" 
                name="startDate" 
                type="date" 
                value={formData.startDate} 
                onChange={handleInputChange} 
              />
            </div>
          </div>
          <DialogFooter className="mt-6 flex justify-end space-x-4">
            <Button variant="outline" onClick={handleDialogClose}>{t.cancel}</Button>
            <Button onClick={handleSaveClient}>{t.save}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{t.confirmDelete}</DialogTitle>
            <DialogDescription>{t.confirmDeleteMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 flex justify-end space-x-4">
            <Button variant="outline" onClick={handleDeleteDialogClose}>{t.no}</Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={confirmDeleteClient}>{t.yes}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
