import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from './LanguageProvider';

const Hero = () => {
  const {
    language
  } = useLanguage();
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Apply animation to elements
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.1
    });
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
          heroTitle: <>Ready to scale your <span className="text-idOrange">sales</span> with paid traffic?</>,
          heroDescription: 'Get a personalized analysis at no cost. Digital marketing strategies focused on results and cutting-edge AI technology to accelerate your company\'s growth.',
          requestProposal: 'I Want to Start Scaling My Business',
          ourServices: 'Our Services',
          managedInAds: 'Managed in Ads',
          satisfiedPartners: 'Satisfied Partners',
          approvalRate: 'Approval Rate'
        };
      case 'ES':
        return {
          heroTitle: <>¿Listo para escalar tus <span className="text-idOrange">ventas</span> con tráfico pago?</>,
          heroDescription: 'Recibe un análisis personalizado sin costo. Estrategias de marketing digital enfocadas en resultados y tecnología de punta con IA para acelerar el crecimiento de tu empresa.',
          requestProposal: 'Quiero Comenzar a Escalar Mi Negocio',
          ourServices: 'Nuestros Servicios',
          managedInAds: 'Gestionados en Anuncios',
          satisfiedPartners: 'Socios Satisfechos',
          approvalRate: 'Índice de Aprobación'
        };
      default:
        // PT
        return {
          heroTitle: <>Pronto para escalar suas <span className="text-idOrange">vendas</span> com tráfego pago?</>,
          heroDescription: 'Receba uma análise personalizada sem custo. Estratégias de marketing digital com foco em resultados e tecnologia de ponta com IA para acelerar o crescimento da sua empresa.',
          requestProposal: 'Quero Começar a Escalar Meu Negócio',
          ourServices: 'Conheça Nossos Serviços',
          managedInAds: 'Gerenciados em Anúncios',
          satisfiedPartners: 'Parceiros Satisfeitos',
          approvalRate: 'Taxa de Aprovação'
        };
    }
  };

  const content = getContent();
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
              <a href="#contact">
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

          {/* Profile Image with Circle Background - Increased size by 1.5x */}
          <div className="flex justify-center animate-on-scroll">
            <div className="relative">
              {/* Gradient Circle Background - increased from w-80 h-80 to w-[480px] h-[480px] */}
              <div className="w-[480px] h-[480px] rounded-full bg-gradient-to-br from-idOrange/30 to-idOrange/10 p-1">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-idOrange/20 to-transparent p-4">
                  <img 
                    src="/lovable-uploads/e8edba01-542f-42bc-851a-f1cbbdf62975.png" 
                    alt="CEO da Agência iD" 
                    className="w-full h-full rounded-full border-4 border-idOrange/40 object-cover" 
                  />
                </div>
              </div>
              
              {/* Floating Animation Effects - adjusted positions for larger image */}
              <div className="absolute -top-6 -right-6 w-10 h-10 bg-idOrange/60 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-idOrange/40 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 -right-10 w-8 h-8 bg-idOrange/50 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
