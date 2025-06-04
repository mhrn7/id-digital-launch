import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Check for admin credentials first
      if (email === 'admin' && password === 'mhrn#2025') {
        localStorage.setItem('isAdminLoggedIn', 'true');
        toast({
          title: "Login administrativo realizado!",
          description: "Redirecionando para o painel administrativo.",
        });
        navigate('/admin/dashboard');
        return;
      }

      // For regular clients, check localStorage for demo purposes
      const savedClients = localStorage.getItem('adminClients');
      if (savedClients) {
        const clients = JSON.parse(savedClients);
        const client = clients.find((c: any) => 
          (c.email === email && c.password === password) ||
          (c.name === email && c.password === password)
        );
        
        if (client) {
          localStorage.setItem('currentClient', JSON.stringify(client));
          toast({
            title: "Login realizado com sucesso!",
            description: "Bem-vindo à área do cliente.",
          });
          navigate('/cliente/dashboard');
          return;
        }
      }

      // Check if Supabase is configured for real authentication
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        setError('Credenciais não encontradas. Verifique se você foi cadastrado pelo administrador ou tente novamente.');
        setLoading(false);
        return;
      }

      // Try Supabase authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError('Credenciais inválidas. Verifique seu email e senha.');
      } else if (data.user) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo à área do cliente.",
        });
        navigate('/cliente/dashboard');
      }
    } catch (error: any) {
      setError('Erro ao fazer login. Tente novamente.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Check if Supabase is configured
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        setError('Sistema de autenticação não configurado. Entre em contato com o administrador.');
        return;
      }

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/cliente/dashboard`
        }
      });
      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-idBlack flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-idDarkBlack border-gray-800">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">Área do Cliente</CardTitle>
          <CardDescription className="text-gray-400">
            Faça login para acessar seu dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">E-mail ou Nome</Label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="seu@email.com ou seu nome"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Senha</Label>
              <Input
                id="password"
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
          </form>
          
          <div className="mt-6 text-center">
            <Link to="/cliente/forgot-password" className="text-idOrange hover:underline text-sm">
              Esqueceu sua senha?
            </Link>
          </div>
          
          <div className="mt-4 text-center">
            <Link to="/" className="text-gray-400 hover:text-white text-sm">
              ← Voltar ao site
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
