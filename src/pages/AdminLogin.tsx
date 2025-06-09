
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/components/LanguageProvider';
import LanguageSelector from '@/components/LanguageSelector';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();

  const translations = {
    PT: {
      adminAccess: 'Acesso Administrativo',
      adminDescription: 'Faça login para acessar o painel administrativo',
      email: 'Email',
      password: 'Senha',
      login: 'Entrar',
      logging: 'Entrando...',
      invalidCredentials: 'Credenciais inválidas',
      tryAgain: 'Tente novamente',
      loginSuccess: 'Login realizado com sucesso!'
    },
    EN: {
      adminAccess: 'Administrative Access',
      adminDescription: 'Login to access the administrative panel',
      email: 'Email',
      password: 'Password',
      login: 'Login',
      logging: 'Logging in...',
      invalidCredentials: 'Invalid credentials',
      tryAgain: 'Try again',
      loginSuccess: 'Login successful!'
    },
    ES: {
      adminAccess: 'Acceso Administrativo',
      adminDescription: 'Inicie sesión para acceder al panel administrativo',
      email: 'Correo electrónico',
      password: 'Contraseña',
      login: 'Iniciar sesión',
      logging: 'Iniciando sesión...',
      invalidCredentials: 'Credenciales inválidas',
      tryAgain: 'Intentar de nuevo',
      loginSuccess: '¡Inicio de sesión exitoso!'
    }
  };

  const t = translations[language];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Tentando fazer login com:', { email, password });
      
      // Check admin credentials - múltiplas opções válidas
      const isValidAdmin = (
        (email === 'admin@idanuncios.com' && password === 'admin123') ||
        (email === 'admin' && password === 'mhrn#2025') ||
        (email === 'admin@agenciaidmkt.site' && password === 'admin123')
      );

      if (isValidAdmin) {
        const adminUser = {
          id: 'admin',
          email: email,
          role: 'admin',
          loginTime: new Date().toISOString()
        };

        // Salvar no localStorage
        localStorage.setItem('adminUser', JSON.stringify(adminUser));
        localStorage.setItem('isAdminLoggedIn', 'true');
        
        console.log('Admin logado com sucesso:', adminUser);

        toast({
          title: t.loginSuccess,
          description: "Redirecionando para o painel...",
        });

        // Redirecionar para o dashboard
        navigate('/admin/dashboard');
      } else {
        console.log('Credenciais inválidas:', { email, password });
        toast({
          title: t.invalidCredentials,
          description: t.tryAgain,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Erro no login:', error);
      toast({
        title: 'Erro',
        description: 'Erro interno do servidor',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-idBlack flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>
      
      <Card className="w-full max-w-md bg-idDarkBlack border-gray-800">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-idOrange/20 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-idOrange" />
          </div>
          <CardTitle className="text-2xl text-white">{t.adminAccess}</CardTitle>
          <CardDescription className="text-gray-400">
            {t.adminDescription}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">{t.email}</Label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-idBlack border-gray-700 text-white"
                placeholder="admin@agenciaidmkt.site"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">{t.password}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-idBlack border-gray-700 text-white"
                placeholder="••••••••"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-idOrange hover:bg-idOrange/90 text-black font-semibold"
              disabled={loading}
            >
              {loading ? t.logging : t.login}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
            <p className="text-xs text-gray-400 text-center">
              Demo: admin@agenciaidmkt.site / admin123<br/>
              ou admin / mhrn#2025
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
