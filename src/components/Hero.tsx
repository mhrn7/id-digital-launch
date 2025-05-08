
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
            <div className="relative">
              <svg 
                className="max-w-full h-auto w-80 md:w-96 animate-float" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Rocket Body */}
                <path d="M12.0001 1.89941C11.6601 1.89941 11.3301 2.03941 11.0801 2.28941C9.36005 4.00941 8.00005 5.91941 7.17005 7.91941C6.60005 9.45941 6.30005 10.9994 6.30005 12.5694C6.30005 13.8494 6.94005 17.2094 7.70005 19.9594C7.77005 20.1894 7.94005 20.3794 8.17005 20.4394C8.40005 20.4994 8.66005 20.4494 8.83005 20.2794L11.4001 17.7194C11.7501 17.3694 11.9401 16.8994 11.9401 16.4094V13.4994C11.9401 13.1594 12.2101 12.8894 12.5501 12.8894C12.8901 12.8894 13.1601 13.1594 13.1601 13.4994V16.4094C13.1601 16.9094 13.3501 17.3794 13.7001 17.7194L16.2701 20.2894C16.4401 20.4594 16.7001 20.5194 16.9301 20.4494C17.1601 20.3794 17.3301 20.1894 17.4001 19.9594C18.1601 17.2094 18.8001 13.8594 18.8001 12.5694C18.8001 9.38941 17.0001 5.61941 13.0201 2.31941C12.7601 2.02941 12.3801 1.89941 12.0001 1.89941Z" fill="#F97316"/>
                
                {/* Windows */}
                <path d="M10 8.5C10 7.67157 10.6716 7 11.5 7H12.5C13.3284 7 14 7.67157 14 8.5C14 9.32843 13.3284 10 12.5 10H11.5C10.6716 10 10 9.32843 10 8.5Z" fill="#F1F1F1"/>
                
                {/* Flames */}
                <path d="M8.5 21.4997C8.5 21.4997 8 21.9997 8 22.9997C8 23.9997 9 23.9997 9 23.9997C9 23.9997 9.5 23.9997 9.5 23.4997C9.5 22.9997 8.5 21.4997 8.5 21.4997Z" fill="#F97316"/>
                <path d="M12 21.4997C12 21.4997 11.5 21.9997 11.5 22.9997C11.5 23.9997 12.5 23.9997 12.5 23.9997C12.5 23.9997 13 23.9997 13 23.4997C13 22.9997 12 21.4997 12 21.4997Z" fill="#F97316"/>
                <path d="M15.5 21.4997C15.5 21.4997 15 21.9997 15 22.9997C15 23.9997 16 23.9997 16 23.9997C16 23.9997 16.5 23.9997 16.5 23.4997C16.5 22.9997 15.5 21.4997 15.5 21.4997Z" fill="#F97316"/>
                
                {/* Wings */}
                <path d="M5 10.9994C4.44 10.9994 3.89 11.0494 3.35 11.1494C2.95 11.2194 2.61 11.5394 2.51 11.9394C2.41 12.3394 2.57 12.7594 2.9 12.9994C3.95 13.7194 4.55 14.3594 4.86 14.7794C5.21 15.2594 5.39 15.8294 5.39 16.3994V17.7594C5.39 18.3094 5.84 18.7594 6.39 18.7594C6.94 18.7594 7.39 18.3094 7.39 17.7594V16.4094C7.39 15.2894 7.05 14.1894 6.39 13.2694C6.04 12.7794 5.55 12.2894 5 11.8394V10.9994Z" fill="#403E43"/>
                <path d="M19.0001 10.9994C19.5601 10.9994 20.1101 11.0494 20.6501 11.1494C21.0501 11.2194 21.3901 11.5394 21.4901 11.9394C21.5901 12.3394 21.4301 12.7594 21.1001 12.9994C20.0501 13.7194 19.4501 14.3594 19.1401 14.7794C18.7901 15.2594 18.6101 15.8294 18.6101 16.3994V17.7594C18.6101 18.3094 18.1601 18.7594 17.6101 18.7594C17.0601 18.7594 16.6101 18.3094 16.6101 17.7594V16.4094C16.6101 15.2894 16.9501 14.1894 17.6101 13.2694C17.9601 12.7794 18.4501 12.2894 19.0001 11.8394V10.9994Z" fill="#403E43"/>
              </svg>
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
