
import { useLanguage } from './LanguageProvider';

const Footer = () => {
  const { language } = useLanguage();

  const getContent = () => {
    switch (language) {
      case 'EN':
        return {
          description: 'iD Agency is a digital marketing company specialized in paid traffic and automation with artificial intelligence. We transform your online presence into measurable results.',
          quickLinks: 'Quick Links',
          services: 'Services',
          contact: 'Contact',
          socialMedia: 'Follow Us',
          rights: 'All rights reserved.',
          links: {
            home: 'Home',
            about: 'About us',
            services: 'Services',
            testimonials: 'Testimonials',
            contact: 'Contact'
          }
        };
      case 'ES':
        return {
          description: 'Agencia iD es una empresa de marketing digital especializada en tráfico pago y automatización con inteligencia artificial. Transformamos tu presencia online en resultados medibles.',
          quickLinks: 'Enlaces Rápidos',
          services: 'Servicios',
          contact: 'Contacto',
          socialMedia: 'Síguenos',
          rights: 'Todos los derechos reservados.',
          links: {
            home: 'Inicio',
            about: 'Nosotros',
            services: 'Servicios',
            testimonials: 'Testimonios',
            contact: 'Contacto'
          }
        };
      default: // PT
        return {
          description: 'A Agência iD é uma empresa de marketing digital especializada em tráfego pago e automação com inteligência artificial. Transformamos sua presença online em resultados mensuráveis.',
          quickLinks: 'Links Rápidos',
          services: 'Serviços',
          contact: 'Contato',
          socialMedia: 'Nos Siga',
          rights: 'Todos os direitos reservados.',
          links: {
            home: 'Home',
            about: 'Sobre nós',
            services: 'Serviços',
            testimonials: 'Depoimentos',
            contact: 'Contato'
          }
        };
    }
  };

  const content = getContent();
  const brandName = language === 'EN' ? 'iD Agency' : 'Agência iD';

  return (
    <footer className="bg-idDarkBlack border-t border-gray-800">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-4">
                <span className="text-idOrange">{language === 'EN' ? 'iD' : 'Agência'}</span> {language === 'EN' ? 'Agency' : 'iD'}
              </h3>
              <p className="text-gray-400 leading-relaxed max-w-md">
                {content.description}
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <svg className="w-5 h-5 mr-3 text-idOrange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>contato@agenciaidmkt.site</span>
              </div>
              <div className="flex items-center text-gray-400">
                <svg className="w-5 h-5 mr-3 text-idOrange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+55 (61) 99960-1534</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">{content.quickLinks}</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-400 hover:text-idOrange transition-colors">{content.links.home}</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-idOrange transition-colors">{content.links.about}</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-idOrange transition-colors">{content.links.services}</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-idOrange transition-colors">{content.links.testimonials}</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-idOrange transition-colors">{content.links.contact}</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">{content.socialMedia}</h4>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/eumatheusnevs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              <a 
                href="https://www.facebook.com/matheus.neves.992581/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} {brandName}. {content.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
