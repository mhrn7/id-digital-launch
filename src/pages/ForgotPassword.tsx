
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      // Criar mensagem de recuperação de senha
      const passwordRecoveryMessage = {
        id: Date.now(),
        name: 'Recuperação de Senha',
        email: email,
        message: `Solicitação de recuperação de senha para o email: ${email}`,
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
        description: "Sua solicitação foi enviada para o administrador.",
      });

      setMessage('Sua solicitação de recuperação de senha foi enviada para o administrador.');
      
      // Redirecionar após 3 segundos
      setTimeout(() => {
        navigate('/cliente/login');
      }, 3000);
      
    } catch (error: any) {
      setError('Erro ao enviar solicitação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-idBlack flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-idDarkBlack border-gray-800">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">Recuperar Senha</CardTitle>
          <CardDescription className="text-gray-400">
            Digite seu email para solicitar recuperação de senha
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResetPassword} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {message && (
              <Alert>
                <AlertDescription className="text-green-600">{message}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="seu@email.com"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-idOrange hover:bg-idOrange/90 text-black font-semibold"
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar Solicitação'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <Link to="/cliente/login" className="text-idOrange hover:underline text-sm">
              ← Voltar ao login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
