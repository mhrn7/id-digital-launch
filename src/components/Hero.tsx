
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from './LanguageProvider';

const Hero = () => {
  const { language } = useLanguage();
  const [count, setCount] = useState(0);

  useEffect(() => {
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

    // Animate counter
    const duration = 5000; // 5 seconds
    const targetValue = 830000;
    const increment = targetValue / (duration / 50);
    let currentValue = 0;

    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= targetValue) {
        currentValue = targetValue;
        clearInterval(timer);
      }
      setCount(Math.floor(currentValue));
    }, 50);

    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
  }, []);

  const getContent = () => {
    switch (language) {
      case 'EN':
        return {
          heroTitle: (
            <>Ready to scale your <span className="text-idOrange">sales</span> with paid traffic?</>
          ),
          heroDescription: 'Get a personalized analysis at no cost. Digital marketing strategies focused on results and cutting-edge AI technology to accelerate your company\'s growth.',
          requestProposal: '🎯 Get Free Analysis Now',
          ourServices: 'Our Services',
          managedInAds: 'Managed in Ads',
          satisfiedPartners: 'Satisfied Partners',
          approvalRate: 'Approval Rate'
        };
      case 'ES':
        return {
          heroTitle: (
            <>¿Listo para escalar tus <span className="text-idOrange">ventas</span> con tráfico pago?</>
          ),
          heroDescription: 'Recibe un análisis personalizado sin costo. Estrategias de marketing digital enfocadas en resultados y tecnología de punta con IA para acelerar el crecimiento de tu empresa.',
          requestProposal: '🎯 Obtener Análisis Gratis Ahora',
          ourServices: 'Nuestros Servicios',
          managedInAds: 'Gestionados en Anuncios',
          satisfiedPartners: 'Socios Satisfechos',
          approvalRate: 'Índice de Aprobación'
        };
      default: // PT
        return {
          heroTitle: (
            <>Pronto para escalar suas <span className="text-idOrange">vendas</span> com tráfego pago?</>
          ),
          heroDescription: 'Receba uma análise personalizada sem custo. Estratégias de marketing digital com foco em resultados e tecnologia de ponta com IA para acelerar o crescimento da sua empresa.',
          requestProposal: '🎯 Receber Diagnóstico Agora',
          ourServices: 'Conheça Nossos Serviços',
          managedInAds: 'Gerenciados em Anúncios',
          satisfiedPartners: 'Parceiros Satisfeitos',
          approvalRate: 'Taxa de Aprovação'
        };
    }
  };

  const content = getContent();

  const getWhatsappMessage = () => {
    switch (language) {
      case 'EN':
        return 'Hello! I came from the iD Agency website and would like to receive a free analysis of my business.';
      case 'ES':
        return 'Hola! Vengo del sitio web de la Agencia iD y me gustaría recibir un análisis gratuito de mi negocio.';
      default: // PT
        return 'Olá! Vim pelo site da Agência iD e gostaria de receber uma análise gratuita do meu negócio.';
    }
  };

  const whatsappMessage = getWhatsappMessage();
  const whatsappLink = `https://wa.me/5561999601534?text=${encodeURIComponent(whatsappMessage)}`;

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
              {content.heroTitle}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-xl">
              {content.heroDescription}
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href={whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button className="btn-primary text-base md:text-lg px-6 md:px-8 py-4 md:py-6">
                  {content.requestProposal}
                </Button>
              </a>
              <a href="#services">
                <Button variant="outline" className="btn-outline text-base md:text-lg px-6 md:px-8 py-4 md:py-6">
                  {content.ourServices}
                </Button>
              </a>
            </div>

            {/* Stats - Multiple Counters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
              <div className="border border-gray-800 rounded-lg p-4 md:p-6 bg-idDarkBlack/50 text-center">
                <h3 className="text-idOrange text-2xl md:text-3xl font-bold mb-2">
                  {formatNumber(count)}
                </h3>
                <p className="text-gray-400 text-sm md:text-base">
                  {content.managedInAds}
                </p>
              </div>
              
              <div className="border border-gray-800 rounded-lg p-4 md:p-6 bg-idDarkBlack/50 text-center">
                <h3 className="text-idOrange text-2xl md:text-3xl font-bold mb-2">
                  67+
                </h3>
                <p className="text-gray-400 text-sm md:text-base">
                  {content.satisfiedPartners}
                </p>
              </div>
              
              <div className="border border-gray-800 rounded-lg p-4 md:p-6 bg-idDarkBlack/50 text-center">
                <h3 className="text-idOrange text-2xl md:text-3xl font-bold mb-2">
                  98%
                </h3>
                <p className="text-gray-400 text-sm md:text-base">
                  {content.approvalRate}
                </p>
              </div>
            </div>
          </div>

          {/* 3D Rocket Image */}
          <div className="flex justify-center animate-on-scroll">
            <div className="relative w-full max-w-md">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="3D Rocket Launch" 
                  className="w-full h-auto max-h-[500px] object-contain filter brightness-110 contrast-110"
                />
                <div className="absolute -inset-6 bg-idOrange/15 rounded-full blur-2xl -z-10 animate-pulse-slow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
