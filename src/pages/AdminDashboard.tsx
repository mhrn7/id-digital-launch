import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/components/LanguageProvider';
import ClientForm from '@/components/ClientForm';
import MessageModal from '@/components/MessageModal';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  plan: string;
}

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

const AdminDashboard = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showClientForm, setShowClientForm] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [activeTab, setActiveTab] = useState('clients');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();

  // Verificar autenticação no carregamento
  useEffect(() => {
    const checkAuth = () => {
      const adminUser = localStorage.getItem('adminUser');
      const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
      
      console.log('Verificando autenticação admin:', { adminUser, isAdminLoggedIn });
      
      if (!adminUser || !isAdminLoggedIn || isAdminLoggedIn !== 'true') {
        console.log('Admin não autenticado, redirecionando para login');
        navigate('/admin/login');
        return;
      }
      
      console.log('Admin autenticado com sucesso');
    };

    checkAuth();
  }, [navigate]);

  const translations = {
    PT: {
      adminPanel: 'Painel Administrativo',
      welcome: 'Bem-vindo, Administrador!',
      manageClients: 'Gerenciar Clientes',
      manageMessages: 'Gerenciar Mensagens',
      addClient: 'Adicionar Cliente',
      editClient: 'Editar',
      deleteClient: 'Excluir',
      viewMessage: 'Ver Mensagem',
      noClients: 'Nenhum cliente cadastrado.',
      noMessages: 'Nenhuma mensagem recebida.',
      clientName: 'Nome',
      clientEmail: 'Email',
      clientPhone: 'Telefone',
      actions: 'Ações',
      messageName: 'Nome',
      messageEmail: 'Email',
      messagePhone: 'Telefone',
      messageText: 'Mensagem',
      logout: 'Sair',
      logoutSuccess: 'Logout realizado com sucesso!',
      confirmDeleteClient: 'Tem certeza que deseja excluir este cliente?',
      deleteConfirmation: 'Excluir Cliente',
      cancel: 'Cancelar',
      delete: 'Excluir',
      clientDeleted: 'Cliente excluído com sucesso.',
      clientUpdated: 'Cliente atualizado com sucesso.',
      clientAdded: 'Cliente adicionado com sucesso.',
      close: 'Fechar',
      clients: 'Clientes',
      messages: 'Mensagens'
    },
    EN: {
      adminPanel: 'Admin Panel',
      welcome: 'Welcome, Administrator!',
      manageClients: 'Manage Clients',
      manageMessages: 'Manage Messages',
      addClient: 'Add Client',
      editClient: 'Edit',
      deleteClient: 'Delete',
      viewMessage: 'View Message',
      noClients: 'No clients registered.',
      noMessages: 'No messages received.',
      clientName: 'Name',
      clientEmail: 'Email',
      clientPhone: 'Phone',
      actions: 'Actions',
      messageName: 'Name',
      messageEmail: 'Email',
      messagePhone: 'Phone',
      messageText: 'Message',
      logout: 'Logout',
      logoutSuccess: 'Logout successful!',
      confirmDeleteClient: 'Are you sure you want to delete this client?',
      deleteConfirmation: 'Delete Client',
      cancel: 'Cancel',
      delete: 'Delete',
      clientDeleted: 'Client deleted successfully.',
      clientUpdated: 'Client updated successfully.',
      clientAdded: 'Client added successfully.',
      close: 'Close',
      clients: 'Clients',
      messages: 'Messages'
    },
    ES: {
      adminPanel: 'Panel Administrativo',
      welcome: '¡Bienvenido, Administrador!',
      manageClients: 'Gestionar Clientes',
      manageMessages: 'Gestionar Mensajes',
      addClient: 'Añadir Cliente',
      editClient: 'Editar',
      deleteClient: 'Eliminar',
      viewMessage: 'Ver Mensaje',
      noClients: 'Ningún cliente registrado.',
      noMessages: 'Ningún mensaje recibido.',
      clientName: 'Nombre',
      clientEmail: 'Email',
      clientPhone: 'Teléfono',
      actions: 'Acciones',
      messageName: 'Nombre',
      messageEmail: 'Email',
      messagePhone: 'Teléfono',
      messageText: 'Mensaje',
      logout: 'Cerrar sesión',
      logoutSuccess: '¡Cierre de sesión exitoso!',
      confirmDeleteClient: '¿Está seguro de que desea eliminar este cliente?',
      deleteConfirmation: 'Eliminar Cliente',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      clientDeleted: 'Cliente eliminado con éxito.',
      clientUpdated: 'Cliente actualizado con éxito.',
      clientAdded: 'Cliente añadido con éxito.',
      close: 'Cerrar',
      clients: 'Clientes',
      messages: 'Mensajes'
    }
  };

  const t = translations[language];

  useEffect(() => {
    // Mock data loading from localStorage
    const savedClients = localStorage.getItem('adminClients');
    const savedMessages = localStorage.getItem('contactMessages');

    if (savedClients) {
      setClients(JSON.parse(savedClients));
    }

    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  const handleAddClient = () => {
    setEditingClient(null);
    setShowClientForm(true);
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setShowClientForm(true);
  };

  const handleDeleteClient = (client: Client) => {
    if (window.confirm(t.confirmDeleteClient || "Tem certeza que deseja excluir este cliente?")) {
      const updatedClients = clients.filter((c) => c.id !== client.id);
      setClients(updatedClients);
      localStorage.setItem('adminClients', JSON.stringify(updatedClients));
      toast({
        title: t.clientDeleted || "Cliente excluído com sucesso.",
      });
    }
  };

  const handleClientFormSubmit = (client: Client, isEdit: boolean) => {
    let updatedClients;
    if (isEdit) {
      updatedClients = clients.map((c) => (c.id === client.id ? client : c));
      toast({
        title: t.clientUpdated || "Cliente atualizado com sucesso.",
      });
    } else {
      updatedClients = [...clients, client];
      toast({
        title: t.clientAdded || "Cliente adicionado com sucesso.",
      });
    }
  
    setClients(updatedClients);
    localStorage.setItem('adminClients', JSON.stringify(updatedClients));
    setShowClientForm(false);
  };

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    setShowMessageModal(true);
  };

  const handleCloseMessageModal = () => {
    setShowMessageModal(false);
    setSelectedMessage(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    localStorage.removeItem('isAdminLoggedIn');
    toast({
      title: t.logoutSuccess || "Logout realizado com sucesso!",
      description: "Você foi desconectado do sistema.",
    });
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-idBlack text-white">
      <div className="container mx-auto p-4">
        <Card className="bg-idDarkBlack border-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{t.adminPanel}</CardTitle>
            <CardDescription className="text-gray-400">{t.welcome}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="clients" className="w-full">
              <TabsList>
                <TabsTrigger value="clients" onClick={() => setActiveTab('clients')}>{t.clients}</TabsTrigger>
                <TabsTrigger value="messages" onClick={() => setActiveTab('messages')}>{t.messages}</TabsTrigger>
              </TabsList>
              <TabsContent value="clients">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">{t.manageClients}</h2>
                  <Button onClick={handleAddClient} className="bg-idOrange hover:bg-idOrange/90 text-black">
                    <Plus className="mr-2 h-4 w-4" />
                    {t.addClient}
                  </Button>
                </div>
                {clients.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.clientName}</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.clientEmail}</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.clientPhone}</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{t.actions}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {clients.map((client) => (
                          <tr key={client.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{client.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{client.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{client.phone}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <Button onClick={() => handleEditClient(client)} size="icon" variant="ghost" className="text-gray-400 hover:text-white">
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">{t.editClient}</span>
                              </Button>
                              <Button onClick={() => handleDeleteClient(client)} size="icon" variant="ghost" className="text-gray-400 hover:text-white">
                                <Trash className="h-4 w-4" />
                                <span className="sr-only">{t.deleteClient}</span>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500">{t.noClients}</p>
                )}
              </TabsContent>
              <TabsContent value="messages">
                <h2 className="text-xl font-semibold mb-4">{t.manageMessages}</h2>
                {messages.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.messageName}</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.messageEmail}</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.messagePhone}</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{t.actions}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {messages.map((message) => (
                          <tr key={message.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{message.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{message.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{message.phone}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <Button onClick={() => handleViewMessage(message)} size="icon" variant="ghost" className="text-gray-400 hover:text-white">
                                <Mail className="h-4 w-4" />
                                <span className="sr-only">{t.viewMessage}</span>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500">{t.noMessages}</p>
                )}
              </TabsContent>
            </Tabs>
            <Button onClick={handleLogout} variant="secondary" className="mt-4 bg-gray-800 hover:bg-gray-700">{t.logout}</Button>
          </CardContent>
        </Card>
      </div>

      {/* Client Form Modal */}
      {showClientForm && (
        <ClientForm
          open={showClientForm}
          onOpenChange={setShowClientForm}
          onSubmit={handleClientFormSubmit}
          editingClient={editingClient}
        />
      )}

      {/* Message Modal */}
      {showMessageModal && selectedMessage && (
        <MessageModal
          open={showMessageModal}
          onOpenChange={setShowMessageModal}
          message={selectedMessage}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
