import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from './LanguageProvider';

interface ServiceDetailsProps {
  details: string[];
}

const ServiceDetails = ({ details }: ServiceDetailsProps) => {
  return (
    <div className="mt-4">
      <ul className="space-y-3">
        {details.map((detail, idx) => (
          <li key={idx} className="flex items-start">
            <svg className="w-4 h-4 text-idOrange mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
            </svg>
            <span className="text-gray-300 text-sm leading-relaxed">{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface ServiceItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
  value: string;
  ctaText: string;
}

const ServiceItem = ({ title, description, icon, details, value, ctaText }: ServiceItemProps) => {
  return (
    <AccordionItem value={value} className="border border-gray-800 rounded-lg mb-4 overflow-hidden">
      <AccordionTrigger className="bg-gradient-to-br from-idDarkBlack to-black p-6 hover:no-underline hover:bg-gradient-to-br hover:from-idDarkBlack/80 hover:to-black/80 transition-all duration-300 [&[data-state=open]]:border-b [&[data-state=open]]:border-gray-800">
        <div className="flex items-start text-left w-full">
          <div className="w-12 h-12 bg-idOrange/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 transition-all duration-300 group-hover:bg-idOrange/20">
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg md:text-xl font-bold mb-2 text-white group-hover:text-idOrange transition-colors duration-300">
              {title}
            </h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed pr-4">{description}</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="bg-gradient-to-br from-idDarkBlack to-black px-6 pb-6">
        <ServiceDetails details={details} />
        <div className="mt-6 pt-4 border-t border-gray-800">
          <a href="#contact">
            <Button className="btn-primary w-full">
              {ctaText}
            </Button>
          </a>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

const Services = () => {
  const { language } = useLanguage();

  useEffect(() => {
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

  const getContent = () => {
    switch (language) {
      case 'EN':
        return {
          title: 'Our Services',
          description: 'Complete digital marketing solutions that generate real results for your business.',
          requestAnalysis: 'I Want to Receive a Proposal',
          wantService: 'I Want to Receive a Proposal',
          services: [
            {
              title: 'Ads That Generate Sales and Qualified Leads',
              description: 'Strategic paid traffic management focused on conversion and measurable results.',
              details: [
                'Google Ads campaigns that generate qualified clicks and more sales',
                'Smart targeting for search, display and remarketing with total focus on conversion',
                'Facebook Ads with strategies that make the most of every cent of your budget',
                'Ads created to reach the right people and generate real results',
                'Instagram Ads that grab attention and connect with your audience',
                'Impactful visual creations to increase engagement and attract new customers',
                'TikTok Ads with engaging content that goes viral',
                'Creative and high-impact campaigns to reach thousands of people at low cost',
                'LinkedIn Ads for decision makers',
                'Strategic ads focused on qualified professionals and decision makers'
              ]
            },
            {
              title: 'AI Automation That Works 24/7',
              description: 'Intelligent solutions to automate processes and improve customer experience.',
              details: [
                'Intelligent chatbots for 24/7 customer service',
                'Virtual assistants for lead qualification',
                'Automated responses on social media and email',
                'Predictive analysis of customer behavior',
                'Automated customization of user experience',
                'Integration with CRM and other management platforms'
              ]
            },
            {
              title: 'Landing Pages That Convert Into Customers',
              description: 'Pages optimized for conversion and user experience that generate results.',
              details: [
                'Responsive design for all devices',
                'SEO optimization and fast loading',
                'High conversion landing pages',
                'Optimized sales funnels',
                'Integration with payment systems and CRM',
                'Continuous analysis and data-based optimization'
              ]
            },
            {
              title: 'Content That Engages and Converts',
              description: 'Content strategies to engage, educate and convert your audience into customers.',
              details: [
                'Creation of viral content for TikTok',
                'Content strategies for Instagram and Facebook',
                'Articles and posts optimized for LinkedIn',
                'Personalized email marketing campaigns',
                'Video and podcast production',
                'Engagement analysis and continuous strategy adjustment'
              ]
            }
          ]
        };
      case 'ES':
        return {
          title: 'Nuestros Servicios',
          description: 'Soluciones completas de marketing digital que generan resultados reales para tu negocio.',
          requestAnalysis: 'Quiero Recibir una Propuesta',
          wantService: 'Quiero Recibir una Propuesta',
          services: [
            {
              title: 'Anuncios Que Generan Ventas y Leads Calificados',
              description: 'Gestión estratégica de tráfico pago enfocada en conversión y resultados medibles.',
              details: [
                'Campañas de Google Ads que generan clics calificados y más ventas',
                'Segmentación inteligente para búsqueda, display y remarketing con enfoque total en conversión',
                'Facebook Ads con estrategias que aproveitan cada centavo de tu presupuesto',
                'Anuncios creados para alcanzar a las personas correctas y generar resultados reales',
                'Instagram Ads que llaman la atención y conectan con tu audiencia',
                'Creaciones visuales impactantes para aumentar el engagement y atraer nuevos clientes',
                'TikTok Ads con contenido atractivo que se vuelve viral',
                'Campañas creativas y de alto impacto para alcanzar miles de personas a bajo costo',
                'LinkedIn Ads para tomadores de decisiones',
                'Anuncios estratégicos enfocados en profesionales calificados y tomadores de decisiones'
              ]
            },
            {
              title: 'Automatización con IA Que Funciona 24/7',
              description: 'Soluciones inteligentes para automatizar procesos y mejorar la experiencia del cliente.',
              details: [
                'Chatbots inteligentes para atención al cliente 24/7',
                'Asistentes virtuales para calificación de leads',
                'Respuestas automatizadas en redes sociales y email',
                'Análisis predictivo del comportamiento del cliente',
                'Personalización automatizada de la experiencia del usuario',
                'Integración con CRM y otras plataformas de gestión'
              ]
            },
            {
              title: 'Landing Pages Que Convierten en Clientes',
              description: 'Páginas optimizadas para conversión y experiencia del usuario que generan resultados.',
              details: [
                'Diseño responsivo para todos los dispositivos',
                'Optimización SEO y carga rápida',
                'Landing pages de alta conversión',
                'Embudos de ventas optimizados',
                'Integración con sistemas de pago y CRM',
                'Análisis continuo y optimización basada en datos'
              ]
            },
            {
              title: 'Contenido Que Involucra y Convierte',
              description: 'Estrategias de contenido para involucrar, educar y convertir a tu audiencia en clientes.',
              details: [
                'Creación de contenido viral para TikTok',
                'Estrategias de contenido para Instagram y Facebook',
                'Artículos y posts optimizados para LinkedIn',
                'Campañas de email marketing personalizadas',
                'Producción de videos y podcasts',
                'Análisis de engagement y ajuste continuo de estrategia'
              ]
            }
          ]
        };
      default: // PT
        return {
          title: 'Nossos Serviços',
          description: 'Soluções completas de marketing digital que geram resultados reais para seu negócio.',
          requestAnalysis: 'Quero Receber uma Proposta',
          wantService: 'Quero Receber uma Proposta',
          services: [
            {
              title: 'Anúncios Que Geram Vendas e Leads Qualificados',
              description: 'Gestão estratégica de tráfego pago com foco em conversão e resultados mensuráveis.',
              details: [
                'Campanhas no Google Ads que geram cliques qualificados e mais vendas',
                'Segmentação inteligente para busca, display e remarketing com foco total em conversão',
                'Facebook Ads com estratégias que aproveitam cada centavo do seu orçamento',
                'Anúncios criados para alcançar as pessoas certas e gerar resultados reais',
                'Instagram Ads que chamam atenção e conectam com seu público',
                'Criações visuais impactantes para aumentar engajamento e atrair novos clientes',
                'TikTok Ads com conteúdo envolvente que viraliza',
                'Campanhas criativas e de alto impacto para alcançar milhares de pessoas com baixo custo',
                'LinkedIn Ads para quem decide',
                'Anúncios estratégicos focados em profissionais qualificados e tomadores de decisão'
              ]
            },
            {
              title: 'Automação com IA Que Funciona 24/7',
              description: 'Soluções inteligentes para automatizar processos e melhorar a experiência do cliente.',
              details: [
                'Chatbots inteligentes para atendimento 24/7 ao cliente',
                'Assistentes virtuais para qualificação de leads',
                'Automação de respostas em redes sociais e e-mail',
                'Análise preditiva de comportamento do cliente',
                'Personalização automatizada da experiência do usuário',
                'Integração com CRM e outras plataformas de gestão'
              ]
            },
            {
              title: 'Landing Pages Que Convertem em Clientes',
              description: 'Páginas otimizadas para conversão e experiência do usuário que geram resultados.',
              details: [
                'Design responsivo para todos os dispositivos',
                'Otimização para SEO e carregamento rápido',
                'Landing pages de alta conversão',
                'Funis de vendas otimizados',
                'Integração com sistemas de pagamento e CRM',
                'Análise contínua e otimização baseada em dados'
              ]
            },
            {
              title: 'Conteúdo Que Engaja e Converte',
              description: 'Estratégias de conteúdo para engajar, educar e converter sua audiência em clientes.',
              details: [
                'Criação de conteúdos virais para TikTok',
                'Estratégias de conteúdo para Instagram e Facebook',
                'Artigos e posts otimizados para LinkedIn',
                'Campanhas de email marketing personalizadas',
                'Produção de vídeos e podcasts',
                'Análise de engajamento e ajuste contínuo de estratégia'
              ]
            }
          ]
        };
    }
  };

  const content = getContent();

  const getWhatsappMessage = () => {
    switch (language) {
      case 'EN':
        return 'Hello! I came from the iD Agency website and would like to know more about the services.';
      case 'ES':
        return 'Hola! Vengo del sitio web de la Agencia iD y me gustaría saber más sobre los servicios.';
      default: // PT
        return 'Olá! Vim pelo site da Agência iD e gostaria de saber mais sobre os serviços.';
    }
  };

  const whatsappMessage = getWhatsappMessage();
  const whatsappLink = `https://wa.me/5561999601534?text=${encodeURIComponent(whatsappMessage)}`;

  const getServiceIcon = (index: number) => {
    const iconClass = "w-6 h-6 md:w-7 md:h-7 text-idOrange";
    
    switch (index) {
      case 0:
        return (
          <svg className={iconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m-9 9a9 9 0 019-9" />
          </svg>
        );
      case 1:
        return (
          <svg className={iconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        );
      case 2:
        return (
          <svg className={iconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className={iconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        );
    }
  };

  return (
    <section id="services" className="section-padding bg-black">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 animate-on-scroll">
            {content.title}
            <span className="block w-16 md:w-20 h-1 bg-idOrange mx-auto mt-3 md:mt-4"></span>
          </h2>
          <p className="text-base md:text-lg text-gray-300 animate-on-scroll px-4">
            {content.description}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {content.services.map((service, index) => (
              <ServiceItem
                key={index}
                value={`service-${index}`}
                title={service.title}
                description={service.description}
                icon={getServiceIcon(index)}
                details={service.details}
                ctaText={content.wantService}
              />
            ))}
          </Accordion>
        </div>

        <div className="mt-12 md:mt-16 text-center animate-on-scroll">
          <a href="#contact">
            <Button className="btn-primary text-base md:text-lg px-6 md:px-8 py-4 md:py-6">
              {content.requestAnalysis}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
