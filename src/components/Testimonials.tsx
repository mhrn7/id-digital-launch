import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from './LanguageProvider';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

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
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-idOrange fill-idOrange" />
            ))}
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-300">{quote}</p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const getContent = () => {
    switch (language) {
      case 'EN':
        return {
          title: 'What our clients are saying',
          description: 'See how our services have positively impacted our clients\' businesses.',
          readyTitle: 'Ready to transform your digital marketing?',
          readyDescription: 'Join our satisfied clients and see the power of strategic digital marketing.',
          requestConsultation: 'I Want to Boost My Business',
          testimonials: [
            {
              quote: "After we started with iD Agency, our schedule was filled with new clients via Google and Instagram. The team is extremely professional and agile.",
              author: "Andrea",
              company: "Founder of Pet Puzzle",
            },
            {
              quote: "The Instagram campaigns were a watershed! Our store gained visibility and doubled our revenue in just 45 days.",
              author: "Lucas Vieira",
              company: "Moda Viva Store",
            },
            {
              quote: "With strategically executed paid traffic, we were able to fill all the clinic's idle hours. The results are real and measurable.",
              author: "Dr. Juliana Moreira",
              company: "Sorrir Bem Clinic",
            },
            {
              quote: "The iD Agency helped me professionalize my online presence. Today I receive orders every day through Google and WhatsApp.",
              author: "Renan",
              company: "Owner of Garden State Flooring",
            },
          ]
        };
      case 'ES':
        return {
          title: 'Lo que dicen nuestros clientes',
          description: 'Ve cómo nuestros servicios han impactado positivamente los negocios de nuestros clientes.',
          readyTitle: '¿Listo para transformar tu marketing digital?',
          readyDescription: 'Únete a nuestros clientes satisfechos y ve el poder del marketing digital estratégico.',
          requestConsultation: 'Quiero Impulsar Mi Negocio',
          testimonials: [
            {
              quote: "Después de que comenzamos con la Agencia iD, nuestra agenda se llenó de nuevos clientes vía Google e Instagram. El equipo es extremadamente profesional y ágil.",
              author: "Andrea",
              company: "Fundadora de Pet Puzzle",
            },
            {
              quote: "¡Las campañas de Instagram fueron un punto de inflexión! Nuestra tienda ganó visibilidad y duplicamos los ingresos en solo 45 días.",
              author: "Lucas Vieira",
              company: "Moda Viva Store",
            },
            {
              quote: "Con el tráfico pago ejecutado estratégicamente, pudimos llenar todas las horas ociosas de la clínica. Los resultados son reales y medibles.",
              author: "Dra. Juliana Moreira",
              company: "Clínica Sorrir Bem",
            },
            {
              quote: "La Agencia iD me ayudó a profesionalizar mi presencia online. Hoy recibo pedidos todos los días a través de Google y WhatsApp.",
              author: "Renan",
              company: "Propietario de Garden State Flooring",
            },
          ]
        };
      default: // PT
        return {
          title: 'O que nossos clientes estão dizendo',
          description: 'Veja como nossos serviços têm impactado positivamente os negócios dos nossos clientes.',
          readyTitle: 'Pronto para transformar seu marketing digital?',
          readyDescription: 'Junte-se aos nossos clientes satisfeitos e veja o poder do marketing digital estratégico.',
          requestConsultation: 'Quero Impulsionar Meu Negócio',
          testimonials: [
            {
              quote: "Depois que começamos com a Agência iD, nossa agenda lotou de novos clientes via Google e Instagram. A equipe é extremamente profissional e ágil.",
              author: "Andrea",
              company: "Fundadora da Pet Puzzle",
            },
            {
              quote: "As campanhas no Instagram foram um divisor de águas! Nossa loja ganhou visibilidade e dobramos o faturamento em apenas 45 dias.",
              author: "Lucas Vieira",
              company: "Moda Viva Store",
            },
            {
              quote: "Com o tráfego pago feito com estratégia, conseguimos preencher todos os horários ociosos da clínica. Os resultados são reais e mensuráveis.",
              author: "Dra. Juliana Moreira",
              company: "Clínica Sorrir Bem",
            },
            {
              quote: "A Agência iD me ajudou a profissionalizar minha presença online. Hoje recebo pedidos todos os dias pelo Google e WhatsApp.",
              author: "Renan",
              company: "Proprietário da Garden State Flooring",
            },
          ]
        };
    }
  };

  const content = getContent();

  useEffect(() => {
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
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === content.testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [content.testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex(currentIndex === content.testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  const prevTestimonial = () => {
    setCurrentIndex(currentIndex === 0 ? content.testimonials.length - 1 : currentIndex - 1);
  };

  return (
    <section id="testimonials" className="section-padding bg-gradient-to-b from-idDarkBlack to-black">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-on-scroll">
            {content.title}
            <span className="block w-20 h-1 bg-idOrange mx-auto mt-4"></span>
          </h2>
          <p className="text-lg text-gray-300 animate-on-scroll">
            {content.description}
          </p>
        </div>

        {/* Carrossel de Depoimentos */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {content.testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <TestimonialCard
                    quote={testimonial.quote}
                    author={testimonial.author}
                    company={testimonial.company}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Controles do Carrossel */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-idOrange/20 hover:bg-idOrange/40 text-white p-2 rounded-full transition-colors duration-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-idOrange/20 hover:bg-idOrange/40 text-white p-2 rounded-full transition-colors duration-200"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          {/* Indicadores */}
          <div className="flex justify-center space-x-2 mt-8">
            {content.testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-idOrange' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block bg-idDarkBlack border border-gray-800 rounded-lg p-6 max-w-2xl mx-auto animate-on-scroll">
            <h3 className="text-2xl font-bold mb-4">
              {content.readyTitle}
            </h3>
            <p className="text-gray-300 mb-6">
              {content.readyDescription}
            </p>
            <a href="https://wa.me/5511999999999?text=Olá! Quero impulsionar meu negócio" target="_blank" rel="noopener noreferrer">
              <Button className="btn-primary">
                {content.requestConsultation}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;