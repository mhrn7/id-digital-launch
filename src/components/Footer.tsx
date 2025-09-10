
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
              <a 
                href="https://wa.me/5561999601534?text=Olá! Gostaria de saber mais sobre os serviços da Agência iD." 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start group hover:bg-green-500/10 p-3 rounded-lg transition-all duration-200"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6 mr-3 mt-1 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                </svg>
                <div>
                  <p className="text-green-400 text-xs md:text-sm font-medium uppercase tracking-wide mb-1">WhatsApp</p>
                  <p className="text-gray-300 group-hover:text-white transition-colors text-sm md:text-base font-semibold">
                    +55 (61) 99960-1534
                  </p>
                  <p className="text-gray-500 text-xs mt-1">Clique para conversar</p>
                </div>
              </a>
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
