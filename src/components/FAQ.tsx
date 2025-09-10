import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
  return (
    <div className="border border-gray-800 rounded-lg mb-4 bg-idDarkBlack/50">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-800/30 transition-colors duration-200"
      >
        <span className="font-semibold text-white">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-idOrange flex-shrink-0 ml-4" />
        ) : (
          <ChevronDown className="w-5 h-5 text-idOrange flex-shrink-0 ml-4" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p className="text-gray-300 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const { language } = useLanguage();
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const getContent = () => {
    switch (language) {
      case 'EN':
        return {
          title: 'Frequently Asked Questions',
          faqs: [
            {
              question: "How long does it take to see results from digital marketing?",
              answer: "Results can vary depending on the strategy, but typically you'll start seeing initial results within 30-60 days for paid traffic and 3-6 months for organic strategies like SEO."
            },
            {
              question: "What's included in your digital marketing services?",
              answer: "We offer Google Ads management, Facebook and Instagram campaigns, SEO optimization, content creation, landing page development, and detailed performance reports."
            },
            {
              question: "Do you work with businesses in any industry?",
              answer: "Yes! We have experience across various industries including healthcare, retail, services, technology, and more. We adapt our strategies to each business's specific needs."
            },
            {
              question: "What's the minimum investment to get started?",
              answer: "Investment varies based on your goals and market. We'll create a customized proposal during our consultation that fits your budget and objectives."
            },
            {
              question: "How do you measure campaign success?",
              answer: "We track key metrics like ROI, conversion rates, cost per acquisition, website traffic, lead generation, and sales. You'll receive detailed monthly reports."
            },
            {
              question: "Do you provide ongoing support and optimization?",
              answer: "Absolutely! Digital marketing requires constant monitoring and optimization. We continuously adjust campaigns to improve performance and maximize your results."
            }
          ]
        };
      case 'ES':
        return {
          title: 'Preguntas Frecuentes',
          faqs: [
            {
              question: "¿Cuánto tiempo toma ver resultados del marketing digital?",
              answer: "Los resultados pueden variar según la estrategia, pero normalmente comenzarás a ver resultados iniciales en 30-60 días para tráfico pagado y 3-6 meses para estrategias orgánicas como SEO."
            },
            {
              question: "¿Qué incluyen sus servicios de marketing digital?",
              answer: "Ofrecemos gestión de Google Ads, campañas de Facebook e Instagram, optimización SEO, creación de contenido, desarrollo de landing pages e informes detallados de rendimiento."
            },
            {
              question: "¿Trabajan con empresas de cualquier industria?",
              answer: "¡Sí! Tenemos experiencia en varias industrias incluyendo salud, retail, servicios, tecnología y más. Adaptamos nuestras estrategias a las necesidades específicas de cada negocio."
            },
            {
              question: "¿Cuál es la inversión mínima para comenzar?",
              answer: "La inversión varía según tus objetivos y mercado. Crearemos una propuesta personalizada durante nuestra consulta que se ajuste a tu presupuesto y objetivos."
            },
            {
              question: "¿Cómo miden el éxito de las campañas?",
              answer: "Rastreamos métricas clave como ROI, tasas de conversión, costo por adquisición, tráfico web, generación de leads y ventas. Recibirás informes mensuales detallados."
            },
            {
              question: "¿Proporcionan soporte y optimización continua?",
              answer: "¡Por supuesto! El marketing digital requiere monitoreo y optimización constante. Ajustamos continuamente las campañas para mejorar el rendimiento y maximizar tus resultados."
            }
          ]
        };
      default: // PT
        return {
          title: 'Perguntas Frequentes',
          faqs: [
            {
              question: "Quanto tempo leva para ver resultados no marketing digital?",
              answer: "Os resultados podem variar dependendo da estratégia, mas geralmente você começará a ver resultados iniciais dentro de 30-60 dias para tráfego pago e 3-6 meses para estratégias orgânicas como SEO."
            },
            {
              question: "O que está incluído nos seus serviços de marketing digital?",
              answer: "Oferecemos gestão do Google Ads, campanhas no Facebook e Instagram, otimização de SEO, criação de conteúdo, desenvolvimento de landing pages e relatórios detalhados de performance."
            },
            {
              question: "Vocês trabalham com empresas de qualquer segmento?",
              answer: "Sim! Temos experiência em diversos segmentos incluindo saúde, varejo, serviços, tecnologia e mais. Adaptamos nossas estratégias às necessidades específicas de cada negócio."
            },
            {
              question: "Qual o investimento mínimo para começar?",
              answer: "O investimento varia conforme seus objetivos e mercado. Criaremos uma proposta personalizada durante nossa consulta que se adeque ao seu orçamento e objetivos."
            },
            {
              question: "Como vocês medem o sucesso das campanhas?",
              answer: "Acompanhamos métricas importantes como ROI, taxas de conversão, custo por aquisição, tráfego do site, geração de leads e vendas. Você receberá relatórios mensais detalhados."
            },
            {
              question: "Vocês fornecem suporte e otimização contínua?",
              answer: "Absolutamente! Marketing digital requer monitoramento e otimização constante. Ajustamos continuamente as campanhas para melhorar a performance e maximizar seus resultados."
            }
          ]
        };
    }
  };

  const content = getContent();

  return (
    <section className="section-padding bg-gradient-to-b from-black to-idDarkBlack">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {content.title}
            <span className="block w-20 h-1 bg-idOrange mx-auto mt-4"></span>
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {content.faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openItems.includes(index)}
              onToggle={() => toggleItem(index)}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-6">Ainda tem dúvidas? Entre em contato conosco!</p>
          <a href="https://wa.me/5561999601534?text=Olá! Tenho algumas dúvidas sobre os serviços" target="_blank" rel="noopener noreferrer">
            <button className="btn-primary">
              Fale Conosco
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;