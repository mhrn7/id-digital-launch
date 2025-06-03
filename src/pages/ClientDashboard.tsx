
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { LogOut, TrendingUp, DollarSign, MousePointer, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CampaignData {
  platform: string;
  investment: number;
  cpc: number;
  cpm: number;
  ctr: number;
  roas: number;
}

const ClientDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [campaignData, setCampaignData] = useState<CampaignData[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
    fetchCampaignData();
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

  const fetchCampaignData = async () => {
    // Simulando dados de campanha - em produção, isso viria das APIs do Google Ads e Meta
    const mockData: CampaignData[] = [
      {
        platform: 'Google Ads',
        investment: 15000,
        cpc: 2.35,
        cpm: 18.50,
        ctr: 3.2,
        roas: 4.8
      },
      {
        platform: 'Meta Ads',
        investment: 12000,
        cpc: 1.85,
        cpm: 12.30,
        ctr: 2.8,
        roas: 5.2
      }
    ];
    setCampaignData(mockData);
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

  const totalInvestment = campaignData.reduce((sum, campaign) => sum + campaign.investment, 0);
  const avgRoas = campaignData.reduce((sum, campaign) => sum + campaign.roas, 0) / campaignData.length;

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
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-idDarkBlack border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Investimento Total
              </CardTitle>
              <DollarSign className="h-4 w-4 text-idOrange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                R$ {totalInvestment.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-idDarkBlack border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                ROAS Médio
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-idOrange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {avgRoas.toFixed(1)}x
              </div>
            </CardContent>
          </Card>

          <Card className="bg-idDarkBlack border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Plataformas Ativas
              </CardTitle>
              <Eye className="h-4 w-4 text-idOrange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {campaignData.length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-idDarkBlack border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Status
              </CardTitle>
              <MousePointer className="h-4 w-4 text-idOrange" />
            </CardHeader>
            <CardContent>
              <Badge className="bg-green-600">Ativo</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Campaign Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {campaignData.map((campaign, index) => (
            <Card key={index} className="bg-idDarkBlack border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">{campaign.platform}</CardTitle>
                <CardDescription className="text-gray-400">
                  Performance das campanhas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Investimento:</span>
                    <span className="text-white font-semibold">
                      R$ {campaign.investment.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">CPC:</span>
                    <span className="text-white">R$ {campaign.cpc.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">CPM:</span>
                    <span className="text-white">R$ {campaign.cpm.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">CTR:</span>
                    <span className="text-white">{campaign.ctr}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">ROAS:</span>
                    <span className="text-idOrange font-semibold">
                      {campaign.roas.toFixed(1)}x
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contracts Section */}
        <div className="mt-8">
          <Card className="bg-idDarkBlack border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Documentos</CardTitle>
              <CardDescription className="text-gray-400">
                Seus contratos e documentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Contrato de Serviços</h4>
                    <p className="text-gray-400 text-sm">Atualizado em 15/01/2024</p>
                  </div>
                  <Button variant="outline" className="border-gray-700">
                    Download PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
