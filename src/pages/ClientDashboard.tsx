
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LogOut, FileText, CreditCard, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/components/LanguageProvider';
import LanguageSelector from '@/components/LanguageSelector';

interface ClientPlan {
  name: string;
  price: number;
  currency: string;
  features: string[];
  status: 'active' | 'expired' | 'pending';
}

interface Report {
  id: string;
  title: string;
  date: string;
  file_url: string;
}

// Professional plan details with translations
const planDetails = {
  PT: {
    Start: [
      'Landing Page Profissional',
      'Gestão de Tráfego Google Ads + Google Merchant Center',
      'Relatórios de Performance Quinzenais',
      'Suporte Especializado via WhatsApp (Segunda a Sábado - Horário Comercial)'
    ],
    Pro: [
      'Landing Page Profissional',
      'Gestão de Tráfego Google Ads + Google Merchant Center',
      'Gestão de Tráfego Meta Ads + Plataformas Complementares',
      'Planejamento Estratégico de Marketing Digital',
      'Relatórios de Performance Semanais',
      'Suporte Premium 24/7'
    ]
  },
  EN: {
    Start: [
      'Professional Landing Page',
      'Google Ads + Google Merchant Center Traffic Management',
      'Bi-weekly Performance Reports',
      'Specialized WhatsApp Support (Monday to Saturday - Business Hours)'
    ],
    Pro: [
      'Professional Landing Page',
      'Google Ads + Google Merchant Center Traffic Management',
      'Meta Ads + Complementary Platforms Traffic Management',
      'Digital Marketing Strategic Planning',
      'Weekly Performance Reports',
      'Premium 24/7 Support'
    ]
  },
  ES: {
    Start: [
      'Landing Page Profesional',
      'Gestión de Tráfico Google Ads + Google Merchant Center',
      'Informes de Rendimiento Quincenales',
      'Soporte Especializado vía WhatsApp (Lunes a Sábado - Horario Comercial)'
    ],
    Pro: [
      'Landing Page Profesional',
      'Gestión de Tráfico Google Ads + Google Merchant Center',
      'Gestión de Tráfico Meta Ads + Plataformas Complementarias',
      'Planificación Estratégica de Marketing Digital',
      'Informes de Rendimiento Semanales',
      'Soporte Premium 24/7'
    ]
  }
};

const translations = {
  PT: {
    clientArea: 'Área do Cliente',
    welcome: 'Bem-vindo',
    logout: 'Sair',
    contract: 'Contrato',
    plan: 'Plano',
    reports: 'Relatórios',
    serviceContract: 'Contrato de Serviços',
    contractDescription: 'Seu contrato de prestação de serviços',
    trafficManagement: 'Contrato de Gestão de Tráfego',
    signedOn: 'Assinado em',
    active: 'Ativo',
    downloadPdf: 'Baixar PDF',
    planDetails: 'Detalhes do seu plano atual',
    monthlyValue: 'Valor Mensal',
    status: 'Status',
    includedServices: 'Serviços Inclusos',
    performanceReports: 'Relatórios de Performance',
    reportsDescription: 'Seus relatórios mensais organizados por data',
    date: 'Data',
    download: 'Baixar',
    noReports: 'Nenhum relatório disponível ainda.',
    reportsWillAppear: 'Os relatórios aparecerão aqui conforme forem publicados.',
    loading: 'Carregando...'
  },
  EN: {
    clientArea: 'Client Area',
    welcome: 'Welcome',
    logout: 'Logout',
    contract: 'Contract',
    plan: 'Plan',
    reports: 'Reports',
    serviceContract: 'Service Contract',
    contractDescription: 'Your service agreement',
    trafficManagement: 'Traffic Management Contract',
    signedOn: 'Signed on',
    active: 'Active',
    downloadPdf: 'Download PDF',
    planDetails: 'Details of your current plan',
    monthlyValue: 'Monthly Value',
    status: 'Status',
    includedServices: 'Included Services',
    performanceReports: 'Performance Reports',
    reportsDescription: 'Your monthly reports organized by date',
    date: 'Date',
    download: 'Download',
    noReports: 'No reports available yet.',
    reportsWillAppear: 'Reports will appear here as they are published.',
    loading: 'Loading...'
  },
  ES: {
    clientArea: 'Área del Cliente',
    welcome: 'Bienvenido',
    logout: 'Salir',
    contract: 'Contrato',
    plan: 'Plan',
    reports: 'Informes',
    serviceContract: 'Contrato de Servicios',
    contractDescription: 'Su contrato de prestación de servicios',
    trafficManagement: 'Contrato de Gestión de Tráfico',
    signedOn: 'Firmado el',
    active: 'Activo',
    downloadPdf: 'Descargar PDF',
    planDetails: 'Detalles de su plan actual',
    monthlyValue: 'Valor Mensual',
    status: 'Estado',
    includedServices: 'Servicios Incluidos',
    performanceReports: 'Informes de Rendimiento',
    reportsDescription: 'Sus informes mensuales organizados por fecha',
    date: 'Fecha',
    download: 'Descargar',
    noReports: 'Aún no hay informes disponibles.',
    reportsWillAppear: 'Los informes aparecerán aquí cuando se publiquen.',
    loading: 'Cargando...'
  }
};

const ClientDashboard = () => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clientPlan, setClientPlan] = useState(null);
  const [reports, setReports] = useState([]);
  const [activeTab, setActiveTab] = useState('contract');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    checkClient();
    fetchClientData();
  }, []);

  const checkClient = async () => {
    try {
      // Check if client is logged in via localStorage
      const savedClient = localStorage.getItem('currentClient');
      if (savedClient) {
        const clientData = JSON.parse(savedClient);
        setClient(clientData);
        setLoading(false);
        return;
      }

      // If no saved client, redirect to login
      navigate('/cliente/login');
    } catch (error) {
      console.error('Error checking client:', error);
      navigate('/cliente/login');
    }
  };

  const fetchClientData = async () => {
    // Get client data from localStorage
    const savedClient = localStorage.getItem('currentClient');
    let clientData = null;
    
    if (savedClient) {
      clientData = JSON.parse(savedClient);
      
      // Try to get updated data from adminClients
      const adminClients = localStorage.getItem('adminClients');
      if (adminClients) {
        const clients = JSON.parse(adminClients);
        const updatedClient = clients.find((c) => c.email === clientData.email);
        if (updatedClient) {
          clientData = updatedClient;
          // Update current client data
          localStorage.setItem('currentClient', JSON.stringify(updatedClient));
          setClient(updatedClient);
        }
      }
      
      if (clientData) {
        const mockPlan = {
          name: clientData.plan || 'Start',
          price: clientData.monthlyValue || (clientData.plan === 'Pro' ? 2500 : 1500),
          currency: clientData.currency || 'BRL',
          features: planDetails[language][clientData.plan] || planDetails[language].Start,
          status: 'active'
        };

        // Get reports from localStorage that belong to this client
        const adminReports = localStorage.getItem('adminReports');
        let clientReports = [];
        if (adminReports) {
          const allReports = JSON.parse(adminReports);
          clientReports = allReports.filter(report => report.clientName === clientData.name);
        }

        setClientPlan(mockPlan);
        setReports(clientReports);
      }
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('currentClient');
    navigate('/cliente/login');
    toast({
      title: t.logout,
      description: "Você foi desconectado com sucesso.",
    });
  };

  const downloadReport = (report) => {
    toast({
      title: "Download iniciado",
      description: `Baixando ${report.title}...`
    });
  };

  const formatCurrency = (value, currency) => {
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
            <h1 className="text-2xl font-bold text-idOrange">{t.clientArea}</h1>
            <p className="text-gray-400">{t.welcome}, {client?.name || client?.email}</p>
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
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-idDarkBlack p-1 rounded-lg">
          <Button 
            variant="ghost" 
            className={`flex-1 ${activeTab === 'contract' ? 'bg-idOrange text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('contract')}
          >
            <FileText className="w-4 h-4 mr-2" />
            {t.contract}
          </Button>
          <Button 
            variant="ghost" 
            className={`flex-1 ${activeTab === 'plan' ? 'bg-idOrange text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('plan')}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            {t.plan}
          </Button>
          <Button 
            variant="ghost" 
            className={`flex-1 ${activeTab === 'reports' ? 'bg-idOrange text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('reports')}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            {t.reports}
          </Button>
        </div>

        <div className="space-y-8">
          {/* Contrato Section */}
          {activeTab === 'contract' && (
            <Card className="bg-idDarkBlack border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-idOrange" />
                  {t.serviceContract}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {t.contractDescription}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">{t.trafficManagement} - {clientPlan?.name}</h4>
                    <p className="text-gray-400 text-sm">{t.signedOn} {client?.startDate ? new Date(client.startDate).toLocaleDateString('pt-BR') : '15/01/2024'}</p>
                    <Badge className="mt-2 bg-green-600">{t.active}</Badge>
                  </div>
                  <Button variant="outline" className="border-gray-700">
                    <FileText className="w-4 h-4 mr-2" />
                    {t.downloadPdf}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Plano Section */}
          {activeTab === 'plan' && clientPlan && (
            <Card className="bg-idDarkBlack border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-idOrange" />
                  {t.plan} {clientPlan.name}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {t.planDetails}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">{t.monthlyValue}:</span>
                    <span className="text-2xl font-bold text-idOrange">
                      {formatCurrency(clientPlan.price, clientPlan.currency)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">{t.status}:</span>
                    <Badge className={clientPlan.status === 'active' ? 'bg-green-600' : 'bg-red-600'}>
                      {clientPlan.status === 'active' ? t.active : 'Inativo'}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-4 text-lg">{t.includedServices}:</h4>
                    <ul className="space-y-3">
                      {clientPlan.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-gray-300">
                          <div className="w-2 h-2 bg-idOrange rounded-full mr-4 mt-2 flex-shrink-0"></div>
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Relatórios Section */}
          {activeTab === 'reports' && (
            <Card className="bg-idDarkBlack border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-idOrange" />
                  {t.performanceReports}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {t.reportsDescription}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.length > 0 ? (
                    reports.map((report) => (
                      <div key={report.id} className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                        <div>
                          <h4 className="text-white font-medium">{report.title || `Relatório ${report.month}`}</h4>
                          <p className="text-gray-400 text-sm">
                            {t.date}: {new Date(report.date).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <Button 
                          variant="outline" 
                          className="border-gray-700"
                          onClick={() => downloadReport(report)}
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          {t.download}
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <TrendingUp className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">{t.noReports}</p>
                      <p className="text-gray-500 text-sm">{t.reportsWillAppear}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
