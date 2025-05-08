
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('PT');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'PT' ? 'EN' : 'PT');
  };

  const navLinks = [
    { name: language === 'PT' ? 'Home' : 'Home', href: '#home' },
    { name: language === 'PT' ? 'Sobre nós' : 'About us', href: '#about' },
    { name: language === 'PT' ? 'Serviços' : 'Services', href: '#services' },
    { name: language === 'PT' ? 'Depoimentos' : 'Testimonials', href: '#testimonials' },
    { name: language === 'PT' ? 'Contato' : 'Contact', href: '#contact' },
  ];

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
            <button onClick={toggleLanguage} className="flex items-center text-white hover:text-idOrange">
              <Languages size={20} className="mr-1" />
              <span>{language}</span>
            </button>
            <Button className="btn-primary">
              {language === 'PT' ? 'Fale com um Especialista' : 'Talk to a Specialist'}
            </Button>
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
            <button onClick={toggleLanguage} className="flex items-center text-white hover:text-idOrange">
              <Languages size={20} className="mr-1" />
              <span>{language}</span>
            </button>
            <Button className="btn-primary">
              {language === 'PT' ? 'Fale Conosco' : 'Contact Us'}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
