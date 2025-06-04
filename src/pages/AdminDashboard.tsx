import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileText, Plus, Users, MessageSquare, Eye, Trash2, UserPlus, Key, Upload } from 'lucide-react';
import { useFormMessages } from '@/hooks/useFormMessages';
import { useToast } from '@/hooks/use-toast';

// Mock data for demonstration
const mockClients = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao@empresa.com',
    plan: 'Start',
    status: 'Ativo',
    startDate: '2024-01-15',
    password: 'temp123'
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@loja.com',
    plan: 'Premium',
    status: 'Ativo',
    startDate: '2024-02-01',
    password: 'temp456'
  }
];

const mockReports = [
  {
    id: 1,
    clientName: 'João Silva',
    month: 'Janeiro 2024',
    status: 'Enviado',
    date: '2024-01-31'
  },
  {
    id: 2,
    clientName: 'Maria Santos',
    month: 'Janeiro 2024',
    status: 'Pendente',
    date: '2024-01-31'
  }
];

const mockContracts = [
  {
    id: 1,
    clientName: 'João Silva',
    fileName: 'contrato_joao_silva.pdf',
    uploadDate: '2024-01-15',
    status: 'Ativo'
  },
  {
    id: 2,
    clientName: 'Maria Santos',
    fileName: 'contrato_maria_santos.pdf',
    uploadDate: '2024-02-01',
    status: 'Ativo'
  }
];

const mockFormMessages = [
  {
    id: 1,
    name: 'Carlos Oliveira',
    email: 'carlos@email.com',
    phone: '+55 (11) 99999-9999',
    message: 'Gostaria de saber mais sobre os serviços de Google Ads para minha empresa.',
    date: '2024-01-20 14:30',
    status: 'Novo'
  },
  {
    id: 2,
    name: 'Ana Costa',
    email: 'ana@startup.com',
    phone: '+55 (21) 88888-8888',
    message: 'Preciso de ajuda com automação de vendas e landing pages.',
    date: '2024-01-19 10:15',
    status: 'Respondido'
  },
  {
    id: 3,
    name: 'Pedro Lima',
    email: 'pedro@comercio.com',
    phone: '+55 (31) 77777-7777',
    message: 'Quero entender melhor como funcionam as campanhas no Facebook e Instagram.',
    date: '2024-01-18 16:45',
    status: 'Novo'
  }
];

const AdminDashboard = () => {
  const [clients, setClients] = useState(mockClients);
  const [reports, setReports] = useState(mockReports);
  const [contracts, setContracts] = useState(mockContracts);
  const { messages, updateMessageStatus, deleteMessage: deleteFormMessage } = useFormMessages();
  const { toast } = useToast();
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    plan: 'Start',
    password: ''
  });

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewClient(prev => ({ ...prev, password }));
  };

  const handleAddClient = () => {
    if (newClient.name && newClient.email) {
      const client = {
        id: clients.length + 1,
        ...newClient,
        status: 'Ativo',
        startDate: new Date().toISOString().split('T')[0]
      };
      setClients([...clients, client]);
      setNewClient({ name: '', email: '', plan: 'Start', password: '' });
      
      toast({
        title: "Cliente adicionado",
        description: `${newClient.name} foi adicionado com sucesso.`,
      });
    }
  };

  const handleDeleteClient = (clientId: number) => {
    const clientToDelete = clients.find(c => c.id === clientId);
    if (clientToDelete) {
      setClients(clients.filter(c => c.id !== clientId));
      toast({
        title: "Cliente excluído",
        description: `${clientToDelete.name} foi removido do sistema.`,
      });
    }
  };

  const handleFileUpload = (type: 'report' | 'contract', clientId: number) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const client = clients.find(c => c.id === clientId);
        if (type === 'report') {
          const newReport = {
            id: reports.length + 1,
            clientName: client?.name || '',
            month: new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }),
            status: 'Enviado',
            date: new Date().toISOString().split('T')[0]
          };
          setReports([...reports, newReport]);
          toast({
            title: "Relatório adicionado",
            description: `Relatório para ${client?.name} foi enviado.`,
          });
        } else {
          const newContract = {
            id: contracts.length + 1,
            clientName: client?.name || '',
            fileName: file.name,
            uploadDate: new Date().toISOString().split('T')[0],
            status: 'Ativo'
          };
          setContracts([...contracts, newContract]);
          toast({
            title: "Contrato adicionado",
            description: `Contrato para ${client?.name} foi enviado.`,
          });
        }
      }
    };
    input.click();
  };

  const handleUpdateMessageStatus = (messageId: number, status: 'Novo' | 'Respondido') => {
    updateMessageStatus(messageId, status);
    toast({
      title: "Status atualizado",
      description: `Mensagem marcada como ${status.toLowerCase()}.`,
    });
  };

  const handleDeleteMessage = (messageId: number) => {
    deleteFormMessage(messageId);
    toast({
      title: "Mensagem excluída",
      description: "A mensagem foi removida do sistema.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-sm">
                Admin Dashboard
              </Badge>
              <Badge variant="outline" className="text-sm bg-green-50 text-green-700 border-green-200">
                Acesso Restrito - Admin
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="clients" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="clients" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Clientes
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Relatórios
            </TabsTrigger>
            <TabsTrigger value="contracts" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Contratos
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Mensagens
              {messages.filter(m => m.status === 'Novo').length > 0 && (
                <Badge variant="destructive" className="ml-1 text-xs">
                  {messages.filter(m => m.status === 'Novo').length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clients">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="w-5 h-5" />
                    Adicionar Novo Cliente
                  </CardTitle>
                  <CardDescription>
                    Cadastre um novo cliente e gere uma senha de acesso automaticamente. 
                    <span className="block mt-1 text-blue-600 font-medium">
                      Clientes terão acesso apenas ao painel de usuário comum com detalhes do contrato, plano e relatórios.
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div>
                      <Label htmlFor="clientName">Nome</Label>
                      <Input
                        id="clientName"
                        value={newClient.name}
                        onChange={(e) => setNewClient(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Nome do cliente"
                      />
                    </div>
                    <div>
                      <Label htmlFor="clientEmail">Email</Label>
                      <Input
                        id="clientEmail"
                        type="email"
                        value={newClient.email}
                        onChange={(e) => setNewClient(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="email@cliente.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="clientPlan">Plano</Label>
                      <select
                        id="clientPlan"
                        value={newClient.plan}
                        onChange={(e) => setNewClient(prev => ({ ...prev, plan: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="Start">Start</option>
                        <option value="Premium">Premium</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="clientPassword">Senha</Label>
                      <div className="flex gap-2">
                        <Input
                          id="clientPassword"
                          value={newClient.password}
                          onChange={(e) => setNewClient(prev => ({ ...prev, password: e.target.value }))}
                          placeholder="Senha"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={generatePassword}
                        >
                          <Key className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-end">
                      <Button onClick={handleAddClient} className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Lista de Clientes</CardTitle>
                  <CardDescription>
                    Gerencie todos os clientes cadastrados no sistema.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Nome</th>
                          <th className="text-left p-2">Email</th>
                          <th className="text-left p-2">Plano</th>
                          <th className="text-left p-2">Status</th>
                          <th className="text-left p-2">Data Início</th>
                          <th className="text-left p-2">Senha</th>
                          <th className="text-left p-2">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clients.map((client) => (
                          <tr key={client.id} className="border-b">
                            <td className="p-2">{client.name}</td>
                            <td className="p-2">{client.email}</td>
                            <td className="p-2">
                              <Badge variant={client.plan === 'Premium' ? 'default' : 'secondary'}>
                                {client.plan}
                              </Badge>
                            </td>
                            <td className="p-2">
                              <Badge variant={client.status === 'Ativo' ? 'default' : 'destructive'}>
                                {client.status}
                              </Badge>
                            </td>
                            <td className="p-2">{new Date(client.startDate).toLocaleDateString('pt-BR')}</td>
                            <td className="p-2">
                              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                                {client.password}
                              </code>
                            </td>
                            <td className="p-2">
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleFileUpload('report', client.id)}
                                >
                                  <Upload className="w-4 h-4 mr-1" />
                                  Relatório
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleFileUpload('contract', client.id)}
                                >
                                  <Upload className="w-4 h-4 mr-1" />
                                  Contrato
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleDeleteClient(client.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Relatórios Mensais</CardTitle>
                <CardDescription>
                  Gerencie os relatórios mensais enviados para os clientes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Cliente</th>
                        <th className="text-left p-2">Período</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Data</th>
                        <th className="text-left p-2">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((report) => (
                        <tr key={report.id} className="border-b">
                          <td className="p-2">{report.clientName}</td>
                          <td className="p-2">{report.month}</td>
                          <td className="p-2">
                            <Badge variant={report.status === 'Enviado' ? 'default' : 'secondary'}>
                              {report.status}
                            </Badge>
                          </td>
                          <td className="p-2">{new Date(report.date).toLocaleDateString('pt-BR')}</td>
                          <td className="p-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              Visualizar
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contracts">
            <Card>
              <CardHeader>
                <CardTitle>Contratos</CardTitle>
                <CardDescription>
                  Gerencie os contratos dos clientes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Cliente</th>
                        <th className="text-left p-2">Arquivo</th>
                        <th className="text-left p-2">Data Upload</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contracts.map((contract) => (
                        <tr key={contract.id} className="border-b">
                          <td className="p-2">{contract.clientName}</td>
                          <td className="p-2">{contract.fileName}</td>
                          <td className="p-2">{new Date(contract.uploadDate).toLocaleDateString('pt-BR')}</td>
                          <td className="p-2">
                            <Badge variant="default">
                              {contract.status}
                            </Badge>
                          </td>
                          <td className="p-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              Visualizar
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Mensagens do Formulário</CardTitle>
                <CardDescription>
                  Mensagens recebidas através do formulário de contato do site.
                  <span className="block mt-1 text-green-600 font-medium">
                    ✅ Sistema integrado - Todas as mensagens do site chegam automaticamente aqui!
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>Nenhuma mensagem recebida ainda.</p>
                      <p className="text-sm">As mensagens do formulário aparecerão aqui automaticamente.</p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div key={message.id} className="border rounded-lg p-4 bg-white">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <div>
                              <h3 className="font-semibold text-lg">{message.name}</h3>
                              <p className="text-sm text-gray-600">{message.email} • {message.phone}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={message.status === 'Novo' ? 'destructive' : 'default'}>
                              {message.status}
                            </Badge>
                            <span className="text-xs text-gray-500">{message.date}</span>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <p className="text-gray-700 leading-relaxed">{message.message}</p>
                        </div>
                        
                        <div className="flex gap-2">
                          {message.status === 'Novo' && (
                            <Button
                              size="sm"
                              onClick={() => handleUpdateMessageStatus(message.id, 'Respondido')}
                            >
                              Marcar como Respondido
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteMessage(message.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Excluir
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{clients.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Clientes Premium</CardTitle>
                  <Badge className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {clients.filter(c => c.plan === 'Premium').length}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Relatórios Enviados</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {reports.filter(r => r.status === 'Enviado').length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Mensagens Novas</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {messages.filter(m => m.status === 'Novo').length}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
