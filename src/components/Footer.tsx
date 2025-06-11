import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from './LanguageProvider';
import LanguageSelector from './LanguageSelector';

const Footer = () => {
  const { language } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const getContent = () => {
    switch (language) {
      case 'EN':
        return {
          companyDescription: 'Specialists in paid traffic and AI automation for business growth.',
          navigation: 'Navigation',
          services: 'Services',
          contact: 'Contact',
          talkToSpecialist: 'Talk to a Specialist',
          allRightsReserved: 'All rights reserved.',
          termsOfUse: 'Terms of Use',
          privacyPolicy: 'Privacy Policy',
          navLinks: [
            { name: 'Home', href: '#home' },
            { name: 'About us', href: '#about' },
            { name: 'Services', href: '#services' },
            { name: 'Testimonials', href: '#testimonials' },
            { name: 'Contact', href: '#contact' },
          ],
          serviceLinks: [
            { name: 'Ads That Generate Sales and Qualified Leads', href: '#services' },
            { name: 'AI Automation That Works 24/7', href: '#services' },
            { name: 'Landing Pages That Convert Into Customers', href: '#services' },
            { name: 'Content That Engages and Converts', href: '#services' },
          ]
        };
      case 'ES':
        return {
          companyDescription: 'Especialistas en tráfico pago y automatización con IA para el crecimiento de negocios.',
          navigation: 'Navegación',
          services: 'Servicios',
          contact: 'Contacto',
          talkToSpecialist: 'Hablar con un Especialista',
          allRightsReserved: 'Todos los derechos reservados.',
          termsOfUse: 'Términos de Uso',
          privacyPolicy: 'Política de Privacidad',
          navLinks: [
            { name: 'Inicio', href: '#home' },
            { name: 'Nosotros', href: '#about' },
            { name: 'Servicios', href: '#services' },
            { name: 'Testimonios', href: '#testimonials' },
            { name: 'Contacto', href: '#contact' },
          ],
          serviceLinks: [
            { name: 'Anuncios Que Generan Ventas y Leads Calificados', href: '#services' },
            { name: 'Automatización con IA Que Funciona 24/7', href: '#services' },
            { name: 'Landing Pages Que Convierten en Clientes', href: '#services' },
            { name: 'Contenido Que Involucra y Convierte', href: '#services' },
          ]
        };
      default: // PT
        return {
          companyDescription: 'Especialistas em tráfego pago e automação com IA para crescimento de negócios.',
          navigation: 'Navegação',
          services: 'Serviços',
          contact: 'Contato',
          talkToSpecialist: 'Fale com um Especialista',
          allRightsReserved: 'Todos os direitos reservados.',
          termsOfUse: 'Termos de Uso',
          privacyPolicy: 'Política de Privacidade',
          navLinks: [
            { name: 'Home', href: '#home' },
            { name: 'Sobre nós', href: '#about' },
            { name: 'Serviços', href: '#services' },
            { name: 'Depoimentos', href: '#testimonials' },
            { name: 'Contato', href: '#contact' },
          ],
          serviceLinks: [
            { name: 'Anúncios Que Geram Vendas e Leads Qualificados', href: '#services' },
            { name: 'Automação com IA Que Funciona 24/7', href: '#services' },
            { name: 'Landing Pages Que Convertem em Clientes', href: '#services' },
            { name: 'Conteúdo Que Engaja e Converte', href: '#services' },
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
  const contactEmail = "contato@agenciaidmkt.site";

  return (
    <footer className="bg-black pt-12 sm:pt-16 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-idOrange/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Company Info - Melhorado para mobile */}
          <div className="text-center sm:text-left">
            <a href="#home" className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 block">
              <span className="text-idOrange">iD</span> Digital
            </a>
            <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base px-2 sm:px-0">
              {content.companyDescription}
            </p>
            <div className="flex items-center justify-center sm:justify-start space-x-4">
              <LanguageSelector />
            </div>
          </div>

          {/* Navigation - Melhorado para mobile */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">
              {content.navigation}
            </h3>
            <ul className="space-y-1 sm:space-y-2">
              {content.navLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-idOrange transition-colors duration-300 text-sm sm:text-base"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services - Melhorado para mobile */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">
              {content.services}
            </h3>
            <ul className="space-y-1 sm:space-y-2">
              {content.serviceLinks.map((service, index) => (
                <li key={index}>
                  <a href={service.href} className="text-gray-400 hover:text-idOrange transition-colors duration-300 text-xs sm:text-sm leading-relaxed block">
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact - Melhorado para mobile */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">
              {content.contact}
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-center justify-center sm:justify-start text-gray-400">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-idOrange mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-xs sm:text-sm break-all">{contactEmail}</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start text-gray-400">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-idOrange mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-xs sm:text-sm">+55 (61) 99960-1534</span>
              </li>
            </ul>
            <div className="mt-4 sm:mt-6">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button className="btn-primary text-sm sm:text-base w-full sm:w-auto">
                  {content.talkToSpecialist}
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Melhorado para mobile */}
        <div className="border-t border-gray-800 py-4 sm:py-6 text-center md:flex md:justify-between md:text-left">
          <p className="text-gray-400 text-xs sm:text-sm">
            © 2025 Agência iD. {content.allRightsReserved}
          </p>
          <div className="mt-2 md:mt-0 flex justify-center md:justify-end space-x-4 sm:space-x-6">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-idOrange transition-colors duration-300 text-xs sm:text-sm">
              {content.termsOfUse}
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-idOrange transition-colors duration-300 text-xs sm:text-sm">
              {content.privacyPolicy}
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll to Top Button - Melhorado para mobile */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-idOrange text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 z-40"
          aria-label="Scroll to top"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </footer>
  );
};

export default Footer;
