
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { KeyRound, Mail } from 'lucide-react';

interface ClientAreaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ClientAreaModal = ({ isOpen, onClose }: ClientAreaModalProps) => {
  const [email, setEmail] = useState('');
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
      // Check for admin credentials
      if (email === 'admin' && password === 'mhrn#2025') {
        toast({
          title: "Login administrativo realizado!",
          description: "Redirecionando para o painel administrativo.",
        });
        navigate('/admin/dashboard');
        onClose();
        return;
      }

      // Regular user login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo à área do cliente.",
        });
        navigate('/cliente/dashboard');
        onClose();
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
        redirectTo: `${window.location.origin}/cliente/login`
      });

      if (error) throw error;

      toast({
        title: "E-mail enviado!",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      });
      setShowForgotPassword(false);
      setForgotEmail('');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
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
                className="flex-1 btn-primary"
                disabled={loading}
              >
                <Mail className="w-4 h-4 mr-2" />
                {loading ? 'Enviando...' : 'Enviar Link'}
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
              <Label htmlFor="modal-email" className="text-white">E-mail ou Login</Label>
              <Input
                id="modal-email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="seu@email.com ou admin"
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
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full btn-primary"
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
