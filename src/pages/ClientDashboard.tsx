import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LogOut, CreditCard, TrendingUp, FileText } from 'lucide-react';
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

// Professional plan details with translations - Updated services
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
    loading: 'Carregando...',
    downloadSuccess: 'Download iniciado com sucesso!',
    downloadError: 'Erro ao baixar o relatório. Tente novamente.'
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
    loading: 'Loading...',
    downloadSuccess: 'Download started successfully!',
    downloadError: 'Error downloading the report. Please try again.'
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
    loading: 'Cargando...',
    downloadSuccess: '¡Descarga iniciada con éxito!',
    downloadError: 'Error al descargar el informe. Inténtelo de nuevo.'
  }
};

const ClientDashboard = () => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clientPlan, setClientPlan] = useState(null);
  const [reports, setReports] = useState([]);
  const [activeTab, setActiveTab] = useState('plan'); // Changed default tab to 'plan'
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    checkClient();
    fetchClientData();
  }, []);

  useEffect(() => {
    // Re-fetch client data when language changes to update plan details
    fetchClientData();
  }, [language]);

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
          features: planDetails[language][clientData.plan || 'Start'] || planDetails[language].Start,
          status: 'active'
        };

        // Get reports from localStorage that belong to this client
        const adminReports = localStorage.getItem('adminReports');
        let clientReports = [];
        if (adminReports) {
          const allReports = JSON.parse(adminReports);
          clientReports = allReports.filter(report => 
            report.clientName === clientData.name || report.clientId === clientData.id
          );
        }

        setClientPlan(mockPlan);
        setReports(clientReports);
      }
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('currentClient');
    navigate('/'); // Changed from '/cliente/login' to '/'
    toast({
      title: t.logout,
      description: "Você foi desconectado com sucesso.",
    });
  };

  const downloadReport = async (report) => {
    try {
      console.log('Iniciando download do relatório:', report);
      
      // Check if the file URL exists
      const fileUrl = report.fileUrl || report.file_url;
      if (!fileUrl) {
        throw new Error('URL do arquivo não encontrada');
      }

      // Check if it's a blob URL or external URL
      if (fileUrl.startsWith('blob:') || fileUrl.startsWith('data:')) {
        // For blob URLs, create a temporary link
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = `${report.title}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // For external URLs, open in new tab
        window.open(fileUrl, '_blank');
      }
      
      toast({
        title: t.downloadSuccess,
        description: `${report.title}`,
      });
    } catch (error) {
      console.error('Erro no download:', error);
      toast({
        title: t.downloadError,
        description: "Verifique se o arquivo ainda está disponível.",
        variant: "destructive"
      });
    }
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
      {/* Header - Melhorado para mobile */}
      <div className="border-b border-gray-800 bg-idDarkBlack">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-idOrange">{t.clientArea}</h1>
            <p className="text-gray-400 text-sm sm:text-base">{t.welcome}, {client?.name || client?.email}</p>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <LanguageSelector />
            <Button variant="outline" onClick={handleLogout} className="border-gray-700 text-sm">
              <LogOut className="w-4 h-4 mr-2" />
              {t.logout}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Navigation Tabs - Melhorado para mobile */}
        <div className="flex space-x-1 mb-6 sm:mb-8 bg-idDarkBlack p-1 rounded-lg">
          <Button 
            variant="ghost" 
            className={`flex-1 text-sm sm:text-base ${activeTab === 'plan' ? 'bg-idOrange text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('plan')}
          >
            <CreditCard className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">{t.plan}</span>
            <span className="sm:hidden">Plano</span>
          </Button>
          <Button 
            variant="ghost" 
            className={`flex-1 text-sm sm:text-base ${activeTab === 'reports' ? 'bg-idOrange text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('reports')}
          >
            <TrendingUp className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">{t.reports}</span>
            <span className="sm:hidden">Relatórios</span>
          </Button>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Plano Section - Melhorado para mobile */}
          {activeTab === 'plan' && clientPlan && (
            <Card className="bg-idDarkBlack border-gray-800">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center text-lg sm:text-xl">
                  <CreditCard className="w-5 h-5 mr-2 text-idOrange" />
                  {t.plan} {clientPlan.name}
                </CardTitle>
                <CardDescription className="text-gray-400 text-sm sm:text-base">
                  {t.planDetails}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span className="text-gray-400 text-sm sm:text-base">{t.monthlyValue}:</span>
                    <span className="text-xl sm:text-2xl font-bold text-idOrange">
                      {formatCurrency(clientPlan.price, clientPlan.currency)}
                    </span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span className="text-gray-400 text-sm sm:text-base">{t.status}:</span>
                    <Badge className={clientPlan.status === 'active' ? 'bg-green-600' : 'bg-red-600'}>
                      {clientPlan.status === 'active' ? t.active : 'Inativo'}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-3 sm:mb-4 text-base sm:text-lg">{t.includedServices}:</h4>
                    <ul className="space-y-2 sm:space-y-3">
                      {clientPlan.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-gray-300 text-sm sm:text-base">
                          <div className="w-2 h-2 bg-idOrange rounded-full mr-3 sm:mr-4 mt-2 flex-shrink-0"></div>
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Relatórios Section - Melhorado para mobile */}
          {activeTab === 'reports' && (
            <Card className="bg-idDarkBlack border-gray-800">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center text-lg sm:text-xl">
                  <TrendingUp className="w-5 h-5 mr-2 text-idOrange" />
                  {t.performanceReports}
                </CardTitle>
                <CardDescription className="text-gray-400 text-sm sm:text-base">
                  {t.reportsDescription}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {reports.length > 0 ? (
                    reports.map((report) => (
                      <div key={report.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border border-gray-700 rounded-lg gap-3">
                        <div className="flex-1">
                          <h4 className="text-white font-medium text-sm sm:text-base">{report.title}</h4>
                          <p className="text-gray-400 text-xs sm:text-sm">
                            {t.date}: {new Date(report.date).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <Button 
                          variant="outline" 
                          className="border-gray-700 w-full sm:w-auto text-sm"
                          onClick={() => downloadReport(report)}
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          {t.download}
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 sm:py-8">
                      <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400 text-sm sm:text-base">{t.noReports}</p>
                      <p className="text-gray-500 text-xs sm:text-sm">{t.reportsWillAppear}</p>
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
