
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { LogOut, FileText, CreditCard, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ClientPlan {
  name: string;
  price: number;
  features: string[];
  status: 'active' | 'expired' | 'pending';
}

interface Report {
  id: string;
  title: string;
  date: string;
  file_url: string;
}

const ClientDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [clientPlan, setClientPlan] = useState<ClientPlan | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
    fetchClientData();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/cliente/login');
        return;
      }
      setUser(user);
    } catch (error) {
      console.error('Error checking user:', error);
      navigate('/cliente/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchClientData = async () => {
    // Dados simulados - em produção, buscar do Supabase
    const mockPlan: ClientPlan = {
      name: 'Start',
      price: 1500,
      features: [
        'Gestão Google Ads',
        'Relatórios mensais',
        'Suporte via WhatsApp',
        'Otimização básica'
      ],
      status: 'active'
    };

    const mockReports: Report[] = [
      {
        id: '1',
        title: 'Relatório Janeiro 2024',
        date: '2024-01-31',
        file_url: '#'
      },
      {
        id: '2',
        title: 'Relatório Dezembro 2023',
        date: '2023-12-31',
        file_url: '#'
      }
    ];

    setClientPlan(mockPlan);
    setReports(mockReports);
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

  const downloadReport = (report: Report) => {
    toast({
      title: "Download iniciado",
      description: `Baixando ${report.title}...`
    });
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
            <h1 className="text-2xl font-bold text-idOrange">Área do Cliente</h1>
            <p className="text-gray-400">Bem-vindo, {user?.email}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="border-gray-700">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-idDarkBlack p-1 rounded-lg">
          <Button variant="ghost" className="flex-1 bg-idOrange text-white">
            <FileText className="w-4 h-4 mr-2" />
            Contrato
          </Button>
          <Button variant="ghost" className="flex-1 text-gray-400 hover:text-white">
            <CreditCard className="w-4 h-4 mr-2" />
            Plano
          </Button>
          <Button variant="ghost" className="flex-1 text-gray-400 hover:text-white">
            <TrendingUp className="w-4 h-4 mr-2" />
            Relatórios
          </Button>
        </div>

        <div className="space-y-8">
          {/* Contrato Section */}
          <Card className="bg-idDarkBlack border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <FileText className="w-5 h-5 mr-2 text-idOrange" />
                Contrato de Serviços
              </CardTitle>
              <CardDescription className="text-gray-400">
                Seu contrato de prestação de serviços
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                <div>
                  <h4 className="text-white font-medium">Contrato de Gestão de Tráfego - Start</h4>
                  <p className="text-gray-400 text-sm">Assinado em 15/01/2024</p>
                  <Badge className="mt-2 bg-green-600">Ativo</Badge>
                </div>
                <Button variant="outline" className="border-gray-700">
                  <FileText className="w-4 h-4 mr-2" />
                  Baixar PDF
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Plano Section */}
          {clientPlan && (
            <Card className="bg-idDarkBlack border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-idOrange" />
                  Plano {clientPlan.name}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Detalhes do seu plano atual
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Valor Mensal:</span>
                    <span className="text-2xl font-bold text-idOrange">
                      R$ {clientPlan.price.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Status:</span>
                    <Badge className={clientPlan.status === 'active' ? 'bg-green-600' : 'bg-red-600'}>
                      {clientPlan.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-3">Serviços Inclusos:</h4>
                    <ul className="space-y-2">
                      {clientPlan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-300">
                          <div className="w-2 h-2 bg-idOrange rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Relatórios Section */}
          <Card className="bg-idDarkBlack border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-idOrange" />
                Relatórios de Performance
              </CardTitle>
              <CardDescription className="text-gray-400">
                Seus relatórios mensais organizados por data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.length > 0 ? (
                  reports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                      <div>
                        <h4 className="text-white font-medium">{report.title}</h4>
                        <p className="text-gray-400 text-sm">
                          Data: {new Date(report.date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        className="border-gray-700"
                        onClick={() => downloadReport(report)}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Baixar
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <TrendingUp className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Nenhum relatório disponível ainda.</p>
                    <p className="text-gray-500 text-sm">Os relatórios aparecerão aqui conforme forem publicados.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
