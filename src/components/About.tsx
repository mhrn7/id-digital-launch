
import { useEffect } from 'react';
import { useLanguage } from './LanguageProvider';

const About = () => {
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
          title: 'About us',
          description: 'iD Agency specializes in online advertising management, sales and AI automation, offering innovative solutions to boost businesses in the digital environment.',
          mission: 'Our Mission',
          missionText: 'Transform digital marketing through intelligent paid traffic strategies that generate real, measurable growth for our clients.',
          quote: 'We combine data analysis, automation and the latest AI technology to create campaigns that not only attract traffic, but convert visitors into loyal customers.',
          whyChoose: 'Why Choose Us?',
          benefits: [
            'Customized strategies for each business and objective',
            'Transparent reports and metrics',
            'Cutting-edge technology in automation and artificial intelligence',
            'Dedicated team with proven market experience'
          ]
        };
      case 'ES':
        return {
          title: 'Nosotros',
          description: 'La Agencia iD se especializa en gestión de publicidad online, ventas y automatización con IA, ofreciendo soluciones innovadoras para impulsar negocios en el entorno digital.',
          mission: 'Nuestra Misión',
          missionText: 'Transformar el marketing digital a través de estrategias inteligentes de tráfico pago que generen crecimiento real y medible para nuestros clientes.',
          quote: 'Combinamos análisis de datos, automatización y la más reciente tecnología de IA para crear campañas que no solo atraen tráfico, sino que convierten visitantes en clientes fieles.',
          whyChoose: '¿Por Qué Elegirnos?',
          benefits: [
            'Estrategias personalizadas para cada negocio y objetivo',
            'Reportes transparentes y métricas',
            'Tecnología de punta en automatización e inteligencia artificial',
            'Equipo dedicado con experiencia comprobada en el mercado'
          ]
        };
      default: // PT
        return {
          title: 'Sobre nós',
          description: 'A Agência iD é especializada em gestão de anúncios online, vendas e automações com IA, oferecendo soluções inovadoras para impulsionar negócios no ambiente digital.',
          mission: 'Nossa Missão',
          missionText: 'Transformar o marketing digital através de estratégias inteligentes de tráfego pago que geram crescimento real e mensurável para nossos clientes.',
          quote: 'Combinamos análise de dados, automação e a mais recente tecnologia de IA para criar campanhas que não apenas atraem tráfego, mas convertem visitantes em clientes fiéis.',
          whyChoose: 'Por Que Nos Escolher?',
          benefits: [
            'Estratégias personalizadas para cada negócio e objetivo',
            'Relatórios transparentes e métricas',
            'Tecnologia de ponta em automação e inteligência artificial',
            'Equipe dedicada com experiência comprovada no mercado'
          ]
        };
    }
  };

  const content = getContent();

  return (
    <section id="about" className="section-padding bg-gradient-to-b from-black to-idDarkBlack">
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

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative animate-on-scroll h-auto flex items-center md:max-w-sm mx-auto">
            <div className="absolute -inset-1 bg-idOrange/30 rounded-lg blur-md"></div>
            <div className="relative h-full w-full">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="United Team Working Together" 
                className="rounded-lg w-full h-full object-cover max-h-[400px]"
              />
            </div>
          </div>

          <div className="space-y-6 animate-on-scroll">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              {content.mission}
            </h3>
            <p className="text-gray-300">
              {content.missionText}
            </p>
            
            <div className="border-l-4 border-idOrange pl-4 py-2">
              <p className="text-gray-300 italic">
                {content.quote}
              </p>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-white pt-4">
              {content.whyChoose}
            </h3>
            
            <ul className="space-y-3">
              {content.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-6 h-6 text-idOrange mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
