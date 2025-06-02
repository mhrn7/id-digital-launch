
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from './LanguageProvider';

interface ServiceDetailsProps {
  title: string;
  details: string[];
}

const ServiceDetails = ({ title, details }: ServiceDetailsProps) => {
  return (
    <div className="mt-4">
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
}

const ServiceCard = ({ title, description, icon, details }: ServiceCardProps) => {
  return (
    <div 
      className="bg-gradient-to-br from-idDarkBlack to-black p-6 rounded-lg border border-gray-800 
                 transition-all duration-300 animate-on-scroll hover:border-idOrange/50 
                 hover:shadow-lg hover:shadow-idOrange/10"
    >
      <div className="w-14 h-14 bg-idOrange/10 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 hover:bg-idOrange/20">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 transition-colors duration-300 text-white hover:text-idOrange">
        {title}
      </h3>
      <p className="text-gray-400">{description}</p>
      
      <ServiceDetails 
        title={`Detalhes sobre ${title}`}
        details={details}
      />
    </div>
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
          description: 'We offer complete digital marketing solutions to drive your business growth.',
          requestAnalysis: 'Request a Free Analysis',
          services: [
            {
              title: 'Strategic Paid Traffic Management',
              description: 'Optimized strategies for digital platforms focused on conversion and results.',
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
              title: 'AI Automation',
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
              title: 'Website and Landing Page Creation',
              description: 'Development of pages optimized for conversion and user experience.',
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
              title: 'Content Marketing',
              description: 'Content strategies to engage, educate and convert your audience.',
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
          description: 'Ofrecemos soluciones completas de marketing digital para impulsar el crecimiento de tu negocio.',
          requestAnalysis: 'Solicitar un Análisis Gratuito',
          services: [
            {
              title: 'Gestión Estratégica de Tráfico Pago',
              description: 'Estrategias optimizadas para plataformas digitales enfocadas en conversión y resultados.',
              details: [
                'Campañas de Google Ads que generan clics calificados y más ventas',
                'Segmentación inteligente para búsqueda, display y remarketing con enfoque total en conversión',
                'Facebook Ads con estrategias que aprovechan cada centavo de tu presupuesto',
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
              title: 'Automatización con IA',
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
              title: 'Creación de Sitios Web y Landing Pages',
              description: 'Desarrollo de páginas optimizadas para conversión y experiencia del usuario.',
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
              title: 'Marketing de Contenido',
              description: 'Estrategias de contenido para involucrar, educar y convertir a tu audiencia.',
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
          description: 'Oferecemos soluções completas de marketing digital para impulsionar o crescimento do seu negócio.',
          requestAnalysis: 'Solicite uma Análise Gratuita',
          services: [
            {
              title: 'Gestão de Tráfego Pago Estratégico',
              description: 'Estratégias otimizadas para plataformas digitais com foco em conversão e resultados.',
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
              title: 'Automação com IA',
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
              title: 'Criação de Sites e Landing Pages',
              description: 'Desenvolvimento de páginas otimizadas para conversão e experiência do usuário.',
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
              title: 'Marketing de Conteúdo',
              description: 'Estratégias de conteúdo para engajar, educar e converter sua audiência.',
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

  return (
    <section id="services" className="section-padding bg-black">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-on-scroll">
            {content.title}
            <span className="block w-20 h-1 bg-idOrange mx-auto mt-4"></span>
          </h2>
          <p className="text-lg text-gray-300 animate-on-scroll">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {content.services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={
                index === 0 ? (
                  <svg className="w-8 h-8 text-idOrange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                ) : index === 1 ? (
                  <svg className="w-8 h-8 text-idOrange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                ) : index === 2 ? (
                  <svg className="w-8 h-8 text-idOrange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8 text-idOrange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                )
              }
              details={service.details}
            />
          ))}
        </div>

        <div className="mt-16 text-center animate-on-scroll">
          <a 
            href={whatsappLink}
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button className="btn-primary text-lg px-8 py-6">
              {content.requestAnalysis}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
