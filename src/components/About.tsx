
import { useEffect, useState } from 'react';

const About = () => {
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
    <section id="about" className="section-padding bg-gradient-to-b from-black to-idDarkBlack">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-on-scroll">
            {language === 'PT' ? 'Sobre nós' : 'About us'}
            <span className="block w-20 h-1 bg-idOrange mx-auto mt-4"></span>
          </h2>
          <p className="text-lg text-gray-300 animate-on-scroll">
            {language === 'PT' 
              ? 'A Agência iD é especializada em tráfego pago e automação com inteligência artificial, oferecendo soluções inovadoras para impulsionar seu negócio no ambiente digital.'
              : 'iD Agency specializes in paid traffic and automation with artificial intelligence, offering innovative solutions to boost your business in the digital environment.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="relative animate-on-scroll h-full flex items-center">
            <div className="absolute -inset-1 bg-idOrange/30 rounded-lg blur-md"></div>
            <div className="relative h-full w-full">
              <img 
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Digital Marketing Team" 
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6 animate-on-scroll">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              {language === 'PT' ? 'Nossa Missão' : 'Our Mission'}
            </h3>
            <p className="text-gray-300">
              {language === 'PT' 
                ? 'Transformar o marketing digital através de estratégias inteligentes de tráfego pago que geram crescimento real e mensurável para nossos clientes.'
                : 'Transform digital marketing through intelligent paid traffic strategies that generate real, measurable growth for our clients.'}
            </p>
            
            <div className="border-l-4 border-idOrange pl-4 py-2">
              <p className="text-gray-300 italic">
                {language === 'PT'
                  ? 'Combinamos análise de dados, automação e a mais recente tecnologia de IA para criar campanhas que não apenas atraem tráfego, mas convertem visitantes em clientes fiéis.'
                  : 'We combine data analysis, automation and the latest AI technology to create campaigns that not only attract traffic, but convert visitors into loyal customers.'}
              </p>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-white pt-4">
              {language === 'PT' ? 'Por Que Nos Escolher?' : 'Why Choose Us?'}
            </h3>
            
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-idOrange mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300">
                  {language === 'PT'
                    ? 'Estratégias personalizadas para cada negócio e objetivo'
                    : 'Customized strategies for each business and objective'}
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-idOrange mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300">
                  {language === 'PT'
                    ? 'Relatórios transparentes e métricas claras de ROI'
                    : 'Transparent reports and clear ROI metrics'}
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-idOrange mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300">
                  {language === 'PT'
                    ? 'Tecnologia de ponta em automação e inteligência artificial'
                    : 'Cutting-edge technology in automation and artificial intelligence'}
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-idOrange mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300">
                  {language === 'PT'
                    ? 'Equipe dedicada com experiência comprovada no mercado'
                    : 'Dedicated team with proven market experience'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
