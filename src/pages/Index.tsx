
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/components/LanguageProvider';
import StructuredData from '@/components/StructuredData';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  useEffect(() => {
    // Set meta title and description for SEO
    document.title = 'Agência iD | Tráfego Pago e Automação com IA';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Agência especializada em tráfego pago e automação com inteligência artificial, focada em resultados mensuráveis para o seu negócio.');
    }

    // Add animation to elements when they become visible
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
      </div>
    </LanguageProvider>
  );
};

export default Index;
