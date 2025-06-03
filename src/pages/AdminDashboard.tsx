
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, FileText, Upload, Plus, Key, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Client {
  id: string;
  email: string;
  name: string;
  plan: string;
  status: 'active' | 'inactive';
  created_at: string;
  password?: string;
}

interface Report {
  id: string;
  client_id: string;
  client_name: string;
  title: string;
  date: string;
  file_name: string;
}

interface Contract {
  id: string;
  client_id: string;
  client_name: string;
  title: string;
  date: string;
  file_name: string;
}

const AdminDashboard = () => {
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      email: 'cliente@exemplo.com',
      name: 'João Silva',
      plan: 'Start',
      status: 'active',
      created_at: '2024-01-15'
    }
  ]);
  
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      client_id: '1',
      client_name: 'João Silva',
      title: 'Relatório Janeiro 2024',
      date: '2024-01-31',
      file_name: 'relatorio_janeiro_2024.pdf'
    }
  ]);

  const [contracts, setContracts] = useState<Contract[]>([
    {
      id: '1',
      client_id: '1',
      client_name: 'João Silva',
      title: 'Contrato de Serviços - Start',
      date: '2024-01-15',
      file_name: 'contrato_joao_silva.pdf'
    }
  ]);

  const [newClientData, setNewClientData] = useState({
    email: '',
    name: '',
    plan: 'Start'
  });

  const [reportUpload, setReportUpload] = useState({
    client_id: '',
    title: '',
    file: null as File | null
  });

  const [contractUpload, setContractUpload] = useState({
    client_id: '',
    title: '',
    file: null as File | null
  });

  const { toast } = useToast();

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleCreateClient = () => {
    if (!newClientData.email || !newClientData.name) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const generatedPassword = generatePassword();

    const newClient: Client = {
      id: Date.now().toString(),
      email: newClientData.email,
      name: newClientData.name,
      plan: newClientData.plan,
      status: 'active',
      created_at: new Date().toISOString().split('T')[0],
      password: generatedPassword
    };

    setClients([...clients, newClient]);
    setNewClientData({ email: '', name: '', plan: 'Start' });
    
    toast({
      title: "Cliente criado!",
      description: `Cliente ${newClientData.name} foi adicionado. Senha: ${generatedPassword}`
    });
  };

  const handleUploadReport = () => {
    if (!reportUpload.client_id || !reportUpload.title || !reportUpload.file) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos e selecione um arquivo.",
        variant: "destructive"
      });
      return;
    }

    const client = clients.find(c => c.id === reportUpload.client_id);
    if (!client) return;

    const newReport: Report = {
      id: Date.now().toString(),
      client_id: reportUpload.client_id,
      client_name: client.name,
      title: reportUpload.title,
      date: new Date().toISOString().split('T')[0],
      file_name: reportUpload.file.name
    };

    setReports([...reports, newReport]);
    setReportUpload({ client_id: '', title: '', file: null });
    
    toast({
      title: "Relatório enviado!",
      description: `Relatório para ${client.name} foi adicionado com sucesso.`
    });
  };

  const handleUploadContract = () => {
    if (!contractUpload.client_id || !contractUpload.title || !contractUpload.file) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos e selecione um arquivo.",
        variant: "destructive"
      });
      return;
    }

    const client = clients.find(c => c.id === contractUpload.client_id);
    if (!client) return;

    const newContract: Contract = {
      id: Date.now().toString(),
      client_id: contractUpload.client_id,
      client_name: client.name,
      title: contractUpload.title,
      date: new Date().toISOString().split('T')[0],
      file_name: contractUpload.file.name
    };

    setContracts([...contracts, newContract]);
    setContractUpload({ client_id: '', title: '', file: null });
    
    toast({
      title: "Contrato enviado!",
      description: `Contrato para ${client.name} foi adicionado com sucesso.`
    });
  };

  return (
    <div className="min-h-screen bg-idBlack text-white">
      <div className="border-b border-gray-800 bg-idDarkBlack">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-idOrange">Painel Administrativo</h1>
          <p className="text-gray-400">Gestão de clientes, contratos e relatórios</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="clients" className="space-y-6">
          <TabsList className="bg-idDarkBlack border-gray-800">
            <TabsTrigger value="clients" className="text-white">
              <Users className="w-4 h-4 mr-2" />
              Clientes
            </TabsTrigger>
            <TabsTrigger value="contracts" className="text-white">
              <FileText className="w-4 h-4 mr-2" />
              Contratos
            </TabsTrigger>
            <TabsTrigger value="reports" className="text-white">
              <Upload className="w-4 h-4 mr-2" />
              Relatórios
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clients" className="space-y-6">
            {/* Criar Novo Cliente */}
            <Card className="bg-idDarkBlack border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Plus className="w-5 h-5 mr-2 text-idOrange" />
                  Novo Cliente
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Adicionar um novo cliente ao sistema com senha gerada automaticamente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newClientData.email}
                      onChange={(e) => setNewClientData({...newClientData, email: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="cliente@exemplo.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="name" className="text-white">Nome</Label>
                    <Input
                      id="name"
                      value={newClientData.name}
                      onChange={(e) => setNewClientData({...newClientData, name: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Nome do cliente"
                    />
                  </div>
                  <div>
                    <Label htmlFor="plan" className="text-white">Plano</Label>
                    <select
                      value={newClientData.plan}
                      onChange={(e) => setNewClientData({...newClientData, plan: e.target.value})}
                      className="w-full h-10 bg-gray-800 border border-gray-700 text-white rounded-md px-3"
                    >
                      <option value="Start">Start</option>
                      <option value="Premium">Premium</option>
                    </select>
                  </div>
                </div>
                <Button onClick={handleCreateClient} className="mt-4 btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Cliente e Gerar Senha
                </Button>
              </CardContent>
            </Card>

            {/* Lista de Clientes */}
            <Card className="bg-idDarkBlack border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Clientes Cadastrados</CardTitle>
                <CardDescription className="text-gray-400">
                  {clients.length} cliente(s) no sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clients.map((client) => (
                    <div key={client.id} className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                      <div>
                        <h4 className="text-white font-medium">{client.name}</h4>
                        <p className="text-gray-400 text-sm">{client.email}</p>
                        <p className="text-gray-500 text-xs">Criado em: {new Date(client.created_at).toLocaleDateString('pt-BR')}</p>
                        {client.password && (
                          <div className="flex items-center mt-2">
                            <Key className="w-4 h-4 text-idOrange mr-2" />
                            <span className="text-xs text-idOrange font-mono">{client.password}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-white text-sm">{client.plan}</p>
                        <Badge className={client.status === 'active' ? 'bg-green-600' : 'bg-red-600'}>
                          {client.status === 'active' ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-6">
            {/* Upload de Contrato */}
            <Card className="bg-idDarkBlack border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Upload className="w-5 h-5 mr-2 text-idOrange" />
                  Enviar Contrato
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Fazer upload de um contrato para um cliente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="contract-client-select" className="text-white">Cliente</Label>
                    <select
                      id="contract-client-select"
                      value={contractUpload.client_id}
                      onChange={(e) => setContractUpload({...contractUpload, client_id: e.target.value})}
                      className="w-full h-10 bg-gray-800 border border-gray-700 text-white rounded-md px-3"
                    >
                      <option value="">Selecione um cliente</option>
                      {clients.map((client) => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="contract-title" className="text-white">Título do Contrato</Label>
                    <Input
                      id="contract-title"
                      value={contractUpload.title}
                      onChange={(e) => setContractUpload({...contractUpload, title: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Ex: Contrato de Serviços - Start"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contract-file" className="text-white">Arquivo PDF</Label>
                    <Input
                      id="contract-file"
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setContractUpload({...contractUpload, file: e.target.files?.[0] || null})}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>
                <Button onClick={handleUploadContract} className="mt-4 btn-primary">
                  <Upload className="w-4 h-4 mr-2" />
                  Enviar Contrato
                </Button>
              </CardContent>
            </Card>

            {/* Lista de Contratos */}
            <Card className="bg-idDarkBlack border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Contratos Enviados</CardTitle>
                <CardDescription className="text-gray-400">
                  {contracts.length} contrato(s) no sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contracts.map((contract) => (
                    <div key={contract.id} className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                      <div>
                        <h4 className="text-white font-medium">{contract.title}</h4>
                        <p className="text-gray-400 text-sm">Cliente: {contract.client_name}</p>
                        <p className="text-gray-500 text-xs">Data: {new Date(contract.date).toLocaleDateString('pt-BR')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 text-sm">{contract.file_name}</p>
                        <Badge className="bg-blue-600">Enviado</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            {/* Upload de Relatório */}
            <Card className="bg-idDarkBlack border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Upload className="w-5 h-5 mr-2 text-idOrange" />
                  Enviar Relatório
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Fazer upload de um relatório para um cliente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="client-select" className="text-white">Cliente</Label>
                    <select
                      id="client-select"
                      value={reportUpload.client_id}
                      onChange={(e) => setReportUpload({...reportUpload, client_id: e.target.value})}
                      className="w-full h-10 bg-gray-800 border border-gray-700 text-white rounded-md px-3"
                    >
                      <option value="">Selecione um cliente</option>
                      {clients.map((client) => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="report-title" className="text-white">Título do Relatório</Label>
                    <Input
                      id="report-title"
                      value={reportUpload.title}
                      onChange={(e) => setReportUpload({...reportUpload, title: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Ex: Relatório Janeiro 2024"
                    />
                  </div>
                  <div>
                    <Label htmlFor="report-file" className="text-white">Arquivo PDF</Label>
                    <Input
                      id="report-file"
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setReportUpload({...reportUpload, file: e.target.files?.[0] || null})}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>
                <Button onClick={handleUploadReport} className="mt-4 btn-primary">
                  <Upload className="w-4 h-4 mr-2" />
                  Enviar Relatório
                </Button>
              </CardContent>
            </Card>

            {/* Lista de Relatórios */}
            <Card className="bg-idDarkBlack border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Relatórios Enviados</CardTitle>
                <CardDescription className="text-gray-400">
                  {reports.length} relatório(s) no sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                      <div>
                        <h4 className="text-white font-medium">{report.title}</h4>
                        <p className="text-gray-400 text-sm">Cliente: {report.client_name}</p>
                        <p className="text-gray-500 text-xs">Data: {new Date(report.date).toLocaleDateString('pt-BR')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 text-sm">{report.file_name}</p>
                        <Badge className="bg-blue-600">Enviado</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
