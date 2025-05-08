
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ServiceCard = ({ title, description, icon }: ServiceCardProps) => {
  return (
    <div className="bg-gradient-to-br from-idDarkBlack to-black p-6 rounded-lg border border-gray-800 transition-all duration-300 hover:border-idOrange/50 hover:shadow-lg hover:shadow-idOrange/10 group animate-on-scroll">
      <div className="w-14 h-14 bg-idOrange/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-idOrange/20 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-idOrange transition-colors duration-300">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const Services = () => {
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
  
  const services = [
    {
      title: language === 'PT' ? 'Google Ads' : 'Google Ads',
      description: language === 'PT' 
        ? 'Campanhas otimizadas para busca, display e remarketing com foco em conversão e ROI.' 
        : 'Optimized campaigns for search, display and remarketing focused on conversion and ROI.',
      icon: (
        <svg className="w-8 h-8 text-idOrange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    {
      title: language === 'PT' ? 'Google Meu Negócio' : 'Google My Business',
      description: language === 'PT' 
        ? 'Otimização e gestão completa da sua presença local para atrair mais clientes próximos.' 
        : 'Complete optimization and management of your local presence to attract more nearby customers.',
      icon: (
        <svg className="w-8 h-8 text-idOrange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: language === 'PT' ? 'Instagram Ads' : 'Instagram Ads',
      description: language === 'PT' 
        ? 'Anúncios visualmente impactantes para engajar seu público-alvo e aumentar seguidores.' 
        : 'Visually impactful ads to engage your target audience and increase followers.',
      icon: (
        <svg className="w-8 h-8 text-idOrange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: language === 'PT' ? 'Facebook Ads' : 'Facebook Ads',
      description: language === 'PT' 
        ? 'Estratégias avançadas de segmentação para maximizar seu orçamento e resultados.' 
        : 'Advanced targeting strategies to maximize your budget and results.',
      icon: (
        <svg className="w-8 h-8 text-idOrange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      )
    },
    {
      title: language === 'PT' ? 'TikTok Ads' : 'TikTok Ads',
      description: language === 'PT' 
        ? 'Criação de conteúdos virais e campanhas para a plataforma que mais cresce no mundo.' 
        : 'Creation of viral content and campaigns for the fastest growing platform in the world.',
      icon: (
        <svg className="w-8 h-8 text-idOrange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      )
    },
    {
      title: language === 'PT' ? 'LinkedIn Ads' : 'LinkedIn Ads',
      description: language === 'PT' 
        ? 'Alcance profissionais qualificados e decisores de negócios com campanhas direcionadas.' 
        : 'Reach qualified professionals and business decision-makers with targeted campaigns.',
      icon: (
        <svg className="w-8 h-8 text-idOrange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: language === 'PT' ? 'Landing Pages' : 'Landing Pages',
      description: language === 'PT' 
        ? 'Criação de páginas de alta conversão focadas em transformar visitantes em leads e clientes.' 
        : 'Creating high-conversion pages focused on turning visitors into leads and customers.',
      icon: (
        <svg className="w-8 h-8 text-idOrange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: language === 'PT' ? 'Agentes com IA' : 'AI Agents',
      description: language === 'PT' 
        ? 'Chatbots e assistentes inteligentes para automação de atendimento e qualificação de leads.' 
        : 'Chatbots and intelligent assistants for automated customer service and lead qualification.',
      icon: (
        <svg className="w-8 h-8 text-idOrange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
  ];

  return (
    <section id="services" className="section-padding bg-black">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-on-scroll">
            {language === 'PT' ? 'Nossos Serviços' : 'Our Services'}
            <span className="block w-20 h-1 bg-idOrange mx-auto mt-4"></span>
          </h2>
          <p className="text-lg text-gray-300 animate-on-scroll">
            {language === 'PT' 
              ? 'Oferecemos soluções completas de marketing digital para impulsionar o crescimento do seu negócio.'
              : 'We offer complete digital marketing solutions to drive your business growth.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>

        <div className="mt-16 text-center animate-on-scroll">
          <Button className="btn-primary text-lg px-8 py-6">
            {language === 'PT' ? 'Solicite uma Análise Gratuita' : 'Request a Free Analysis'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
