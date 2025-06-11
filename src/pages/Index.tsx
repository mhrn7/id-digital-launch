
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { LanguageProvider } from '@/components/LanguageProvider';
import StructuredData from '@/components/StructuredData';
import { Toaster } from '@/components/ui/toaster';
import { setupScrollAnimations } from '@/utils/animationUtils';

const Index = () => {
  useEffect(() => {
    // Set meta title and description for SEO
    document.title = 'Agência iD | Tráfego Pago e Automação com IA';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Agência especializada em tráfego pago e automação com inteligência artificial, focada em resultados mensuráveis para o seu negócio.');
    }

    // Add animation to all sections and headings
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      // Add animation to the section itself
      section.classList.add('animate-on-scroll');
      
      // Add animation to headings with different directions
      const headings = section.querySelectorAll('h1, h2, h3');
      headings.forEach(heading => {
        heading.classList.add('animate-on-scroll');
        heading.setAttribute('data-animation', 'fade-up');
      });
      
      // Add animation to paragraphs with fade-up
      const paragraphs = section.querySelectorAll('p');
      paragraphs.forEach((p, index) => {
        p.classList.add('animate-on-scroll');
        p.setAttribute('data-animation', 'fade-up');
        p.classList.add(`animate-delay-${(index + 1) * 100}`);
      });
      
      // Add animation to images with zoom-in effect
      const images = section.querySelectorAll('img');
      images.forEach(img => {
        img.classList.add('animate-on-scroll');
        img.setAttribute('data-animation', 'zoom-in');
      });
      
      // Add animation to buttons with fade-up
      const buttons = section.querySelectorAll('button, .btn, .btn-primary, .btn-outline');
      buttons.forEach(button => {
        button.classList.add('animate-on-scroll');
        button.setAttribute('data-animation', 'fade-up');
        button.classList.add('animate-delay-300');
      });
      
      // Add different animations to cards and grid items
      const cards = section.querySelectorAll('.card, [class*="grid"] > div');
      cards.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        
        // Alternate between left and right animations
        if (index % 2 === 0) {
          card.setAttribute('data-animation', 'fade-left');
        } else {
          card.setAttribute('data-animation', 'fade-right');
        }
        
        card.classList.add(`animate-delay-${(index % 5 + 1) * 100}`);
      });
    });
  }, []);

  // Set up the scroll animations
  setupScrollAnimations();

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <Toaster />
        <StructuredData />
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <Contact />
        <Footer />
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  );
};

export default Index;
