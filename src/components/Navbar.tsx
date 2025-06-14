
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from './LanguageProvider';
import LanguageSelector from './LanguageSelector';
import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsMenuOpen(false);
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

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

  const getCtaText = () => {
    switch (language) {
      case 'EN':
        return { desktop: 'Get in Touch', mobile: 'Contact' };
      case 'ES':
        return { desktop: 'Ponerse en Contacto', mobile: 'Contacto' };
      default: // PT
        return { desktop: 'Entre em Contato', mobile: 'Contato' };
    }
  };

  const navLinks = getNavLinks();
  const ctaText = getCtaText();

  const handleAdminClick = () => {
    navigate('/admin/login');
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="container-custom">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo + Language Selector (Mobile) */}
          <div className="flex items-center space-x-4 z-50">
            <a href="#home" className="text-xl md:text-2xl font-bold text-white">
              <span className="text-idOrange">{language === 'EN' ? 'iD' : 'Agência'}</span> {language === 'EN' ? 'Agency' : 'iD'}
            </a>
            {/* Language Selector visible on mobile */}
            <div className="lg:hidden">
              <LanguageSelector />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="block lg:hidden z-50">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="text-white focus:outline-none p-2"
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

          {/* Language Toggle, Admin & CTA - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSelector />
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleAdminClick}
              className="border-gray-700 text-white hover:bg-gray-800"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <a href="#contact">
              <Button className="btn-primary">
                {ctaText.desktop}
              </Button>
            </a>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black/90 z-40 lg:hidden" />
        )}

        {/* Mobile Menu */}
        <div 
          className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-black border-l border-gray-800 z-40 lg:hidden transition-transform duration-300 transform ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full pt-20 px-6">
            <nav className="flex-1">
              {navLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-4 text-lg text-white hover:text-idOrange transition-colors duration-300 border-b border-gray-800"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            
            <div className="border-t border-gray-800 pt-6 pb-6">
              <div className="flex flex-col space-y-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    handleAdminClick();
                    setIsMenuOpen(false);
                  }}
                  className="border-gray-700 text-white hover:bg-gray-800 w-full"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Admin
                </Button>
                <a href="#contact">
                  <Button className="btn-primary w-full">
                    {ctaText.mobile}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
