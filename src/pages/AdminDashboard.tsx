import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useFormMessages } from '@/hooks/useFormMessages';
import { useToast } from '@/hooks/use-toast';
import { Plus, Users, MessageSquare, FileText, LogOut, Trash2, Eye, Calendar, UserPlus, Key, Upload, Edit } from 'lucide-react';

// Plan details
const planDetails = {
  Start: [
    'Landingpage',
    'Tráfego Google Ads + GMN',
    'Relatórios quinzenais',
    'Suporte WhatsApp seg a sáb horário comercial'
  ],
  Pro: [
    'Landingpage',
    'Tráfego Google ADS + GMN',
    'Tráfego Meta ADS + Outras plataformas',
    'Planejamento estratégico de marketing',
    'Relatórios Semanais',
    'Suporte 24/7'
  ]
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [reports, setReports] = useState([]);
  const [contracts, setContracts] = useState([]);
  const { messages, updateMessageStatus, deleteMessage: deleteFormMessage } = useFormMessages();
  const { toast } = useToast();
  const [editingClient, setEditingClient] = useState(null);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    plan: 'Start',
    password: '',
    currency: 'BRL',
    monthlyValue: ''
  });

  const checkAdminAuth = () => {
    const isAdmin = localStorage.getItem('isAdminLoggedIn');
    if (!isAdmin) {
      navigate('/cliente/login');
    }
  };

  useEffect(() => {
    checkAdminAuth();
    loadData();
  }, []);

  const loadData = () => {
    // Load clients from localStorage
    const savedClients = localStorage.getItem('adminClients');
    if (savedClients) {
      setClients(JSON.parse(savedClients));
    }

    // Load reports from localStorage
    const savedReports = localStorage.getItem('adminReports');
    if (savedReports) {
      setReports(JSON.parse(savedReports));
    }

    // Load contracts from localStorage
    const savedContracts = localStorage.getItem('adminContracts');
    if (savedContracts) {
      setContracts(JSON.parse(savedContracts));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/cliente/login');
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (editingClient) {
      setEditingClient(prev => ({ ...prev, password }));
    } else {
      setNewClient(prev => ({ ...prev, password }));
    }
  };

  const handleAddClient = (e) => {
    e.preventDefault();
    
    if (!newClient.name || !newClient.email || !newClient.plan || !newClient.password || !newClient.currency || !newClient.monthlyValue) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const client = {
      ...newClient,
      id: Date.now(),
      startDate: new Date().toISOString().split('T')[0],
      status: 'Ativo',
      monthlyValue: parseFloat(newClient.monthlyValue)
    };

    const updatedClients = [...clients, client];
    setClients(updatedClients);
    localStorage.setItem('adminClients', JSON.stringify(updatedClients));

    setNewClient({ name: '', email: '', plan: 'Start', password: '', currency: 'BRL', monthlyValue: '' });

    toast({
      title: "Cliente adicionado!",
      description: `${client.name} foi cadastrado com sucesso.`,
    });
  };

  const handleEditClient = (client) => {
    setEditingClient({ ...client });
  };

  const handleUpdateClient = (e) => {
    e.preventDefault();
    
    if (!editingClient.name || !editingClient.email || !editingClient.plan || !editingClient.password || !editingClient.currency || !editingClient.monthlyValue) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const updatedClients = clients.map(c => 
      c.id === editingClient.id ? { ...editingClient, monthlyValue: parseFloat(editingClient.monthlyValue) } : c
    );
    setClients(updatedClients);
    localStorage.setItem('adminClients', JSON.stringify(updatedClients));
    setEditingClient(null);

    toast({
      title: "Cliente atualizado!",
      description: `${editingClient.name} foi atualizado com sucesso.`,
    });
  };

  const handleDeleteClient = (clientId) => {
    const clientToDelete = clients.find(c => c.id === clientId);
    if (clientToDelete) {
      const updatedClients = clients.filter(c => c.id !== clientId);
      setClients(updatedClients);
      localStorage.setItem('adminClients', JSON.stringify(updatedClients));
      toast({
        title: "Cliente excluído",
        description: `${clientToDelete.name} foi removido do sistema.`,
      });
    }
  };

  const handleDeleteReport = (reportId) => {
    const reportToDelete = reports.find(r => r.id === reportId);
    if (reportToDelete) {
      const updatedReports = reports.filter(r => r.id !== reportId);
      setReports(updatedReports);
      localStorage.setItem('adminReports', JSON.stringify(updatedReports));
      toast({
        title: "Relatório excluído",
        description: `Relatório de ${reportToDelete.clientName} foi removido.`,
      });
    }
  };

  const handleDeleteContract = (contractId) => {
    const contractToDelete = contracts.find(c => c.id === contractId);
    if (contractToDelete) {
      const updatedContracts = contracts.filter(c => c.id !== contractId);
      setContracts(updatedContracts);
      localStorage.setItem('adminContracts', JSON.stringify(updatedContracts));
      toast({
        title: "Contrato excluído",
        description: `Contrato de ${contractToDelete.clientName} foi removido.`,
      });
    }
  };

  const handleFileUpload = (type, clientId) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const client = clients.find(c => c.id === clientId);
        if (type === 'report') {
          const newReport = {
            id: Date.now(),
            clientName: client?.name || '',
            month: new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }),
            status: 'Enviado',
            date: new Date().toISOString().split('T')[0]
          };
          const updatedReports = [...reports, newReport];
          setReports(updatedReports);
          localStorage.setItem('adminReports', JSON.stringify(updatedReports));
          toast({
            title: "Relatório adicionado",
            description: `Relatório para ${client?.name} foi enviado.`,
          });
        } else {
          const newContract = {
            id: Date.now(),
            clientName: client?.name || '',
            fileName: file.name,
            uploadDate: new Date().toISOString().split('T')[0],
            status: 'Ativo'
          };
          const updatedContracts = [...contracts, newContract];
          setContracts(updatedContracts);
          localStorage.setItem('adminContracts', JSON.stringify(updatedContracts));
          toast({
            title: "Contrato adicionado",
            description: `Contrato para ${client?.name} foi enviado.`,
          });
        }
      }
    };
    input.click();
  };

  const handleUpdateMessageStatus = (messageId, status) => {
    updateMessageStatus(messageId, status);
    toast({
      title: "Status atualizado",
      description: `Mensagem marcada como ${status.toLowerCase()}.`,
    });
  };

  const handleDeleteMessage = (messageId) => {
    deleteFormMessage(messageId);
    toast({
      title: "Mensagem excluída",
      description: "A mensagem foi removida do sistema.",
    });
  };

  return (
    <div className="min-h-screen bg-idBlack text-white">
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
              <Button variant="outline" onClick={handleLogout} className="border-gray-700">
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="clients" className="space-y-8">
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
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddClient}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
                      <div>
                        <Label htmlFor="clientName">Nome</Label>
                        <Input
                          id="clientName"
                          value={newClient.name}
                          onChange={(e) => setNewClient(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Nome do cliente"
                          required
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
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="clientPlan">Plano</Label>
                        <select
                          id="clientPlan"
                          value={newClient.plan}
                          onChange={(e) => setNewClient(prev => ({ ...prev, plan: e.target.value }))}
                          className="w-full p-2 border border-gray-300 rounded-md bg-black text-idOrange"
                          required
                        >
                          <option value="Start">Start</option>
                          <option value="Pro">Pro</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="clientCurrency">Moeda</Label>
                        <select
                          id="clientCurrency"
                          value={newClient.currency}
                          onChange={(e) => setNewClient(prev => ({ ...prev, currency: e.target.value }))}
                          className="w-full p-2 border border-gray-300 rounded-md bg-black text-idOrange"
                          required
                        >
                          <option value="BRL">BRL (R$)</option>
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="clientValue">Valor Mensal</Label>
                        <Input
                          id="clientValue"
                          type="number"
                          value={newClient.monthlyValue}
                          onChange={(e) => setNewClient(prev => ({ ...prev, monthlyValue: e.target.value }))}
                          placeholder="1500"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="clientPassword">Senha</Label>
                        <div className="flex gap-2">
                          <Input
                            id="clientPassword"
                            value={newClient.password}
                            onChange={(e) => setNewClient(prev => ({ ...prev, password: e.target.value }))}
                            placeholder="Senha"
                            required
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
                        <Button type="submit" className="w-full">
                          <Plus className="w-4 h-4 mr-2" />
                          Adicionar
                        </Button>
                      </div>
                    </div>
                  </form>
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
                  {clients.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>Nenhum cliente cadastrado ainda.</p>
                      <p className="text-sm">Adicione seu primeiro cliente usando o formulário acima.</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Plano</TableHead>
                          <TableHead>Valor Mensal</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Data Início</TableHead>
                          <TableHead>Senha</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {clients.map((client) => (
                          <TableRow key={client.id}>
                            <TableCell>{client.name}</TableCell>
                            <TableCell>{client.email}</TableCell>
                            <TableCell>
                              <Badge variant={client.plan === 'Pro' ? 'default' : 'secondary'}>
                                {client.plan}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {client.currency === 'BRL' && 'R$ '}
                              {client.currency === 'USD' && '$ '}
                              {client.currency === 'EUR' && '€ '}
                              {client.currency === 'GBP' && '£ '}
                              {client.monthlyValue?.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Badge variant={client.status === 'Ativo' ? 'default' : 'destructive'}>
                                {client.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{new Date(client.startDate).toLocaleDateString('pt-BR')}</TableCell>
                            <TableCell>
                              <code className="bg-gray-100 px-2 py-1 rounded text-sm text-black">
                                {client.password}
                              </code>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEditClient(client)}
                                >
                                  <Edit className="w-4 h-4 mr-1" />
                                  Editar
                                </Button>
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
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button size="sm" variant="destructive">
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Tem certeza que deseja excluir o cliente {client.name}? Esta ação não pode ser desfeita.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDeleteClient(client.id)}>
                                        Excluir
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>

              {/* Edit Client Dialog */}
              <Dialog open={!!editingClient} onOpenChange={() => setEditingClient(null)}>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Editar Cliente</DialogTitle>
                    <DialogDescription>
                      Atualize as informações do cliente.
                    </DialogDescription>
                  </DialogHeader>
                  {editingClient && (
                    <form onSubmit={handleUpdateClient}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="editName">Nome</Label>
                          <Input
                            id="editName"
                            value={editingClient.name}
                            onChange={(e) => setEditingClient(prev => ({ ...prev, name: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="editEmail">Email</Label>
                          <Input
                            id="editEmail"
                            type="email"
                            value={editingClient.email}
                            onChange={(e) => setEditingClient(prev => ({ ...prev, email: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="editPlan">Plano</Label>
                          <select
                            id="editPlan"
                            value={editingClient.plan}
                            onChange={(e) => setEditingClient(prev => ({ ...prev, plan: e.target.value }))}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          >
                            <option value="Start">Start</option>
                            <option value="Pro">Pro</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="editCurrency">Moeda</Label>
                          <select
                            id="editCurrency"
                            value={editingClient.currency}
                            onChange={(e) => setEditingClient(prev => ({ ...prev, currency: e.target.value }))}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          >
                            <option value="BRL">BRL (R$)</option>
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="editValue">Valor Mensal</Label>
                          <Input
                            id="editValue"
                            type="number"
                            value={editingClient.monthlyValue}
                            onChange={(e) => setEditingClient(prev => ({ ...prev, monthlyValue: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="editPassword">Senha</Label>
                          <div className="flex gap-2">
                            <Input
                              id="editPassword"
                              value={editingClient.password}
                              onChange={(e) => setEditingClient(prev => ({ ...prev, password: e.target.value }))}
                              required
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
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button type="button" variant="outline" onClick={() => setEditingClient(null)}>
                          Cancelar
                        </Button>
                        <Button type="submit">
                          Salvar Alterações
                        </Button>
                      </div>
                    </form>
                  )}
                </DialogContent>
              </Dialog>
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
                {reports.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Nenhum relatório enviado ainda.</p>
                    <p className="text-sm">Os relatórios aparecerão aqui quando forem enviados para os clientes.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Período</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell>{report.clientName}</TableCell>
                          <TableCell>{report.month}</TableCell>
                          <TableCell>
                            <Badge variant={report.status === 'Enviado' ? 'default' : 'secondary'}>
                              {report.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(report.date).toLocaleDateString('pt-BR')}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-1" />
                                Visualizar
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" variant="destructive">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Tem certeza que deseja excluir este relatório? Esta ação não pode ser desfeita.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteReport(report.id)}>
                                      Excluir
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
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
                {contracts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Nenhum contrato enviado ainda.</p>
                    <p className="text-sm">Os contratos aparecerão aqui quando forem enviados para os clientes.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Arquivo</TableHead>
                        <TableHead>Data Upload</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contracts.map((contract) => (
                        <TableRow key={contract.id}>
                          <TableCell>{contract.clientName}</TableCell>
                          <TableCell>{contract.fileName}</TableCell>
                          <TableCell>{new Date(contract.uploadDate).toLocaleDateString('pt-BR')}</TableCell>
                          <TableCell>
                            <Badge variant="default">
                              {contract.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-1" />
                                Visualizar
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" variant="destructive">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Tem certeza que deseja excluir este contrato? Esta ação não pode ser desfeita.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteContract(contract.id)}>
                                      Excluir
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Mensagens do Formulário</CardTitle>
                <CardDescription>
                  Mensagens recebidas através do formulário de contato do site.
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
                              <h3 className="font-semibold text-lg text-black">{message.name}</h3>
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
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Trash2 className="w-4 h-4 mr-1" />
                                Excluir
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja excluir esta mensagem? Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteMessage(message.id)}>
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
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
                    {clients.filter(c => c.plan === 'Pro').length}
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
