
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, LogOut, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/components/LanguageProvider';
import MessageModal from '@/components/MessageModal';

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
  const [messages, setMessages] = useState<Message[]>([]);
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
      welcome: 'Gerenciar Mensagens do Site',
      viewMessage: 'Ver Mensagem',
      noMessages: 'Nenhuma mensagem recebida.',
      messageName: 'Nome',
      messageEmail: 'Email',
      messagePhone: 'Telefone',
      messageDate: 'Data',
      messageType: 'Tipo',
      actions: 'Ações',
      logout: 'Sair',
      logoutSuccess: 'Logout realizado com sucesso!',
      passwordRecovery: 'Recuperação de Senha',
      contact: 'Contato',
      newMessage: 'Nova',
      respondedMessage: 'Respondida'
    },
    EN: {
      adminPanel: 'Admin Panel',
      welcome: 'Manage Website Messages',
      viewMessage: 'View Message',
      noMessages: 'No messages received.',
      messageName: 'Name',
      messageEmail: 'Email',
      messagePhone: 'Phone',
      messageDate: 'Date',
      messageType: 'Type',
      actions: 'Actions',
      logout: 'Logout',
      logoutSuccess: 'Logout successful!',
      passwordRecovery: 'Password Recovery',
      contact: 'Contact',
      newMessage: 'New',
      respondedMessage: 'Responded'
    },
    ES: {
      adminPanel: 'Panel Administrativo',
      welcome: 'Gestionar Mensajes del Sitio',
      viewMessage: 'Ver Mensaje',
      noMessages: 'Ningún mensaje recibido.',
      messageName: 'Nombre',
      messageEmail: 'Email',
      messagePhone: 'Teléfono',
      messageDate: 'Fecha',
      messageType: 'Tipo',
      actions: 'Acciones',
      logout: 'Cerrar sesión',
      logoutSuccess: '¡Cierre de sesión exitoso!',
      passwordRecovery: 'Recuperación de Contraseña',
      contact: 'Contacto',
      newMessage: 'Nuevo',
      respondedMessage: 'Respondido'
    }
  };

  const t = translations[language];

  useEffect(() => {
    // Carregar mensagens do localStorage
    const savedMessages = localStorage.getItem('contactMessages');
    const savedFormMessages = localStorage.getItem('formMessages');
    
    // Combinar mensagens de contato e formulário
    let allMessages: Message[] = [];
    
    if (savedMessages) {
      allMessages = [...allMessages, ...JSON.parse(savedMessages)];
    }
    
    if (savedFormMessages) {
      allMessages = [...allMessages, ...JSON.parse(savedFormMessages)];
    }
    
    // Ordenar por data (mais recentes primeiro)
    allMessages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    setMessages(allMessages);
  }, []);

  const handleViewMessage = (message: Message) => {
    console.log('Viewing message:', message);
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
    navigate('/');
  };

  const getMessageTypeLabel = (message: Message) => {
    if (message.type === 'password-recovery') {
      return t.passwordRecovery;
    }
    return t.contact;
  };

  const getStatusLabel = (status: string) => {
    return status === 'Novo' ? t.newMessage : t.respondedMessage;
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
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Mensagens do Site</h2>
            <div className="text-sm text-gray-400">
              Total: {messages.length} mensagem{messages.length !== 1 ? 's' : ''}
            </div>
          </div>
          
          <Card className="bg-idDarkBlack border-gray-800">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-4 text-white">{t.messageName}</th>
                      <th className="text-left p-4 text-white">{t.messageEmail}</th>
                      <th className="text-left p-4 text-white">{t.messagePhone}</th>
                      <th className="text-left p-4 text-white">{t.messageType}</th>
                      <th className="text-left p-4 text-white">Status</th>
                      <th className="text-left p-4 text-white">{t.messageDate}</th>
                      <th className="text-left p-4 text-white">{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.length > 0 ? (
                      messages.map((message) => (
                        <tr key={message.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                          <td className="p-4 text-gray-300">{message.name}</td>
                          <td className="p-4 text-gray-300">{message.email}</td>
                          <td className="p-4 text-gray-300">{message.phone || '-'}</td>
                          <td className="p-4 text-gray-300">{getMessageTypeLabel(message)}</td>
                          <td className="p-4">
                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                              message.status === 'Novo' 
                                ? 'bg-green-900 text-green-300' 
                                : 'bg-gray-900 text-gray-300'
                            }`}>
                              {getStatusLabel(message.status)}
                            </span>
                          </td>
                          <td className="p-4 text-gray-300">{message.date}</td>
                          <td className="p-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewMessage(message)}
                              className="border-gray-700"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              {t.viewMessage}
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-gray-400">
                          <Mail className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                          {t.noMessages}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal de mensagem */}
      {selectedMessage && (
        <MessageModal
          open={showMessageModal}
          onOpenChange={setShowMessageModal}
          message={selectedMessage}
          onClose={handleCloseMessageModal}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
