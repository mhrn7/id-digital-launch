
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

          {/* Hero Rocket 3D Image */}
          <div className="flex justify-center animate-on-scroll">
            <div className="relative">
              {/* Enhanced 3D Rocket */}
              <svg 
                className="max-w-full h-auto w-80 md:w-96 animate-float" 
                viewBox="0 0 200 300" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Rocket Body */}
                <g transform="translate(50, 20)">
                  {/* Rocket Main Body */}
                  <path d="M50 0C40 0 30 10 30 30C30 80 50 170 50 170C50 170 70 80 70 30C70 10 60 0 50 0Z" fill="#F97316" />
                  
                  {/* Rocket Window */}
                  <circle cx="50" cy="50" r="10" fill="#F1F1F1" />
                  <circle cx="50" cy="50" r="7" fill="#E4E4E7" />
                  
                  {/* Rocket Fins */}
                  <path d="M30 120L0 150L0 100L30 120Z" fill="#403E43" />
                  <path d="M70 120L100 150L100 100L70 120Z" fill="#403E43" />
                  
                  {/* Rocket Bottom */}
                  <path d="M30 170L40 200L50 170L60 200L70 170C70 170 65 175 50 175C35 175 30 170 30 170Z" fill="#F97316" />
                  
                  {/* Rocket Flames */}
                  <g className="animate-pulse">
                    <path d="M35 175L25 220C25 220 30 210 35 205C40 200 45 200 50 200C55 200 60 200 65 205C70 210 75 220 75 220L65 175" fill="#FDBA74" />
                    <path d="M40 175L35 210C35 210 40 205 45 200C47 198 49 198 50 198C51 198 53 198 55 200C60 205 65 210 65 210L60 175" fill="#F97316" />
                  </g>
                  
                  {/* Rocket Details */}
                  <path d="M40 80L60 80" stroke="#F97316" strokeWidth="2" />
                  <path d="M35 90L65 90" stroke="#F97316" strokeWidth="2" />
                  <path d="M35 100L65 100" stroke="#F97316" strokeWidth="2" />
                  
                  {/* 3D Shadow Effect */}
                  <path d="M50 0C45 0 40 5 35 15C35 15 55 10 65 15C60 5 55 0 50 0Z" fill="#FB923C" />
                  <path d="M70 30C70 10 60 0 50 0C60 0 65 10 65 30C65 80 50 170 50 170C50 170 70 80 70 30Z" fill="#EA580C" opacity="0.5" />
                </g>
                
                {/* Stars Background */}
                <circle cx="20" cy="40" r="2" fill="white" opacity="0.8" />
                <circle cx="180" cy="60" r="1.5" fill="white" opacity="0.6" />
                <circle cx="160" cy="160" r="2" fill="white" opacity="0.7" />
                <circle cx="30" cy="180" r="1" fill="white" opacity="0.5" />
                <circle cx="150" cy="30" r="1.5" fill="white" opacity="0.6" />
                <circle cx="40" cy="120" r="1" fill="white" opacity="0.5" />
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
