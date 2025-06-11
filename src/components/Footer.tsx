
import { useLanguage } from './LanguageProvider';

const Footer = () => {
  const { language } = useLanguage();

  const getContent = () => {
    switch (language) {
      case 'EN':
        return {
          description: 'iD Agency is a digital marketing company specialized in paid traffic and automation with artificial intelligence.',
          quickLinks: 'Quick Links',
          contact: 'Contact',
          rights: 'All rights reserved.',
          phone: 'Phone',
          email: 'Email',
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
          description: 'Agencia iD es una empresa de marketing digital especializada en tráfico pago y automatización con inteligencia artificial.',
          quickLinks: 'Enlaces Rápidos',
          contact: 'Contacto',
          rights: 'Todos los derechos reservados.',
          phone: 'Teléfono',
          email: 'Email',
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
          description: 'A Agência iD é uma empresa de marketing digital especializada em tráfego pago e automação com inteligência artificial.',
          quickLinks: 'Links Rápidos',
          contact: 'Contato',
          rights: 'Todos os direitos reservados.',
          phone: 'Telefone',
          email: 'Email',
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
      <div className="container-custom py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-4 md:mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
                <span className="text-idOrange">{language === 'EN' ? 'iD' : 'Agência'}</span> {language === 'EN' ? 'Agency' : 'iD'}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                {content.description}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base md:text-lg font-semibold text-white mb-4 md:mb-6">{content.quickLinks}</h4>
            <ul className="space-y-2 md:space-y-3">
              <li><a href="#home" className="text-gray-400 hover:text-idOrange transition-colors text-sm md:text-base">{content.links.home}</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-idOrange transition-colors text-sm md:text-base">{content.links.about}</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-idOrange transition-colors text-sm md:text-base">{content.links.services}</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-idOrange transition-colors text-sm md:text-base">{content.links.testimonials}</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-idOrange transition-colors text-sm md:text-base">{content.links.contact}</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base md:text-lg font-semibold text-white mb-4 md:mb-6">{content.contact}</h4>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start">
                <svg className="w-4 h-4 md:w-5 md:h-5 mr-3 mt-1 text-idOrange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-gray-500 text-xs md:text-sm uppercase tracking-wide mb-1">{content.email}</p>
                  <a href="mailto:contato@agenciaidmkt.site" className="text-gray-300 hover:text-idOrange transition-colors text-sm md:text-base break-all">
                    contato@agenciaidmkt.site
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="w-4 h-4 md:w-5 md:h-5 mr-3 mt-1 text-idOrange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="text-gray-500 text-xs md:text-sm uppercase tracking-wide mb-1">{content.phone}</p>
                  <a href="tel:+5561999601534" className="text-gray-300 hover:text-idOrange transition-colors text-sm md:text-base">
                    +55 (61) 99960-1534
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 text-center">
          <p className="text-gray-400 text-sm md:text-base">
            © {new Date().getFullYear()} {brandName}. {content.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
