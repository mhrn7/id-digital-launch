
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

const Footer = () => {
  const [language, setLanguage] = useState('PT');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Check for URL params or localStorage for language setting
    const storedLanguage = localStorage.getItem('language') || 'PT';
    setLanguage(storedLanguage);
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'PT' ? 'EN' : 'PT';
    localStorage.setItem('language', newLanguage);
    setLanguage(newLanguage);
    window.dispatchEvent(new Event('languageChanged'));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navLinks = [
    { name: language === 'PT' ? 'Home' : 'Home', href: '#home' },
    { name: language === 'PT' ? 'Sobre nós' : 'About us', href: '#about' },
    { name: language === 'PT' ? 'Serviços' : 'Services', href: '#services' },
    { name: language === 'PT' ? 'Depoimentos' : 'Testimonials', href: '#testimonials' },
    { name: language === 'PT' ? 'Contato' : 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-black pt-16 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-idOrange/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <a href="#home" className="text-2xl font-bold text-white mb-4 block">
              <span className="text-idOrange">iD</span> Digital
            </a>
            <p className="text-gray-400 mb-6">
              {language === 'PT' 
                ? 'Especialistas em tráfego pago e automação com IA para crescimento de negócios.'
                : 'Specialists in paid traffic and AI automation for business growth.'}
            </p>
            <div className="flex items-center space-x-4">
              <button onClick={toggleLanguage} className="flex items-center text-white hover:text-idOrange transition-colors duration-300">
                <Languages size={20} className="mr-1" />
                <span>{language}</span>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">
              {language === 'PT' ? 'Navegação' : 'Navigation'}
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-idOrange transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">
              {language === 'PT' ? 'Serviços' : 'Services'}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-gray-400 hover:text-idOrange transition-colors duration-300">
                  {language === 'PT' ? 'Google Ads' : 'Google Ads'}
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-idOrange transition-colors duration-300">
                  {language === 'PT' ? 'Meta Ads' : 'Meta Ads'}
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-idOrange transition-colors duration-300">
                  {language === 'PT' ? 'LinkedIn Ads' : 'LinkedIn Ads'}
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-idOrange transition-colors duration-300">
                  {language === 'PT' ? 'Landing Pages' : 'Landing Pages'}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">
              {language === 'PT' ? 'Contato' : 'Contact'}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <svg className="w-5 h-5 text-idOrange mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>idanunciosonline@gmail.com</span>
              </li>
              <li className="flex items-center text-gray-400">
                <svg className="w-5 h-5 text-idOrange mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+55 (61) 99960-1534</span>
              </li>
            </ul>
            <div className="mt-6">
              <Button className="btn-primary">
                {language === 'PT' ? 'Fale com um Especialista' : 'Talk to a Specialist'}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6 text-center md:flex md:justify-between md:text-left">
          <p className="text-gray-400">
            © 2025 Agência iD. {language === 'PT' ? 'Todos os direitos reservados.' : 'All rights reserved.'}
          </p>
          <div className="mt-3 md:mt-0 flex justify-center md:justify-end space-x-6">
            <a href="#" className="text-gray-400 hover:text-idOrange transition-colors duration-300">
              {language === 'PT' ? 'Termos de Uso' : 'Terms of Use'}
            </a>
            <a href="#" className="text-gray-400 hover:text-idOrange transition-colors duration-300">
              {language === 'PT' ? 'Política de Privacidade' : 'Privacy Policy'}
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-idOrange text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </footer>
  );
};

export default Footer;
