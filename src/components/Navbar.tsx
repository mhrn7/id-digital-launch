
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from './LanguageProvider';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getNavLinks = () => {
    switch (language) {
      case 'EN':
        return [
          { name: 'Home', href: '#home' },
          { name: 'About us', href: '#about' },
          { name: 'Services', href: '#services' },
          { name: 'Testimonials', href: '#testimonials' },
          { name: 'Contact', href: '#contact' },
        ];
      case 'ES':
        return [
          { name: 'Inicio', href: '#home' },
          { name: 'Nosotros', href: '#about' },
          { name: 'Servicios', href: '#services' },
          { name: 'Testimonios', href: '#testimonials' },
          { name: 'Contacto', href: '#contact' },
        ];
      default: // PT
        return [
          { name: 'Home', href: '#home' },
          { name: 'Sobre nós', href: '#about' },
          { name: 'Serviços', href: '#services' },
          { name: 'Depoimentos', href: '#testimonials' },
          { name: 'Contato', href: '#contact' },
        ];
    }
  };

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

  const getCtaText = () => {
    switch (language) {
      case 'EN':
        return { desktop: 'Talk to a Specialist', mobile: 'Contact Us' };
      case 'ES':
        return { desktop: 'Hablar con un Especialista', mobile: 'Contáctanos' };
      default: // PT
        return { desktop: 'Fale com um Especialista', mobile: 'Fale Conosco' };
    }
  };

  const navLinks = getNavLinks();
  const whatsappMessage = getWhatsappMessage();
  const ctaText = getCtaText();
  const whatsappLink = `https://wa.me/5561999601534?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/95 shadow-md' : 'bg-transparent'}`}>
      <div className="container-custom">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#home" className="text-2xl font-bold text-white">
              <span className="text-idOrange">Agência</span> iD
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="block lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href}
                className="text-white hover:text-idOrange transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Language Toggle & CTA - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSelector />
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button className="btn-primary">
                {ctaText.desktop}
              </Button>
            </a>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0'}`}>
          {navLinks.map((link, index) => (
            <a 
              key={index}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-white hover:text-idOrange transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
            <LanguageSelector />
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button className="btn-primary">
                {ctaText.mobile}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
