
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
            <div className="relative w-full max-w-md">
              <svg 
                className="w-full h-auto animate-float" 
                viewBox="0 0 400 500" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Rocket Glow Effect */}
                <ellipse cx="200" cy="350" rx="120" ry="40" fill="url(#rocketGlow)" opacity="0.6" />
                
                {/* Rocket Body Group */}
                <g>
                  {/* Rocket Base */}
                  <path d="M180 320H220V380C220 391.046 211.046 400 200 400C188.954 400 180 391.046 180 380V320Z" fill="#E27112" />
                  
                  {/* Rocket Main Body */}
                  <path d="M160 120V320H240V120C240 80 220 40 200 30C180 40 160 80 160 120Z" fill="#F97316" />
                  <path d="M240 120V320C240 320 270 300 270 220C270 160 250 110 240 120Z" fill="#EA580C" />
                  <path d="M160 120V320C160 320 130 300 130 220C130 160 150 110 160 120Z" fill="#FB923C" />
                  
                  {/* Rocket Nose Cone */}
                  <path d="M200 30C220 40 240 80 240 120H160C160 80 180 40 200 30Z" fill="#F97316" />
                  <path d="M240 120C240 120 230 90 200 80C200 80 220 90 240 120Z" fill="#EA580C" />
                  
                  {/* Windows */}
                  <circle cx="200" cy="160" r="25" fill="#F1F1F1" />
                  <circle cx="200" cy="160" r="20" fill="#FAFAFA" stroke="#E4E4E7" strokeWidth="2" />
                  <circle cx="200" cy="160" r="12" fill="#E4E4E7" />
                  
                  {/* Detailed Lines */}
                  <path d="M170 220H230" stroke="#EA580C" strokeWidth="3" />
                  <path d="M170 240H230" stroke="#EA580C" strokeWidth="3" />
                  <path d="M170 260H230" stroke="#EA580C" strokeWidth="3" />
                  
                  {/* Side Thrusters */}
                  <rect x="140" y="300" width="20" height="40" fill="#D4D4D8" />
                  <rect x="240" y="300" width="20" height="40" fill="#D4D4D8" />
                  
                  {/* Fins */}
                  <path d="M150 320L110 370V320H150Z" fill="#F97316" />
                  <path d="M250 320L290 370V320H250Z" fill="#F97316" />
                  <path d="M150 320L110 370V320Z" fill="#EA580C" stroke="#EA580C" strokeWidth="2" />
                  <path d="M250 320L290 370V320Z" fill="#EA580C" stroke="#EA580C" strokeWidth="2" />
                  
                  {/* Bottom Details */}
                  <path d="M180 380V400H220V380H180Z" fill="#D4D4D8" />
                  
                  {/* Engine Flames - Main */}
                  <g className="animate-pulse">
                    <path d="M190 400H210C210 400 220 430 200 450C180 430 190 400 190 400Z" fill="url(#flameGradient)" />
                    <path d="M192 400H208C208 400 215 420 200 435C185 420 192 400 192 400Z" fill="url(#flameGradientInner)" />
                  </g>
                  
                  {/* Engine Flames - Side Thrusters */}
                  <g className="animate-pulse">
                    <path d="M145 340H155C155 340 160 360 150 370C140 360 145 340 145 340Z" fill="url(#flameGradient)" />
                    <path d="M245 340H255C255 340 260 360 250 370C240 360 245 340 245 340Z" fill="url(#flameGradient)" />
                  </g>
                  
                  {/* 3D Highlights */}
                  <path d="M160 120C160 120 180 135 200 135C220 135 240 120 240 120C240 120 220 140 200 140C180 140 160 120 160 120Z" fill="white" fillOpacity="0.3" />
                </g>
                
                {/* Stars */}
                <g className="animate-pulse-slow">
                  <circle cx="100" cy="100" r="2" fill="white" />
                  <circle cx="150" cy="80" r="1" fill="white" />
                  <circle cx="250" cy="100" r="1.5" fill="white" />
                  <circle cx="300" cy="150" r="1" fill="white" />
                  <circle cx="120" cy="200" r="2" fill="white" />
                  <circle cx="280" cy="220" r="1.5" fill="white" />
                  <circle cx="330" cy="280" r="1" fill="white" />
                  <circle cx="100" cy="300" r="1.5" fill="white" />
                </g>
                
                {/* Gradients definitions */}
                <defs>
                  <radialGradient id="rocketGlow" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
                    <stop offset="0%" stopColor="#F97316" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="flameGradient" x1="200" y1="400" x2="200" y2="450" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FDBA74" />
                    <stop offset="50%" stopColor="#F97316" />
                    <stop offset="100%" stopColor="#EA580C" />
                  </linearGradient>
                  <linearGradient id="flameGradientInner" x1="200" y1="400" x2="200" y2="435" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="white" />
                    <stop offset="40%" stopColor="#FDBA74" />
                    <stop offset="100%" stopColor="#F97316" />
                  </linearGradient>
                </defs>
              </svg>
              
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
