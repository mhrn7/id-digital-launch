
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface TestimonialProps {
  quote: string;
  author: string;
  company: string;
  image?: string;
}

const TestimonialCard = ({ quote, author, company, image }: TestimonialProps) => {
  return (
    <div className="bg-idDarkBlack p-6 rounded-lg border border-gray-800 h-full animate-on-scroll">
      <div className="flex items-center mb-6">
        <div className="mr-4">
          {image ? (
            <img src={image} alt={author} className="w-14 h-14 rounded-full object-cover" />
          ) : (
            <div className="w-14 h-14 rounded-full bg-idOrange/20 flex items-center justify-center text-idOrange font-bold text-xl">
              {author.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h4 className="font-bold text-white">{author}</h4>
          <p className="text-gray-400 text-sm">{company}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <svg className="w-8 h-8 text-idOrange/40 mb-2" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 8c-2.2 0-4 1.8-4 4v16h16v-8h-8c0-4.4 3.6-8 8-8V8c-4.4 0-8.4 2.4-10.8 6.4C10.4 10.4 8.6 8 10 8zm18 0c-2.2 0-4 1.8-4 4v16h16v-8h-8c0-4.4 3.6-8 8-8V8c-4.4 0-8.4 2.4-10.8 6.4C28.4 10.4 26.6 8 28 8z" />
        </svg>
        <p className="text-gray-300">{quote}</p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [language, setLanguage] = useState('PT');

  useEffect(() => {
    // Check for URL params or localStorage for language setting
    const storedLanguage = localStorage.getItem('language') || 'PT';
    setLanguage(storedLanguage);
    
    // Apply animation to elements
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

  const testimonials = [
    {
      quote: language === 'PT' 
        ? "Depois que começamos com a Agência iD, nossa agenda lotou de novos clientes via Google e Instagram. A equipe é extremamente profissional e ágil."
        : "After we started with iD Agency, our schedule was filled with new clients via Google and Instagram. The team is extremely professional and agile.",
      author: language === 'PT' ? "Andrea" : "Andrea",
      company: language === 'PT' ? "Fundadora da Pet Puzzle" : "Founder of Pet Puzzle",
    },
    {
      quote: language === 'PT'
        ? "As campanhas no Instagram foram um divisor de águas! Nossa loja ganhou visibilidade e dobramos o faturamento em apenas 45 dias."
        : "The Instagram campaigns were a watershed! Our store gained visibility and doubled our revenue in just 45 days.",
      author: language === 'PT' ? "Lucas Vieira" : "Lucas Vieira",
      company: language === 'PT' ? "Moda Viva Store" : "Moda Viva Store",
    },
    {
      quote: language === 'PT'
        ? "Com o tráfego pago feito com estratégia, conseguimos preencher todos os horários ociosos da clínica. Os resultados são reais e mensuráveis."
        : "With strategically executed paid traffic, we were able to fill all the clinic's idle hours. The results are real and measurable.",
      author: language === 'PT' ? "Dra. Juliana Moreira" : "Dr. Juliana Moreira",
      company: language === 'PT' ? "Clínica Sorrir Bem" : "Sorrir Bem Clinic",
    },
    {
      quote: language === 'PT'
        ? "A Agência iD me ajudou a profissionalizar minha presença online. Hoje recebo pedidos todos os dias pelo Google e WhatsApp."
        : "The iD Agency helped me professionalize my online presence. Today I receive orders every day through Google and WhatsApp.",
      author: language === 'PT' ? "Renan" : "Renan",
      company: language === 'PT' ? "Proprietário da Garden State Flooring" : "Owner of Garden State Flooring",
    },
  ];

  return (
    <section id="testimonials" className="section-padding bg-gradient-to-b from-idDarkBlack to-black">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-on-scroll">
            {language === 'PT' ? 'O que nossos clientes estão dizendo' : 'What our clients are saying'}
            <span className="block w-20 h-1 bg-idOrange mx-auto mt-4"></span>
          </h2>
          <p className="text-lg text-gray-300 animate-on-scroll">
            {language === 'PT' 
              ? 'Veja como nossos serviços têm impactado positivamente os negócios dos nossos clientes.'
              : 'See how our services have positively impacted our clients\' businesses.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              company={testimonial.company}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block bg-idDarkBlack border border-gray-800 rounded-lg p-6 max-w-2xl mx-auto animate-on-scroll">
            <h3 className="text-2xl font-bold mb-4">
              {language === 'PT' 
                ? 'Pronto para transformar seu marketing digital?' 
                : 'Ready to transform your digital marketing?'}
            </h3>
            <p className="text-gray-300 mb-6">
              {language === 'PT'
                ? 'Junte-se aos nossos clientes satisfeitos e veja o poder do marketing digital estratégico.'
                : 'Join our satisfied clients and see the power of strategic digital marketing.'}
            </p>
            <Button className="btn-primary">
              {language === 'PT' ? 'Solicite uma Consultoria' : 'Request a Consultation'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
