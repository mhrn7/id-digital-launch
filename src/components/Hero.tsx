
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

          {/* Profile Image with Circle Background - Amplified to 1.5x */}
          <div className="flex justify-center animate-on-scroll">
            <div className="relative">
              {/* Gradient Circle Background - amplified sizing: 1.5x larger */}
              <div className="w-[420px] h-[420px] md:w-[720px] md:h-[720px] rounded-full bg-gradient-to-br from-idOrange/30 to-idOrange/10 p-1">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-idOrange/20 to-transparent p-4">
                  <img 
                    alt="CEO da Agência iD" 
                    src="/lovable-uploads/8d4d30ab-5727-457d-b2d3-7126e30162f6.png" 
                    className="w-full h-full rounded-full border-4 border-idOrange/40 object-cover object-center" 
                  />
                </div>
              </div>
              
              {/* Floating Animation Effects - adjusted positions for amplified sizing */}
              <div className="absolute -top-4 -right-4 md:-top-8 md:-right-8 w-8 h-8 md:w-12 md:h-12 bg-idOrange/60 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 md:-bottom-12 md:-left-12 w-10 h-10 md:w-20 md:h-20 bg-idOrange/40 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 -right-7 md:-right-14 w-6 h-6 md:w-10 md:h-10 bg-idOrange/50 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
