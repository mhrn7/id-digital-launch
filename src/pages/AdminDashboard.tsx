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
  LogOut,
  Upload,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/components/LanguageProvider';
import LanguageSelector from '@/components/LanguageSelector';

interface Client {
  id: string;
  name: string;
  email: string;
  password: string;
  plan: 'Start' | 'Pro';
  monthlyValue: number;
  currency: string;
  startDate: string;
}

interface Report {
  id: string;
  clientName: string;
  clientId: string;
  title: string;
  date: string;
  file_url: string;
}

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  read: boolean;
}

// Professional plan details with translations
const planDetails = {
  PT: {
    Start: [
      'Landing Page Profissional',
      'Gestão de Tráfego Google Ads + Google My Business',
      'Relatórios de Performance Quinzenais',
      'Suporte Especializado via WhatsApp (Segunda a Sábado - Horário Comercial)'
    ],
    Pro: [
      'Landing Page Profissional',
      'Gestão de Tráfego Google Ads + Google My Business',
      'Gestão de Tráfego Meta Ads + Plataformas Complementares',
      'Planejamento Estratégico de Marketing Digital',
      'Relatórios de Performance Semanais',
      'Suporte Premium 24/7'
    ]
  },
  EN: {
    Start: [
      'Professional Landing Page',
      'Google Ads + Google My Business Traffic Management',
      'Bi-weekly Performance Reports',
      'Specialized WhatsApp Support (Monday to Saturday - Business Hours)'
    ],
    Pro: [
      'Professional Landing Page',
      'Google Ads + Google My Business Traffic Management',
      'Meta Ads + Complementary Platforms Traffic Management',
      'Digital Marketing Strategic Planning',
      'Weekly Performance Reports',
      'Premium 24/7 Support'
    ]
  },
  ES: {
    Start: [
      'Landing Page Profesional',
      'Gestión de Tráfico Google Ads + Google My Business',
      'Informes de Rendimiento Quincenales',
      'Soporte Especializado vía WhatsApp (Lunes a Sábado - Horario Comercial)'
    ],
    Pro: [
      'Landing Page Profesional',
      'Gestión de Tráfico Google Ads + Google My Business',
      'Gestión de Tráfico Meta Ads + Plataformas Complementarias',
      'Planificación Estratégica de Marketing Digital',
      'Informes de Rendimiento Semanales',
      'Soporte Premium 24/7'
    ]
  }
};

const translations = {
  PT: {
    adminPanel: 'Painel Administrativo',
    manageSystem: 'Gerencie o sistema e os dados',
    clients: 'Clientes',
    reports: 'Relatórios',
    settings: 'Configurações',
    messages: 'Mensagens',
    addClient: 'Adicionar Cliente',
    editClient: 'Editar Cliente',
    deleteClient: 'Excluir Cliente',
    name: 'Nome',
    email: 'Email',
    password: 'Senha',
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
    planDetails: 'Detalhes do Plano',
    includedServices: 'Serviços Inclusos',
    uploadReport: 'Enviar Relatório',
    selectClient: 'Selecionar Cliente',
    reportTitle: 'Título do Relatório',
    selectFile: 'Selecionar Arquivo',
    upload: 'Enviar',
    download: 'Baixar',
    clientReports: 'Relatórios dos Clientes',
    contactMessages: 'Mensagens de Contato',
    from: 'De',
    phone: 'Telefone',
    date: 'Data',
    markAsRead: 'Marcar como Lida',
    systemSettings: 'Configurações do Sistema',
    noMessages: 'Nenhuma mensagem encontrada.',
    noReports: 'Nenhum relatório encontrado.',
    messageFrom: 'Mensagem de',
    reportUploaded: 'Relatório enviado com sucesso!',
    messageMarkedRead: 'Mensagem marcada como lida.',
  },
  EN: {
    adminPanel: 'Admin Panel',
    manageSystem: 'Manage system and data',
    clients: 'Clients',
    reports: 'Reports',
    settings: 'Settings',
    messages: 'Messages',
    addClient: 'Add Client',
    editClient: 'Edit Client',
    deleteClient: 'Delete Client',
    name: 'Name',
    email: 'Email',
    password: 'Password',
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
    planDetails: 'Plan Details',
    includedServices: 'Included Services',
    uploadReport: 'Upload Report',
    selectClient: 'Select Client',
    reportTitle: 'Report Title',
    selectFile: 'Select File',
    upload: 'Upload',
    download: 'Download',
    clientReports: 'Client Reports',
    contactMessages: 'Contact Messages',
    from: 'From',
    phone: 'Phone',
    date: 'Date',
    markAsRead: 'Mark as Read',
    systemSettings: 'System Settings',
    noMessages: 'No messages found.',
    noReports: 'No reports found.',
    messageFrom: 'Message from',
    reportUploaded: 'Report uploaded successfully!',
    messageMarkedRead: 'Message marked as read.',
  },
  ES: {
    adminPanel: 'Panel Administrativo',
    manageSystem: 'Gestionar sistema y datos',
    clients: 'Clientes',
    reports: 'Informes',
    settings: 'Configuraciones',
    messages: 'Mensajes',
    addClient: 'Agregar Cliente',
    editClient: 'Editar Cliente',
    deleteClient: 'Eliminar Cliente',
    name: 'Nombre',
    email: 'Correo electrónico',
    password: 'Contraseña',
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
    planDetails: 'Detalles del Plan',
    includedServices: 'Servicios Incluidos',
    uploadReport: 'Subir Informe',
    selectClient: 'Seleccionar Cliente',
    reportTitle: 'Título del Informe',
    selectFile: 'Seleccionar Archivo',
    upload: 'Subir',
    download: 'Descargar',
    clientReports: 'Informes de Clientes',
    contactMessages: 'Mensajes de Contacto',
    from: 'De',
    phone: 'Teléfono',
    date: 'Fecha',
    markAsRead: 'Marcar como Leído',
    systemSettings: 'Configuraciones del Sistema',
    noMessages: 'No se encontraron mensajes.',
    noReports: 'No se encontraron informes.',
    messageFrom: 'Mensaje de',
    reportUploaded: '¡Informe subido exitosamente!',
    messageMarkedRead: 'Mensaje marcado como leído.',
  }
};

const AdminDashboard = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    plan: 'Start' as 'Start' | 'Pro',
    monthlyValue: 0,
    currency: 'BRL',
    startDate: '',
  });
  const [reportFormData, setReportFormData] = useState({
    clientId: '',
    title: '',
    file: null as File | null,
  });

  const { toast } = useToast();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    // Load data from localStorage
    const storedClients = localStorage.getItem('adminClients');
    const storedReports = localStorage.getItem('adminReports');
    const storedMessages = localStorage.getItem('formMessages');
    
    if (storedClients) {
      setClients(JSON.parse(storedClients));
    }
    if (storedReports) {
      setReports(JSON.parse(storedReports));
    }
    if (storedMessages) {
      const formMessages = JSON.parse(storedMessages);
      const convertedMessages = formMessages.map((msg: any) => ({
        ...msg,
        read: msg.read || false,
        date: msg.timestamp || msg.date || new Date().toISOString()
      }));
      setMessages(convertedMessages);
    }
    setLoading(false);
  }, []);

  const saveClients = (updatedClients: Client[]) => {
    setClients(updatedClients);
    localStorage.setItem('adminClients', JSON.stringify(updatedClients));
  };

  const saveReports = (updatedReports: Report[]) => {
    setReports(updatedReports);
    localStorage.setItem('adminReports', JSON.stringify(updatedReports));
  };

  const saveMessages = (updatedMessages: Message[]) => {
    setMessages(updatedMessages);
    localStorage.setItem('formMessages', JSON.stringify(updatedMessages));
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
      password: '',
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
      password: client.password || '',
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'monthlyValue' ? Number(value) : value,
    }));
  };

  const handleSaveClient = () => {
    if (!formData.name || !formData.email || !formData.password) {
      toast({
        title: 'Erro',
        description: 'Nome, email e senha são obrigatórios.',
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

  const handleReportUpload = () => {
    if (!reportFormData.clientId || !reportFormData.title || !reportFormData.file) {
      toast({
        title: 'Erro',
        description: 'Todos os campos são obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    const client = clients.find(c => c.id === reportFormData.clientId);
    if (!client) return;

    const newReport: Report = {
      id: Date.now().toString(),
      clientId: reportFormData.clientId,
      clientName: client.name,
      title: reportFormData.title,
      date: new Date().toISOString(),
      file_url: `reports/${reportFormData.file.name}`, // Mock URL
    };

    saveReports([...reports, newReport]);
    setIsReportDialogOpen(false);
    setReportFormData({ clientId: '', title: '', file: null });
    
    toast({
      title: t.reportUploaded,
      description: `Relatório para ${client.name} enviado.`,
    });
  };

  const markMessageAsRead = (messageId: string) => {
    const updatedMessages = messages.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    );
    saveMessages(updatedMessages);
    toast({
      title: t.messageMarkedRead,
    });
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
            <TabsTrigger value="reports">{t.reports}</TabsTrigger>
            <TabsTrigger value="messages">{t.messages}</TabsTrigger>
            <TabsTrigger value="settings">{t.settings}</TabsTrigger>
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
                      <td className="px-4 py-2">
                        <div>
                          <div className="font-medium">{client.plan}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            <div className="text-sm font-medium mb-2">{t.includedServices}:</div>
                            <ul className="space-y-1">
                              {planDetails[language][client.plan]?.map((service, index) => (
                                <li key={index} className="flex items-start text-gray-300">
                                  <div className="w-1 h-1 bg-idOrange rounded-full mr-2 mt-2 flex-shrink-0"></div>
                                  <span className="text-xs leading-relaxed">{service}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </td>
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{t.clientReports}</h2>
              <Button onClick={() => setIsReportDialogOpen(true)}>
                <Upload className="w-4 h-4 mr-2" />
                {t.uploadReport}
              </Button>
            </div>
            <div className="space-y-4">
              {reports.length === 0 ? (
                <p className="text-gray-400 text-center py-8">{t.noReports}</p>
              ) : (
                reports.map(report => (
                  <Card key={report.id} className="bg-idDarkBlack border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-white">{report.title}</h4>
                          <p className="text-gray-400 text-sm">Cliente: {report.clientName}</p>
                          <p className="text-gray-400 text-sm">{t.date}: {new Date(report.date).toLocaleDateString()}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          {t.download || 'Download'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="messages">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">{t.contactMessages}</h2>
            </div>
            <div className="space-y-4">
              {messages.length === 0 ? (
                <p className="text-gray-400 text-center py-8">{t.noMessages}</p>
              ) : (
                messages.map(message => (
                  <Card key={message.id} className={`bg-idDarkBlack border-gray-700 ${!message.read ? 'border-idOrange' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium text-white">{t.messageFrom} {message.name}</h4>
                            {!message.read && <Badge className="bg-idOrange text-black">Nova</Badge>}
                          </div>
                          <p className="text-gray-400 text-sm mb-1">{t.email}: {message.email}</p>
                          {message.phone && <p className="text-gray-400 text-sm mb-2">{t.phone}: {message.phone}</p>}
                          <p className="text-gray-300 mb-2">{message.message}</p>
                          <p className="text-gray-500 text-xs">{new Date(message.date).toLocaleString()}</p>
                        </div>
                        {!message.read && (
                          <Button variant="outline" size="sm" onClick={() => markMessageAsRead(message.id)}>
                            <Eye className="w-4 h-4 mr-2" />
                            {t.markAsRead}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-idDarkBlack border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">{t.systemSettings}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="language">{language === 'PT' ? 'Idioma do Sistema' : language === 'EN' ? 'System Language' : 'Idioma del Sistema'}</Label>
                    <LanguageSelector />
                  </div>
                  <p className="text-gray-400 text-sm">
                    {language === 'PT' ? 'Mais configurações serão adicionadas em futuras atualizações.' : 
                     language === 'EN' ? 'More settings will be added in future updates.' : 
                     'Más configuraciones se agregarán en futuras actualizaciones.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Client Dialog */}
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
              <Label htmlFor="password">{t.password}</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                value={formData.password} 
                onChange={handleInputChange} 
                placeholder={t.password} 
              />
            </div>
            <div>
              <Label htmlFor="plan">{t.plan}</Label>
              <Select name="plan" value={formData.plan} onValueChange={(value) => setFormData(prev => ({ ...prev, plan: value as 'Start' | 'Pro' }))}>
                <SelectTrigger id="plan" className="w-full">
                  <SelectValue placeholder={t.plan} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Start">
                    <div>
                      <div className="font-medium">Start</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {planDetails[language].Start?.map((service, index) => (
                          <div key={index} className="flex items-start">
                            <span className="text-xs leading-relaxed">• {service}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="Pro">
                    <div>
                      <div className="font-medium">Pro</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {planDetails[language].Pro?.map((service, index) => (
                          <div key={index} className="flex items-start">
                            <span className="text-xs leading-relaxed">• {service}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </SelectItem>
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
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>{t.cancel}</Button>
            <Button onClick={handleSaveClient}>{t.save}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report Upload Dialog */}
      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{t.uploadReport}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="reportClient">{t.selectClient}</Label>
              <Select value={reportFormData.clientId} onValueChange={(value) => setReportFormData(prev => ({ ...prev, clientId: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectClient} />
                </SelectTrigger>
                <SelectContent>
                  {clients.map(client => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="reportTitle">{t.reportTitle}</Label>
              <Input 
                id="reportTitle" 
                value={reportFormData.title} 
                onChange={(e) => setReportFormData(prev => ({ ...prev, title: e.target.value }))} 
                placeholder={t.reportTitle}
              />
            </div>
            <div>
              <Label htmlFor="reportFile">{t.selectFile}</Label>
              <Input 
                id="reportFile" 
                type="file" 
                onChange={(e) => setReportFormData(prev => ({ ...prev, file: e.target.files?.[0] || null }))}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
              />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>{t.cancel}</Button>
            <Button onClick={handleReportUpload}>{t.upload}</Button>
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
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>{t.no}</Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={confirmDeleteClient}>{t.yes}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
