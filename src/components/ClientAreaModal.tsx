
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { KeyRound, Mail } from 'lucide-react';

interface ClientAreaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ClientAreaModal = ({ isOpen, onClose }: ClientAreaModalProps) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Tentando fazer login com:', { name, password });
      
      // Check admin credentials first
      if ((name === 'admin' || name === 'administrador') && 
          (password === 'mhrn#2025' || password === 'admin123')) {
        const adminUser = {
          id: 'admin',
          name: name,
          role: 'admin',
          loginTime: new Date().toISOString()
        };

        localStorage.setItem('adminUser', JSON.stringify(adminUser));
        localStorage.setItem('isAdminLoggedIn', 'true');
        
        console.log('Admin logado com sucesso:', adminUser);

        toast({
          title: "Login administrativo realizado!",
          description: "Redirecionando para o painel administrativo.",
        });

        navigate('/admin/dashboard');
        onClose();
        return;
      }

      // For regular clients, check localStorage
      const savedClients = localStorage.getItem('adminClients');
      if (savedClients) {
        const clients = JSON.parse(savedClients);
        const client = clients.find((c: any) => 
          c.name.toLowerCase() === name.toLowerCase() && c.password === password
        );
        
        if (client) {
          localStorage.setItem('currentClient', JSON.stringify(client));
          toast({
            title: "Login realizado com sucesso!",
            description: "Bem-vindo à área do cliente.",
          });
          navigate('/cliente/dashboard');
          onClose();
          return;
        }
      }

      setError('Nome ou senha incorretos. Verifique suas credenciais.');
    } catch (error: any) {
      setError('Erro ao fazer login. Tente novamente.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Criar mensagem de recuperação de senha
      const passwordRecoveryMessage = {
        id: Date.now(),
        name: 'Recuperação de Senha',
        email: forgotEmail,
        message: `Solicitação de recuperação de senha para o email: ${forgotEmail}`,
        date: new Date().toLocaleString('pt-BR'),
        status: 'Novo' as const,
        type: 'password-recovery'
      };

      // Adicionar às mensagens existentes
      const existingMessages = localStorage.getItem('formMessages');
      const messages = existingMessages ? JSON.parse(existingMessages) : [];
      messages.unshift(passwordRecoveryMessage);
      localStorage.setItem('formMessages', JSON.stringify(messages));

      toast({
        title: "Solicitação enviada!",
        description: "Sua solicitação de recuperação foi enviada para o administrador.",
      });
      
      setShowForgotPassword(false);
      setForgotEmail('');
    } catch (error: any) {
      setError('Erro ao enviar solicitação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setPassword('');
    setError('');
    setShowForgotPassword(false);
    setForgotEmail('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-idDarkBlack border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center">
            <KeyRound className="w-5 h-5 mr-2 text-idOrange" />
            {showForgotPassword ? 'Recuperar Senha' : 'Área do Cliente'}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {showForgotPassword 
              ? 'Digite seu e-mail para recuperar a senha'
              : 'Faça login para acessar sua área exclusiva'
            }
          </DialogDescription>
        </DialogHeader>

        {showForgotPassword ? (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="forgot-email" className="text-white">E-mail</Label>
              <Input
                id="forgot-email"
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="seu@email.com"
                required
              />
            </div>
            
            <div className="flex space-x-2">
              <Button 
                type="submit" 
                className="flex-1 bg-idOrange hover:bg-idOrange/90 text-black"
                disabled={loading}
              >
                <Mail className="w-4 h-4 mr-2" />
                {loading ? 'Enviando...' : 'Enviar Solicitação'}
              </Button>
              <Button 
                type="button" 
                variant="outline"
                className="border-gray-700 text-white hover:bg-gray-800"
                onClick={() => setShowForgotPassword(false)}
              >
                Voltar
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="modal-name" className="text-white">Nome</Label>
              <Input
                id="modal-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Seu nome"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="modal-password" className="text-white">Senha</Label>
              <Input
                id="modal-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="••••••••"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-idOrange hover:bg-idOrange/90 text-black"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
            
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-idOrange hover:underline text-sm"
              >
                Esqueceu sua senha?
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ClientAreaModal;
