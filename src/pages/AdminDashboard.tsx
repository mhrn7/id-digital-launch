
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { LogOut, Users, Plus, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState<any[]>([]);
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newClientPassword, setNewClientPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdminUser();
    fetchClients();
  }, []);

  const checkAdminUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/cliente/login');
        return;
      }
      
      // Verificar se é admin (você pode implementar uma tabela de admins)
      // Por enquanto, vamos usar um email específico como admin
      const adminEmails = ['admin@agenciaid.com', 'seu-email@exemplo.com'];
      if (!adminEmails.includes(user.email || '')) {
        navigate('/cliente/dashboard');
        return;
      }
      
      setUser(user);
    } catch (error) {
      console.error('Error checking admin user:', error);
      navigate('/cliente/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      // Em produção, você buscaria os clientes de uma tabela no Supabase
      const mockClients = [
        { id: 1, email: 'cliente1@exemplo.com', name: 'Cliente 1', created_at: '2024-01-15' },
        { id: 2, email: 'cliente2@exemplo.com', name: 'Cliente 2', created_at: '2024-01-20' },
      ];
      setClients(mockClients);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Criar usuário no Supabase Auth
      const { data, error } = await supabase.auth.admin.createUser({
        email: newClientEmail,
        password: newClientPassword,
        email_confirm: true
      });

      if (error) throw error;

      toast({
        title: "Cliente criado com sucesso!",
        description: `Login criado para ${newClientEmail}`,
      });

      setNewClientEmail('');
      setNewClientPassword('');
      fetchClients();
    } catch (error: any) {
      toast({
        title: "Erro ao criar cliente",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Erro ao sair",
        description: error.message,
        variant: "destructive"
      });
    } else {
      navigate('/cliente/login');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-idBlack flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-idBlack text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-idDarkBlack">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-idOrange">Painel Administrativo</h1>
            <p className="text-gray-400">Gestão de clientes e sistema</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="border-gray-700">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-idDarkBlack border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total de Clientes
              </CardTitle>
              <Users className="h-4 w-4 text-idOrange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {clients.length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-idDarkBlack border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Clientes Ativos
              </CardTitle>
              <Settings className="h-4 w-4 text-idOrange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {clients.length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-idDarkBlack border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Novos este Mês
              </CardTitle>
              <Plus className="h-4 w-4 text-idOrange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                2
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create New Client */}
          <Card className="bg-idDarkBlack border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Criar Novo Cliente</CardTitle>
              <CardDescription className="text-gray-400">
                Adicione um novo cliente ao sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateClient} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="client-email" className="text-white">Email do Cliente</Label>
                  <Input
                    id="client-email"
                    type="email"
                    value={newClientEmail}
                    onChange={(e) => setNewClientEmail(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="client-password" className="text-white">Senha Temporária</Label>
                  <Input
                    id="client-password"
                    type="password"
                    value={newClientPassword}
                    onChange={(e) => setNewClientPassword(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Cliente
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Clients List */}
          <Card className="bg-idDarkBlack border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Clientes Cadastrados</CardTitle>
              <CardDescription className="text-gray-400">
                Lista de todos os clientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clients.map((client) => (
                  <div key={client.id} className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">{client.email}</h4>
                      <p className="text-gray-400 text-sm">Criado em {client.created_at}</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-gray-700">
                      Ver Dashboard
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
