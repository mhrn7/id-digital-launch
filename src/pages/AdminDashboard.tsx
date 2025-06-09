
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash, Mail, LogOut } from 'lucide-react';
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
  currency: string;
  monthlyValue: number;
}

interface Message {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  date: string;
  status: 'Novo' | 'Respondido';
  type?: 'contact' | 'password-recovery';
}

const AdminDashboard = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showClientForm, setShowClientForm] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
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
      addClient: 'Adicionar Cliente',
      editClient: 'Editar',
      deleteClient: 'Excluir',
      viewMessage: 'Ver Mensagem',
      noClients: 'Nenhum cliente cadastrado.',
      noMessages: 'Nenhuma mensagem recebida.',
      clientName: 'Nome',
      clientEmail: 'Email',
      clientPhone: 'Telefone',
      clientPlan: 'Plano',
      clientCurrency: 'Moeda',
      clientValue: 'Valor Mensal',
      actions: 'Ações',
      messageName: 'Nome',
      messageEmail: 'Email',
      messagePhone: 'Telefone',
      messageText: 'Mensagem',
      logout: 'Sair',
      logoutSuccess: 'Logout realizado com sucesso!',
      confirmDeleteClient: 'Tem certeza que deseja excluir este cliente?',
      clientDeleted: 'Cliente excluído com sucesso.',
      clientUpdated: 'Cliente atualizado com sucesso.',
      clientAdded: 'Cliente adicionado com sucesso.',
      clients: 'Clientes',
      messages: 'Mensagens',
      passwordRecovery: 'Recuperação de Senha'
    },
    EN: {
      adminPanel: 'Admin Panel',
      welcome: 'Welcome, Administrator!',
      addClient: 'Add Client',
      editClient: 'Edit',
      deleteClient: 'Delete',
      viewMessage: 'View Message',
      noClients: 'No clients registered.',
      noMessages: 'No messages received.',
      clientName: 'Name',
      clientEmail: 'Email',
      clientPhone: 'Phone',
      clientPlan: 'Plan',
      clientCurrency: 'Currency',
      clientValue: 'Monthly Value',
      actions: 'Actions',
      messageName: 'Name',
      messageEmail: 'Email',
      messagePhone: 'Phone',
      messageText: 'Message',
      logout: 'Logout',
      logoutSuccess: 'Logout successful!',
      confirmDeleteClient: 'Are you sure you want to delete this client?',
      clientDeleted: 'Client deleted successfully.',
      clientUpdated: 'Client updated successfully.',
      clientAdded: 'Client added successfully.',
      clients: 'Clients',
      messages: 'Messages',
      passwordRecovery: 'Password Recovery'
    },
    ES: {
      adminPanel: 'Panel Administrativo',
      welcome: '¡Bienvenido, Administrador!',
      addClient: 'Añadir Cliente',
      editClient: 'Editar',
      deleteClient: 'Eliminar',
      viewMessage: 'Ver Mensaje',
      noClients: 'Ningún cliente registrado.',
      noMessages: 'Ningún mensaje recibido.',
      clientName: 'Nombre',
      clientEmail: 'Email',
      clientPhone: 'Teléfono',
      clientPlan: 'Plan',
      clientCurrency: 'Moneda',
      clientValue: 'Valor Mensual',
      actions: 'Acciones',
      messageName: 'Nombre',
      messageEmail: 'Email',
      messagePhone: 'Teléfono',
      messageText: 'Mensaje',
      logout: 'Cerrar sesión',
      logoutSuccess: '¡Cierre de sesión exitoso!',
      confirmDeleteClient: '¿Está seguro de que desea eliminar este cliente?',
      clientDeleted: 'Cliente eliminado con éxito.',
      clientUpdated: 'Cliente actualizado con éxito.',
      clientAdded: 'Cliente añadido con éxito.',
      clients: 'Clientes',
      messages: 'Mensajes',
      passwordRecovery: 'Recuperación de Contraseña'
    }
  };

  const t = translations[language];

  useEffect(() => {
    // Carregar dados do localStorage
    const savedClients = localStorage.getItem('adminClients');
    const savedMessages = localStorage.getItem('contactMessages');
    const savedFormMessages = localStorage.getItem('formMessages');
    
    if (savedClients) {
      setClients(JSON.parse(savedClients));
    }
    
    // Combinar mensagens de contato e formulário
    let allMessages: Message[] = [];
    
    if (savedMessages) {
      allMessages = [...allMessages, ...JSON.parse(savedMessages)];
    }
    
    if (savedFormMessages) {
      allMessages = [...allMessages, ...JSON.parse(savedFormMessages)];
    }
    
    setMessages(allMessages);
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
    if (window.confirm(t.confirmDeleteClient)) {
      const updatedClients = clients.filter(c => c.id !== client.id);
      setClients(updatedClients);
      localStorage.setItem('adminClients', JSON.stringify(updatedClients));
      toast({
        title: t.clientDeleted,
      });
    }
  };

  const handleClientFormSubmit = (client: Client, isEdit: boolean) => {
    let updatedClients;
    if (isEdit) {
      updatedClients = clients.map(c => c.id === client.id ? client : c);
      toast({
        title: t.clientUpdated,
      });
    } else {
      updatedClients = [...clients, client];
      toast({
        title: t.clientAdded,
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
      title: t.logoutSuccess,
      description: "Você foi desconectado do sistema.",
    });
    navigate('/'); // Voltar direto para o home
  };

  const formatCurrency = (value: number, currency: string) => {
    switch (currency) {
      case 'BRL':
        return `R$ ${value.toLocaleString('pt-BR')}`;
      case 'USD':
        return `$ ${value.toLocaleString('en-US')}`;
      case 'EUR':
        return `€ ${value.toLocaleString('de-DE')}`;
      case 'GBP':
        return `£ ${value.toLocaleString('en-GB')}`;
      default:
        return `${currency} ${value.toLocaleString()}`;
    }
  };

  return (
    <div className="min-h-screen bg-idBlack text-white">
      {/* Header com botão de logout */}
      <div className="border-b border-gray-800 bg-idDarkBlack">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-idOrange">{t.adminPanel}</h1>
            <p className="text-gray-400">{t.welcome}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="border-gray-700">
            <LogOut className="w-4 h-4 mr-2" />
            {t.logout}
          </Button>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <Tabs defaultValue="clients" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="clients">{t.clients}</TabsTrigger>
            <TabsTrigger value="messages">{t.messages}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="clients" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Gerenciar Clientes</h2>
              <Button onClick={handleAddClient} className="bg-idOrange hover:bg-idOrange/90 text-black">
                <Plus className="w-4 h-4 mr-2" />
                {t.addClient}
              </Button>
            </div>
            
            <Card className="bg-idDarkBlack border-gray-800">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left p-4 text-white">{t.clientName}</th>
                        <th className="text-left p-4 text-white">{t.clientEmail}</th>
                        <th className="text-left p-4 text-white">{t.clientPhone}</th>
                        <th className="text-left p-4 text-white">{t.clientPlan}</th>
                        <th className="text-left p-4 text-white">{t.clientValue}</th>
                        <th className="text-left p-4 text-white">{t.actions}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.length > 0 ? (
                        clients.map((client) => (
                          <tr key={client.id} className="border-b border-gray-800">
                            <td className="p-4 text-gray-300">{client.name}</td>
                            <td className="p-4 text-gray-300">{client.email}</td>
                            <td className="p-4 text-gray-300">{client.phone}</td>
                            <td className="p-4 text-gray-300">{client.plan}</td>
                            <td className="p-4 text-gray-300">
                              {formatCurrency(client.monthlyValue, client.currency)}
                            </td>
                            <td className="p-4">
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEditClient(client)}
                                  className="border-gray-700"
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDeleteClient(client)}
                                  className="border-red-700 text-red-400 hover:bg-red-900"
                                >
                                  <Trash className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-gray-400">
                            {t.noClients}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            <h2 className="text-xl font-semibold">Gerenciar Mensagens</h2>
            
            <Card className="bg-idDarkBlack border-gray-800">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left p-4 text-white">{t.messageName}</th>
                        <th className="text-left p-4 text-white">{t.messageEmail}</th>
                        <th className="text-left p-4 text-white">Tipo</th>
                        <th className="text-left p-4 text-white">Data</th>
                        <th className="text-left p-4 text-white">{t.actions}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {messages.length > 0 ? (
                        messages.map((message) => (
                          <tr key={message.id} className="border-b border-gray-800">
                            <td className="p-4 text-gray-300">{message.name}</td>
                            <td className="p-4 text-gray-300">{message.email}</td>
                            <td className="p-4 text-gray-300">
                              {message.type === 'password-recovery' ? t.passwordRecovery : 'Contato'}
                            </td>
                            <td className="p-4 text-gray-300">{message.date}</td>
                            <td className="p-4">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleViewMessage(message)}
                                className="border-gray-700"
                              >
                                <Mail className="w-4 h-4 mr-2" />
                                {t.viewMessage}
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-gray-400">
                            {t.noMessages}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modais */}
      <ClientForm
        open={showClientForm}
        onOpenChange={setShowClientForm}
        onSubmit={handleClientFormSubmit}
        editingClient={editingClient}
      />

      <MessageModal
        open={showMessageModal}
        onOpenChange={setShowMessageModal}
        message={selectedMessage}
        onClose={handleCloseMessageModal}
      />
    </div>
  );
};

export default AdminDashboard;
