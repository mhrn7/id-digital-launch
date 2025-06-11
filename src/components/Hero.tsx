import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from './LanguageProvider';

const Hero = () => {
  const { language } = useLanguage();
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
          heroTitle: <>We are specialists in <span className="text-idOrange">boosting businesses digitally</span>.</>,
          heroDescription: 'Digital marketing strategies focused on results and cutting-edge AI technology to accelerate your company\'s growth.',
          requestProposal: 'I Want to Start Scaling My Business',
          ourServices: 'Our Services',
          managedInAds: 'Managed in Ads',
          satisfiedPartners: 'Satisfied Partners',
          approvalRate: 'Approval Rate'
        };
      case 'ES':
        return {
          heroTitle: <>Somos especialistas en <span className="text-idOrange">impulsar negocios digitalmente</span>.</>,
          heroDescription: 'Estrategias de marketing digital enfocadas en resultados y tecnología con IA para acelerar el crecimiento de tu empresa.',
          requestProposal: 'Quiero Comenzar a Escalar Mi Negocio',
          ourServices: 'Nuestros Servicios',
          managedInAds: 'Gestionados en Anuncios',
          satisfiedPartners: 'Socios Satisfechos',
          approvalRate: 'Índice de Aprobación'
        };
      default:
        // PT
        return {
          heroTitle: <>Somos especialistas em <span className="text-idOrange">impulsionar negócios no digital</span>.</>,
          heroDescription: 'Estratégias de marketing digital com foco em resultados e tecnologia com IA para acelerar o crescimento da sua empresa.',
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
    <section id="home" className="relative min-h-screen flex items-center pt-16 sm:pt-20 bg-idBlack overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-idOrange/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-idOrange/15 rounded-full blur-[120px]"></div>
      </div>

      <div className="container-custom relative z-10 pt-8 pb-12 sm:pt-10 sm:pb-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-center">
          {/* Hero Content - Melhorado para mobile */}
          <div className="animate-on-scroll text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 leading-tight px-2 sm:px-0">
              {content.heroTitle}
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-300 max-w-xl mx-auto lg:mx-0 px-2 sm:px-0">
              {content.heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-2 sm:px-0 justify-center lg:justify-start">
              <a href="#contact" className="w-full sm:w-auto">
                <Button className="btn-primary text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 w-full sm:w-auto">
                  {content.requestProposal}
                </Button>
              </a>
              <a href="#services" className="w-full sm:w-auto">
                <Button variant="outline" className="btn-outline text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 w-full sm:w-auto">
                  {content.ourServices}
                </Button>
              </a>
            </div>

            {/* Stats - Melhorado para mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-8 sm:mt-12 px-2 sm:px-0">
              <div className="border border-gray-800 rounded-lg p-3 sm:p-4 md:p-6 bg-idDarkBlack/50 text-center">
                <h3 className="text-idOrange text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">
                  {formatNumber(count)}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base">
                  {content.managedInAds}
                </p>
              </div>
              
              <div className="border border-gray-800 rounded-lg p-3 sm:p-4 md:p-6 bg-idDarkBlack/50 text-center">
                <h3 className="text-idOrange text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">
                  67+
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base">
                  {content.satisfiedPartners}
                </p>
              </div>
              
              <div className="border border-gray-800 rounded-lg p-3 sm:p-4 md:p-6 bg-idDarkBlack/50 text-center">
                <h3 className="text-idOrange text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">
                  98%
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base">
                  {content.approvalRate}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Image - Foto ampliada e melhor responsividade */}
          <div className="flex justify-center animate-on-scroll mt-6 lg:mt-0">
            <div className="relative">
              {/* Gradient Circle Background - foto ampliada em 1x (dobro do tamanho) */}
              <div className="w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[560px] md:h-[560px] lg:w-[600px] lg:h-[600px] rounded-full bg-gradient-to-br from-idOrange/30 to-idOrange/10 p-1">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-idOrange/20 to-transparent p-3 sm:p-4">
                  <img 
                    src="/lovable-uploads/de67c327-2a6e-4fb3-b59a-d1627b5a65b0.png" 
                    alt="CEO da Agência iD" 
                    className="w-full h-full rounded-full border-3 sm:border-4 border-idOrange/40 object-center object-cover" 
                  />
                </div>
              </div>
              
              {/* Floating Animation Effects - ajustados para novo tamanho */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 md:-top-6 md:-right-6 w-4 h-4 sm:w-6 sm:h-6 md:w-10 md:h-10 bg-idOrange/60 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-3 -left-3 sm:-bottom-5 sm:-left-5 md:-bottom-8 md:-left-8 w-6 h-6 sm:w-8 sm:h-8 md:w-16 md:h-16 bg-idOrange/40 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 -right-4 sm:-right-6 md:-right-10 w-3 h-3 sm:w-4 sm:h-4 md:w-8 md:h-8 bg-idOrange/50 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
