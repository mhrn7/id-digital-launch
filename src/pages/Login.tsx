
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [name, setName] = useState('');
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
      if ((name === 'admin' || name === 'administrador') && 
          (password === 'mhrn#2025' || password === 'admin123')) {
        localStorage.setItem('isAdminLoggedIn', 'true');
        const adminUser = {
          id: 'admin',
          name: name,
          role: 'admin',
          loginTime: new Date().toISOString()
        };
        localStorage.setItem('adminUser', JSON.stringify(adminUser));
        
        toast({
          title: "Login administrativo realizado!",
          description: "Redirecionando para o painel administrativo.",
        });
        navigate('/admin/dashboard');
        return;
      }

      // For regular clients, check localStorage for demo purposes
      const savedClients = localStorage.getItem('adminClients');
      console.log('Checking clients in localStorage:', savedClients);
      
      if (savedClients) {
        const clients = JSON.parse(savedClients);
        console.log('Parsed clients:', clients);
        console.log('Looking for name:', name, 'password:', password);
        
        const client = clients.find((c: any) => {
          const nameMatch = c.name?.toLowerCase() === name.toLowerCase();
          const passwordMatch = c.password === password;
          
          console.log('Checking client:', c.name);
          console.log('Name match:', nameMatch, 'Password match:', passwordMatch);
          
          return nameMatch && passwordMatch;
        });
        
        console.log('Found client:', client);
        
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

      setError('Nome ou senha incorretos. Verifique se você foi cadastrado pelo administrador.');
    } catch (error: any) {
      console.error('Login error:', error);
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
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
              <Label htmlFor="name" className="text-white">Nome</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Seu nome"
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
                placeholder="••••••••"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-idOrange hover:bg-idOrange/90 text-black font-semibold"
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
