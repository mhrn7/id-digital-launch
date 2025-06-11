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
          heroTitle: <>We are specialists in <span className="text-idOrange">boosting businesses</span> in the digital world.</>,
          heroDescription: 'Digital marketing strategies focused on results and cutting-edge AI technology to accelerate your company\'s growth.',
          requestProposal: 'I Want to Start Scaling My Business',
          ourServices: 'Our Services',
          managedInAds: 'Managed in Ads',
          satisfiedPartners: 'Satisfied Partners',
          approvalRate: 'Approval Rate'
        };
      case 'ES':
        return {
          heroTitle: <>Somos especialistas en <span className="text-idOrange">impulsar negocios</span> en el mundo digital.</>,
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
          heroTitle: <>Somos especialistas em <span className="text-idOrange">impulsionar negócios</span> no digital.</>,
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
  return <section id="home" className="relative min-h-screen flex items-center pt-16 md:pt-20 bg-idBlack overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-idOrange/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-idOrange/15 rounded-full blur-[120px]"></div>
      </div>

      <div className="container-custom relative z-10 py-8 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Hero Content */}
          <div className="animate-on-scroll order-2 lg:order-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 leading-tight">
              {content.heroTitle}
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-gray-300 max-w-xl">
              {content.heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <a href="#contact">
                <Button className="btn-primary text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 w-full sm:w-auto">
                  {content.requestProposal}
                </Button>
              </a>
              <a href="#services">
                <Button variant="outline" className="btn-outline text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 w-full sm:w-auto">
                  {content.ourServices}
                </Button>
              </a>
            </div>

            {/* Stats - Multiple Counters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-8 md:mt-12">
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

          {/* Profile Image with Circle Background - Reduced from 1.5x to 0.5x */}
          <div className="flex justify-center animate-on-scroll order-1 lg:order-2">
            <div className="relative">
              {/* Gradient Circle Background - reduced sizing */}
              <div className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px] lg:w-[480px] lg:h-[480px] rounded-full bg-gradient-to-br from-idOrange/30 to-idOrange/10 p-1">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-idOrange/20 to-transparent p-2 sm:p-3 md:p-4">
                  <img alt="CEO da Agência iD" src="/lovable-uploads/8d4d30ab-5727-457d-b2d3-7126e30162f6.png" className="w-full h-full rounded-full border-2 sm:border-3 md:border-4 border-idOrange/40 object-center object-scale-down" />
                </div>
              </div>
              
              {/* Floating Animation Effects - adjusted positions for reduced sizing */}
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 md:-top-4 md:-right-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-idOrange/60 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 md:-bottom-6 md:-left-6 w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 bg-idOrange/40 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 -right-3 sm:-right-4 md:-right-7 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 bg-idOrange/50 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;