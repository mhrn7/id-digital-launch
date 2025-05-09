
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface ServiceDetailsProps {
  title: string;
  details: string[];
  isActive: boolean;
}

const ServiceDetails = ({ title, details, isActive }: ServiceDetailsProps) => {
  return (
    <div 
      className={`mt-4 overflow-hidden transition-all duration-300 ease-in-out ${
        isActive ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <h4 className="text-lg font-semibold mb-2 text-idOrange">{title}</h4>
      <ul className="space-y-2">
        {details.map((detail, idx) => (
          <li key={idx} className="flex items-start">
            <svg className="w-5 h-5 text-idOrange mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
            </svg>
            <span className="text-gray-300">{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
  isExpanded: boolean;
  onClick: () => void;
}

const ServiceCard = ({ title, description, icon, details, isExpanded, onClick }: ServiceCardProps) => {
  return (
    <div 
      className={`bg-gradient-to-br from-idDarkBlack to-black p-6 rounded-lg border transition-all duration-300 cursor-pointer animate-on-scroll ${
        isExpanded 
          ? 'border-idOrange shadow-lg shadow-idOrange/20' 
          : 'border-gray-800 hover:border-idOrange/50 hover:shadow-lg hover:shadow-idOrange/10'
      }`}
      onClick={onClick}
    >
      <div className={`w-14 h-14 bg-idOrange/10 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 ${
        isExpanded ? 'bg-idOrange/30' : 'group-hover:bg-idOrange/20'
      }`}>
        {icon}
      </div>
      <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
        isExpanded ? 'text-idOrange' : 'text-white group-hover:text-idOrange'
      }`}>
        {title}
      </h3>
      <p className="text-gray-400">{description}</p>
      
      <ServiceDetails 
        title={`Detalhes sobre ${title}`}
        details={details}
        isActive={isExpanded}
      />
    </div>
  );
};

const Services = () => {
  const [language, setLanguage] = useState('PT');
  const [activeService, setActiveService] = useState<number | null>(null);

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
  
  const handleServiceClick = (index: number) => {
    if (activeService === index) {
      setActiveService(null);
    } else {
      setActiveService(index);
    }
  };

  const services = [
    {
      title: language === 'PT' ? 'Gestão de Tráfego Pago Estratégico' : 'Strategic Paid Traffic Management',
      description: language === 'PT' 
        ? 'Estratégias otimizadas para plataformas digitais com foco em conversão e ROI.' 
        : 'Optimized strategies for digital platforms focused on conversion and ROI.',
      icon: (
        <svg className="w-8 h-8 text-idOrange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      details: language === 'PT' 
        ? [
            'Campanhas otimizadas para busca, display e remarketing com foco em conversão',
            'Anúncios no Google Ads com estratégias avançadas de segmentação',
            'Campanhas para Facebook Ads com maximização de orçamento e resultados',
            'Instagram Ads visualmente impactantes para engajar seu público-alvo',
            'TikTok Ads focados em conteúdos virais e alto engajamento',
            'LinkedIn Ads direcionados para profissionais qualificados e decisores'
          ]
        : [
            'Optimized campaigns for search, display and remarketing focused on conversion',
            'Google Ads with advanced targeting strategies',
            'Facebook Ads campaigns with budget and results maximization',
            'Visually impactful Instagram Ads to engage your target audience',
            'TikTok Ads focused on viral content and high engagement',
            'LinkedIn Ads targeted at qualified professionals and decision makers'
          ]
    },
    {
      title: language === 'PT' ? 'Automação com IA' : 'AI Automation',
      description: language === 'PT' 
        ? 'Soluções inteligentes para automatizar processos e melhorar a experiência do cliente.' 
        : 'Intelligent solutions to automate processes and improve customer experience.',
      icon: (
        <svg className="w-8 h-8 text-idOrange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      details: language === 'PT' 
        ? [
            'Chatbots inteligentes para atendimento 24/7 ao cliente',
            'Assistentes virtuais para qualificação de leads',
            'Automação de respostas em redes sociais e e-mail',
            'Análise preditiva de comportamento do cliente',
            'Personalização automatizada da experiência do usuário',
            'Integração com CRM e outras plataformas de gestão'
          ]
        : [
            'Intelligent chatbots for 24/7 customer service',
            'Virtual assistants for lead qualification',
            'Automated responses on social media and email',
            'Predictive analysis of customer behavior',
            'Automated customization of user experience',
            'Integration with CRM and other management platforms'
          ]
    },
    {
      title: language === 'PT' ? 'Criação de Sites e Landing Pages' : 'Website and Landing Page Creation',
      description: language === 'PT' 
        ? 'Desenvolvimento de páginas otimizadas para conversão e experiência do usuário.' 
        : 'Development of pages optimized for conversion and user experience.',
      icon: (
        <svg className="w-8 h-8 text-idOrange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      details: language === 'PT' 
        ? [
            'Design responsivo para todos os dispositivos',
            'Otimização para SEO e carregamento rápido',
            'Landing pages de alta conversão',
            'Funis de vendas otimizados',
            'Integração com sistemas de pagamento e CRM',
            'Análise contínua e otimização baseada em dados'
          ]
        : [
            'Responsive design for all devices',
            'SEO optimization and fast loading',
            'High conversion landing pages',
            'Optimized sales funnels',
            'Integration with payment systems and CRM',
            'Continuous analysis and data-based optimization'
          ]
    },
    {
      title: language === 'PT' ? 'Marketing de Conteúdo' : 'Content Marketing',
      description: language === 'PT' 
        ? 'Estratégias de conteúdo para engajar, educar e converter sua audiência.' 
        : 'Content strategies to engage, educate and convert your audience.',
      icon: (
        <svg className="w-8 h-8 text-idOrange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      ),
      details: language === 'PT' 
        ? [
            'Criação de conteúdos virais para TikTok',
            'Estratégias de conteúdo para Instagram e Facebook',
            'Artigos e posts otimizados para LinkedIn',
            'Campanhas de email marketing personalizadas',
            'Produção de vídeos e podcasts',
            'Análise de engajamento e ajuste contínuo de estratégia'
          ]
        : [
            'Creation of viral content for TikTok',
            'Content strategies for Instagram and Facebook',
            'Articles and posts optimized for LinkedIn',
            'Personalized email marketing campaigns',
            'Video and podcast production',
            'Engagement analysis and continuous strategy adjustment'
          ]
    }
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
          <p className="text-sm text-gray-400 mt-4 animate-on-scroll">
            {language === 'PT' 
              ? 'Clique nos cards para saber mais sobre cada serviço'
              : 'Click on the cards to learn more about each service'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              details={service.details}
              isExpanded={activeService === index}
              onClick={() => handleServiceClick(index)}
            />
          ))}
        </div>

        <div className="mt-16 text-center animate-on-scroll">
          <a 
            href={`https://wa.me/5561999601534?text=${encodeURIComponent(
              language === 'PT' 
                ? 'Olá! Vim pelo site da Agência iD e gostaria de saber mais sobre os serviços.'
                : 'Hello! I came from the iD Agency website and would like to know more about the services.'
            )}`}
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button className="btn-primary text-lg px-8 py-6">
              {language === 'PT' ? 'Solicite uma Análise Gratuita' : 'Request a Free Analysis'}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
