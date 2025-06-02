
import { useState, useEffect, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from './LanguageProvider';

const Contact = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { toast } = useToast();

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const form = e.target as HTMLFormElement;
      const formDataToSend = new FormData(form);
      
      const response = await fetch('https://formsubmit.co/idanunciosonline@gmail.com', {
        method: 'POST',
        body: formDataToSend
      });
      
      if (response.ok || response.status === 0) {
        const content = getContent();
        toast({
          title: content.messageSent,
          description: content.messageSuccess,
          variant: 'default',
        });
        
        setFormSubmitted(true);
        setFormData({
          nome: '',
          email: '',
          telefone: '',
          message: ''
        });
        
        setTimeout(() => {
          setFormSubmitted(false);
        }, 3000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      const content = getContent();
      toast({
        title: content.sendingError,
        description: content.errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getContent = () => {
    switch (language) {
      case 'EN':
        return {
          title: 'Contact Us',
          description: 'We are ready to boost your business with efficient digital strategies.',
          sendMessage: 'Send a Message',
          messageSent: 'Message Sent!',
          messageSuccess: 'Your contact was sent successfully. We will contact you soon!',
          sendingError: 'Sending Error',
          errorMessage: 'An error occurred while sending your message. Please try again.',
          name: 'Name*',
          namePlaceholder: 'Your full name',
          email: 'Email*',
          emailPlaceholder: 'your@email.com',
          phone: 'Phone*',
          phonePlaceholder: 'Your phone number',
          message: 'Message*',
          messagePlaceholder: 'How can we help you?',
          sendMessageBtn: 'Send Message',
          sending: 'Sending...',
          messageConfirm: 'Message Sent!',
          contactSoon: 'We will contact you as soon as possible.',
          contactInfo: 'Contact Information',
          chatWhatsApp: 'Chat on WhatsApp',
          whatsAppDescription: 'Prefer faster communication? Talk directly to our team via WhatsApp.',
          startConversation: 'Start Conversation',
          contactDetails: [
            { title: 'Email', info: 'idanunciosonline@gmail.com' },
            { title: 'Phone', info: '+55 (61) 99960-1534' },
            { title: 'Social Media', info: '@agenciaiddigital' }
          ]
        };
      case 'ES':
        return {
          title: 'Contáctanos',
          description: 'Estamos listos para impulsar tu negocio con estrategias digitales eficientes.',
          sendMessage: 'Enviar un Mensaje',
          messageSent: '¡Mensaje Enviado!',
          messageSuccess: 'Tu contacto fue enviado exitosamente. ¡Nos pondremos en contacto pronto!',
          sendingError: 'Error al Enviar',
          errorMessage: 'Ocurrió un error al enviar tu mensaje. Por favor, inténtalo de nuevo.',
          name: 'Nombre*',
          namePlaceholder: 'Tu nombre completo',
          email: 'Email*',
          emailPlaceholder: 'tu@email.com',
          phone: 'Teléfono*',
          phonePlaceholder: 'Tu número de teléfono',
          message: 'Mensaje*',
          messagePlaceholder: '¿Cómo podemos ayudarte?',
          sendMessageBtn: 'Enviar Mensaje',
          sending: 'Enviando...',
          messageConfirm: '¡Mensaje Enviado!',
          contactSoon: 'Nos pondremos en contacto contigo lo antes posible.',
          contactInfo: 'Información de Contacto',
          chatWhatsApp: 'Chatear por WhatsApp',
          whatsAppDescription: '¿Prefieres una comunicación más rápida? Habla directamente con nuestro equipo vía WhatsApp.',
          startConversation: 'Iniciar Conversación',
          contactDetails: [
            { title: 'Email', info: 'idanunciosonline@gmail.com' },
            { title: 'Teléfono', info: '+55 (61) 99960-1534' },
            { title: 'Redes Sociales', info: '@agenciaiddigital' }
          ]
        };
      default: // PT
        return {
          title: 'Entre em Contato',
          description: 'Estamos prontos para impulsionar o seu negócio com estratégias digitais eficientes.',
          sendMessage: 'Envie uma Mensagem',
          messageSent: 'Mensagem Enviada!',
          messageSuccess: 'Seu contato foi enviado com sucesso. Entraremos em contato em breve!',
          sendingError: 'Erro ao Enviar',
          errorMessage: 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.',
          name: 'Nome*',
          namePlaceholder: 'Seu nome completo',
          email: 'Email*',
          emailPlaceholder: 'seu@email.com',
          phone: 'Telefone*',
          phonePlaceholder: 'Seu número de telefone',
          message: 'Mensagem*',
          messagePlaceholder: 'Como podemos ajudar você?',
          sendMessageBtn: 'Enviar Mensagem',
          sending: 'Enviando...',
          messageConfirm: 'Mensagem Enviada!',
          contactSoon: 'Entraremos em contato o mais breve possível.',
          contactInfo: 'Informações de Contato',
          chatWhatsApp: 'Fale pelo WhatsApp',
          whatsAppDescription: 'Prefere uma comunicação mais rápida? Fale diretamente com nossa equipe via WhatsApp.',
          startConversation: 'Iniciar Conversa',
          contactDetails: [
            { title: 'Email', info: 'idanunciosonline@gmail.com' },
            { title: 'Telefone', info: '+55 (61) 99960-1534' },
            { title: 'Redes Sociais', info: '@agenciaiddigital' }
          ]
        };
    }
  };

  const content = getContent();

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

  const whatsappMessage = getWhatsappMessage();
  const whatsappLink = `https://wa.me/5561999601534?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section id="contact" className="section-padding bg-black relative">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-idOrange/10 rounded-full blur-[120px]"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-on-scroll">
            {content.title}
            <span className="block w-20 h-1 bg-idOrange mx-auto mt-4"></span>
          </h2>
          <p className="text-lg text-gray-300 animate-on-scroll">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="animate-on-scroll">
            <div className="bg-idDarkBlack border border-gray-800 rounded-lg p-6 md:p-8 h-full">
              <h3 className="text-2xl font-bold mb-6">
                {content.sendMessage}
              </h3>
              
              {formSubmitted ? (
                <div className="bg-green-900/20 border border-green-500/30 rounded-md p-4 text-center">
                  <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h4 className="text-xl font-bold text-white mb-2">
                    {content.messageConfirm}
                  </h4>
                  <p className="text-gray-300">
                    {content.contactSoon}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-gray-300 mb-1">
                      {content.name}
                    </label>
                    <Input 
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      placeholder={content.namePlaceholder}
                      className="bg-black/40 border-gray-700 focus:border-idOrange text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      {content.email}
                    </label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={content.emailPlaceholder}
                      className="bg-black/40 border-gray-700 focus:border-idOrange text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="telefone" className="block text-sm font-medium text-gray-300 mb-1">
                      {content.phone}
                    </label>
                    <Input 
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      required
                      placeholder={content.phonePlaceholder}
                      className="bg-black/40 border-gray-700 focus:border-idOrange text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      {content.message}
                    </label>
                    <Textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder={content.messagePlaceholder}
                      className="bg-black/40 border-gray-700 focus:border-idOrange text-white min-h-[120px]"
                    />
                  </div>

                  {/* Hidden fields for FormSubmit.co protection */}
                  <input type="text" name="_honey" style={{display: 'none'}} />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_next" value={window.location.origin + '/#contact'} />

                  <div>
                    <Button 
                      type="submit" 
                      className="btn-primary w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {content.sending}
                        </>
                      ) : content.sendMessageBtn}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
          
          <div className="space-y-6 animate-on-scroll">
            <div className="bg-idDarkBlack border border-gray-800 rounded-lg p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-6">
                {content.contactInfo}
              </h3>
              
              <div className="space-y-6">
                {content.contactDetails.map((contact, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-black/40 p-3 rounded-lg mr-4">
                      {index === 0 ? (
                        <svg className="w-6 h-6 text-idOrange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      ) : index === 1 ? (
                        <svg className="w-6 h-6 text-idOrange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-idOrange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{contact.title}</h4>
                      <p className="text-gray-300">{contact.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-idDarkBlack border border-gray-800 rounded-lg p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-6">
                {content.chatWhatsApp}
              </h3>
              
              <p className="text-gray-300 mb-6">
                {content.whatsAppDescription}
              </p>
              
              <a 
                href={whatsappLink}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md transition-colors duration-300 w-full"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.345.223-.643.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                {content.startConversation}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
