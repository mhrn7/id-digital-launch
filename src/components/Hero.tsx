
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [language, setLanguage] = useState('PT');

  useEffect(() => {
    // Check for URL params or localStorage for language setting
    const storedLanguage = localStorage.getItem('language') || 'PT';
    setLanguage(storedLanguage);

    // Apply animation to elements
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 bg-idBlack overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-idOrange/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-idOrange/15 rounded-full blur-[120px]"></div>
      </div>

      <div className="container-custom relative z-10 pt-10 pb-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Hero Content */}
          <div className="animate-on-scroll">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
              {language === 'PT' ? (
                <>Impulsione seu <span className="text-idOrange">negócio</span> com tráfego pago</>
              ) : (
                <>Boost your <span className="text-idOrange">business</span> with paid traffic</>
              )}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-xl">
              {language === 'PT' ? (
                <>Estratégias de marketing digital com foco em resultados e tecnologia de ponta com IA para acelerar o crescimento da sua empresa.</>
              ) : (
                <>Digital marketing strategies focused on results and cutting-edge AI technology to accelerate your company's growth.</>
              )}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="btn-primary">
                {language === 'PT' ? 'Solicite uma Proposta' : 'Request a Proposal'}
              </Button>
              <Button variant="outline" className="btn-outline">
                {language === 'PT' ? 'Conheça Nossos Serviços' : 'Our Services'}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12">
              <div className="border border-gray-800 rounded-lg p-4 bg-idDarkBlack/50">
                <h3 className="text-idOrange text-3xl font-bold">2M</h3>
                <p className="text-gray-400">{language === 'PT' ? 'Gerenciados em anúncios' : 'Managed in ads'}</p>
              </div>
              <div className="border border-gray-800 rounded-lg p-4 bg-idDarkBlack/50">
                <h3 className="text-idOrange text-3xl font-bold">{language === 'PT' ? 'Local' : 'Local'}</h3>
                <p className="text-gray-400">{language === 'PT' ? 'Especialista em negócios locais' : 'Local business specialist'}</p>
              </div>
              <div className="border border-gray-800 rounded-lg p-4 bg-idDarkBlack/50">
                <h3 className="text-idOrange text-3xl font-bold">24/7</h3>
                <p className="text-gray-400">{language === 'PT' ? 'Suporte ao cliente' : 'Customer support'}</p>
              </div>
            </div>
          </div>

          {/* Hero Rocket Image */}
          <div className="flex justify-center animate-on-scroll">
            <div className="relative w-full max-w-md">
              <img 
                src="/lovable-uploads/de67c327-2a6e-4fb3-b59a-d1627b5a65b0.png" 
                alt="Foguete Agência iD" 
                className="w-full h-auto animate-float"
              />
              {/* Subtle glow effect */}
              <div className="absolute -inset-4 bg-idOrange/10 rounded-full blur-xl -z-10"></div>
              <div className="absolute -bottom-4 left-0 right-0 h-20 bg-gradient-to-t from-idBlack to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-pulse-slow">
        <span className="text-gray-400 mb-2">{language === 'PT' ? 'Role para baixo' : 'Scroll down'}</span>
        <svg className="w-6 h-6 text-idOrange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
