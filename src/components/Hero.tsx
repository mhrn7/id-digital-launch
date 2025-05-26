
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import HeroImage from '@/components/HeroImage';
import CounterAnimation from '@/components/CounterAnimation';

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

  const whatsappMessage = language === 'PT' 
    ? 'Olá! Vim pelo site da Agência iD e gostaria de saber mais sobre os serviços.'
    : 'Hello! I came from the iD Agency website and would like to know more about the services.';

  const whatsappLink = `https://wa.me/5561999601534?text=${encodeURIComponent(whatsappMessage)}`;

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

            {/* Animated Counter */}
            <div className="flex justify-center md:justify-start mt-12">
              <CounterAnimation 
                targetValue={800000}
                duration={5000}
                suffix=""
                label={language === 'PT' ? 'Gerenciados em Anúncios Online' : 'Managed in Online Ads'}
              />
            </div>
          </div>

          {/* Hero Image - Professional Photo */}
          <HeroImage />
        </div>
      </div>
    </section>
  );
};

export default Hero;
