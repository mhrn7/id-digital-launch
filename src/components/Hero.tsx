
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [language, setLanguage] = useState('PT');
  const [count, setCount] = useState(0);

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

    // Animate counter
    const duration = 5000; // 5 seconds
    const targetValue = 700000;
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

  const whatsappMessage = language === 'PT' 
    ? 'Olá! Vim pelo site da Agência iD e gostaria de saber mais sobre os serviços.'
    : 'Hello! I came from the iD Agency website and would like to know more about the services.';

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
              <a 
                href={whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button className="btn-primary">
                  {language === 'PT' ? 'Solicite uma Proposta' : 'Request a Proposal'}
                </Button>
              </a>
              <a href="#services">
                <Button variant="outline" className="btn-outline">
                  {language === 'PT' ? 'Conheça Nossos Serviços' : 'Our Services'}
                </Button>
              </a>
            </div>

            {/* Stats - Single Counter */}
            <div className="flex justify-center lg:justify-start mt-12">
              <div className="border border-gray-800 rounded-lg p-6 bg-idDarkBlack/50 text-center max-w-xs">
                <h3 className="text-idOrange text-4xl font-bold mb-2">
                  {formatNumber(count)}
                </h3>
                <p className="text-gray-400">
                  {language === 'PT' ? 'Gerenciados em Anúncios' : 'Managed in Ads'}
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced 3D Rocket */}
          <div className="flex justify-center animate-on-scroll">
            <div className="relative w-full max-w-md">
              <svg 
                className="w-full h-auto animate-float" 
                viewBox="0 0 400 500" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Enhanced Rocket Glow Effect */}
                <ellipse cx="200" cy="360" rx="140" ry="50" fill="url(#enhancedRocketGlow)" opacity="0.8" />
                
                {/* Rocket Body Group with 3D Effects */}
                <g>
                  {/* Rocket Base with 3D depth */}
                  <path d="M175 320H225V385C225 397.15 215.15 407 203 407H197C184.85 407 175 397.15 175 385V320Z" fill="url(#baseGradient)" />
                  <path d="M175 320H225V330H175Z" fill="url(#baseTopGradient)" />
                  
                  {/* Main Rocket Body with enhanced 3D */}
                  <path d="M155 115V320H245V115C245 70 225 25 200 15C175 25 155 70 155 115Z" fill="url(#bodyGradient)" />
                  
                  {/* Side panels for 3D effect */}
                  <path d="M245 115V320C245 320 275 300 275 210C275 150 255 105 245 115Z" fill="url(#sideGradientRight)" />
                  <path d="M155 115V320C155 320 125 300 125 210C125 150 175 105 155 115Z" fill="url(#sideGradientLeft)" />
                  
                  {/* Enhanced Nose Cone */}
                  <path d="M200 15C225 25 245 70 245 115H155C155 70 175 25 200 15Z" fill="url(#noseGradient)" />
                  <path d="M245 115C245 115 235 85 200 75C200 75 225 85 245 115Z" fill="url(#noseHighlight)" />
                  
                  {/* Enhanced Windows with depth */}
                  <circle cx="200" cy="160" r="30" fill="url(#windowOuter)" />
                  <circle cx="200" cy="160" r="25" fill="url(#windowInner)" stroke="#B0B0B0" strokeWidth="2" />
                  <circle cx="200" cy="160" r="15" fill="url(#windowGlass)" />
                  <circle cx="195" cy="155" r="8" fill="rgba(255,255,255,0.6)" />
                  
                  {/* Detailed Panel Lines */}
                  <rect x="165" y="220" width="70" height="4" fill="url(#panelGradient)" rx="2" />
                  <rect x="165" y="240" width="70" height="4" fill="url(#panelGradient)" rx="2" />
                  <rect x="165" y="260" width="70" height="4" fill="url(#panelGradient)" rx="2" />
                  <rect x="165" y="280" width="70" height="4" fill="url(#panelGradient)" rx="2" />
                  
                  {/* Enhanced Side Thrusters */}
                  <rect x="130" y="300" width="25" height="45" fill="url(#thrusterGradient)" rx="5" />
                  <rect x="245" y="300" width="25" height="45" fill="url(#thrusterGradient)" rx="5" />
                  
                  {/* Enhanced Fins with 3D depth */}
                  <path d="M145 320L100 380V320H145Z" fill="url(#finGradient)" />
                  <path d="M255 320L300 380V320H255Z" fill="url(#finGradient)" />
                  <path d="M145 320L100 380L105 375L145 325Z" fill="url(#finHighlight)" />
                  <path d="M255 320L300 380L295 375L255 325Z" fill="url(#finHighlight)" />
                  
                  {/* Enhanced Engine Details */}
                  <rect x="175" y="385" width="50" height="22" fill="url(#engineGradient)" rx="3" />
                  <circle cx="185" cy="396" r="4" fill="#FF6B35" />
                  <circle cx="200" cy="396" r="4" fill="#FF6B35" />
                  <circle cx="215" cy="396" r="4" fill="#FF6B35" />
                  
                  {/* Enhanced Engine Flames */}
                  <g className="animate-pulse">
                    <path d="M185 407H215C215 407 230 445 200 465C170 445 185 407 185 407Z" fill="url(#flameGradientEnhanced)" />
                    <path d="M188 407H212C212 407 223 430 200 450C177 430 188 407 188 407Z" fill="url(#flameGradientInnerEnhanced)" />
                    <path d="M192 407H208C208 407 215 420 200 435C185 420 192 407 192 407Z" fill="url(#flameCoreGradient)" />
                  </g>
                  
                  {/* Side Thruster Flames */}
                  <g className="animate-pulse">
                    <path d="M140 345H150C150 345 158 370 145 385C132 370 140 345 140 345Z" fill="url(#sideThrusterFlame)" />
                    <path d="M250 345H260C260 345 268 370 255 385C242 370 250 345 250 345Z" fill="url(#sideThrusterFlame)" />
                  </g>
                  
                  {/* Enhanced 3D Highlights */}
                  <path d="M155 115C155 115 175 130 200 130C225 130 245 115 245 115C245 115 225 135 200 135C175 135 155 115 155 115Z" fill="rgba(255,255,255,0.4)" />
                  <rect x="180" y="180" width="40" height="2" fill="rgba(255,255,255,0.3)" rx="1" />
                  <rect x="180" y="200" width="40" height="2" fill="rgba(255,255,255,0.3)" rx="1" />
                </g>
                
                {/* Enhanced Stars with twinkling effect */}
                <g className="animate-pulse-slow">
                  <circle cx="90" cy="90" r="2.5" fill="white" opacity="0.9" />
                  <circle cx="140" cy="70" r="1.5" fill="white" opacity="0.7" />
                  <circle cx="260" cy="95" r="2" fill="white" opacity="0.8" />
                  <circle cx="310" cy="140" r="1.5" fill="white" opacity="0.6" />
                  <circle cx="110" cy="190" r="2.5" fill="white" opacity="0.9" />
                  <circle cx="290" cy="210" r="2" fill="white" opacity="0.8" />
                  <circle cx="340" cy="270" r="1.5" fill="white" opacity="0.7" />
                  <circle cx="80" cy="290" r="2" fill="white" opacity="0.8" />
                  <circle cx="320" cy="320" r="1.5" fill="white" opacity="0.6" />
                </g>
                
                {/* Enhanced Gradients definitions */}
                <defs>
                  <radialGradient id="enhancedRocketGlow" cx="0.5" cy="0.5" r="0.7" fx="0.3" fy="0.3">
                    <stop offset="0%" stopColor="#F97316" stopOpacity="0.9" />
                    <stop offset="70%" stopColor="#F97316" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
                  </radialGradient>
                  
                  <linearGradient id="bodyGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FB923C" />
                    <stop offset="50%" stopColor="#F97316" />
                    <stop offset="100%" stopColor="#EA580C" />
                  </linearGradient>
                  
                  <linearGradient id="sideGradientRight" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#EA580C" />
                    <stop offset="100%" stopColor="#DC2626" />
                  </linearGradient>
                  
                  <linearGradient id="sideGradientLeft" x1="1" y1="0" x2="0" y2="0">
                    <stop offset="0%" stopColor="#FB923C" />
                    <stop offset="100%" stopColor="#F97316" />
                  </linearGradient>
                  
                  <linearGradient id="noseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FDBA74" />
                    <stop offset="100%" stopColor="#F97316" />
                  </linearGradient>
                  
                  <linearGradient id="baseGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#DC2626" />
                    <stop offset="50%" stopColor="#EA580C" />
                    <stop offset="100%" stopColor="#DC2626" />
                  </linearGradient>
                  
                  <radialGradient id="windowOuter" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0%" stopColor="#E5E7EB" />
                    <stop offset="100%" stopColor="#9CA3AF" />
                  </radialGradient>
                  
                  <radialGradient id="windowInner" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0%" stopColor="#F9FAFB" />
                    <stop offset="100%" stopColor="#D1D5DB" />
                  </radialGradient>
                  
                  <radialGradient id="windowGlass" cx="0.3" cy="0.3" r="0.7">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                    <stop offset="100%" stopColor="rgba(156,163,175,0.8)" />
                  </radialGradient>
                  
                  <linearGradient id="flameGradientEnhanced" x1="200" y1="407" x2="200" y2="465">
                    <stop offset="0%" stopColor="#FBBF24" />
                    <stop offset="30%" stopColor="#F59E0B" />
                    <stop offset="70%" stopColor="#F97316" />
                    <stop offset="100%" stopColor="#DC2626" />
                  </linearGradient>
                  
                  <linearGradient id="flameGradientInnerEnhanced" x1="200" y1="407" x2="200" y2="450">
                    <stop offset="0%" stopColor="white" />
                    <stop offset="40%" stopColor="#FEF3C7" />
                    <stop offset="80%" stopColor="#FBBF24" />
                    <stop offset="100%" stopColor="#F97316" />
                  </linearGradient>
                  
                  <linearGradient id="flameCoreGradient" x1="200" y1="407" x2="200" y2="435">
                    <stop offset="0%" stopColor="white" />
                    <stop offset="60%" stopColor="#FEF3C7" />
                    <stop offset="100%" stopColor="#FBBF24" />
                  </linearGradient>
                  
                  <linearGradient id="thrusterGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6B7280" />
                    <stop offset="50%" stopColor="#9CA3AF" />
                    <stop offset="100%" stopColor="#6B7280" />
                  </linearGradient>
                  
                  <linearGradient id="finGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F97316" />
                    <stop offset="100%" stopColor="#EA580C" />
                  </linearGradient>
                  
                  <linearGradient id="sideThrusterFlame" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FBBF24" />
                    <stop offset="100%" stopColor="#F97316" />
                  </linearGradient>
                  
                  <linearGradient id="engineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4B5563" />
                    <stop offset="100%" stopColor="#374151" />
                  </linearGradient>
                  
                  <linearGradient id="panelGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#DC2626" />
                    <stop offset="50%" stopColor="#EA580C" />
                    <stop offset="100%" stopColor="#DC2626" />
                  </linearGradient>
                  
                  <linearGradient id="noseHighlight" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                  </linearGradient>
                  
                  <linearGradient id="baseTopGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#F97316" />
                    <stop offset="50%" stopColor="#FB923C" />
                    <stop offset="100%" stopColor="#F97316" />
                  </linearGradient>
                  
                  <linearGradient id="finHighlight" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Enhanced glow effects */}
              <div className="absolute -inset-6 bg-idOrange/15 rounded-full blur-2xl -z-10 animate-pulse-slow"></div>
              <div className="absolute -bottom-8 left-0 right-0 h-24 bg-gradient-to-t from-idBlack via-idBlack/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
