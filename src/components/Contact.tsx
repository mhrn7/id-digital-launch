
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from './LanguageProvider';
import { useFormMessages } from '@/hooks/useFormMessages';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { language } = useLanguage();
  const { addMessage } = useFormMessages();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const getContent = () => {
    switch (language) {
      case 'EN':
        return {
          title: 'Ready to scale your business?',
          subtitle: 'Contact us and discover how we can help accelerate your company\'s growth.',
          namePlaceholder: 'Your full name',
          emailPlaceholder: 'Your email',
          phonePlaceholder: 'Your phone',
          messagePlaceholder: 'Tell us about your business and goals...',
          sendButton: 'Send Message',
          sending: 'Sending...',
          successMessage: 'Message sent successfully! We will contact you soon.',
          errorMessage: 'Error sending message. Please try again.',
          contactInfo: 'Contact Information'
        };
      case 'ES':
        return {
          title: '¿Listo para escalar tu negocio?',
          subtitle: 'Contáctanos y descubre cómo podemos ayudar a acelerar el crecimiento de tu empresa.',
          namePlaceholder: 'Tu nombre completo',
          emailPlaceholder: 'Tu email',
          phonePlaceholder: 'Tu teléfono',
          messagePlaceholder: 'Cuéntanos sobre tu negocio y objetivos...',
          sendButton: 'Enviar Mensaje',
          sending: 'Enviando...',
          successMessage: '¡Mensaje enviado con éxito! Te contactaremos pronto.',
          errorMessage: 'Error al enviar mensaje. Por favor, inténtalo de nuevo.',
          contactInfo: 'Información de Contacto'
        };
      default: // PT
        return {
          title: 'Pronto para escalar seu negócio?',
          subtitle: 'Entre em contato conosco e descubra como podemos ajudar a acelerar o crescimento da sua empresa.',
          namePlaceholder: 'Seu nome completo',
          emailPlaceholder: 'Seu email',
          phonePlaceholder: 'Seu telefone',
          messagePlaceholder: 'Conte-nos sobre seu negócio e objetivos...',
          sendButton: 'Enviar Mensagem',
          sending: 'Enviando...',
          successMessage: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
          errorMessage: 'Erro ao enviar mensagem. Tente novamente.',
          contactInfo: 'Informações de Contato'
        };
    }
  };

  const content = getContent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Adicionar mensagem ao sistema
      const newMessage = addMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      });

      console.log('Mensagem adicionada ao painel admin:', newMessage);

      // Limpar formulário
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });

      toast({
        title: "Sucesso!",
        description: content.successMessage,
      });

    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      toast({
        title: "Erro",
        description: content.errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <section id="contact" className="section-padding bg-idBlack">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {content.title}
              <span className="block w-20 h-1 bg-idOrange mx-auto mt-4"></span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {content.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    placeholder={content.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-idDarkBlack border-gray-700 text-white"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder={content.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-idDarkBlack border-gray-700 text-white"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder={content.phonePlaceholder}
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-idDarkBlack border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder={content.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="bg-idDarkBlack border-gray-700 text-white min-h-[120px]"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="btn-primary w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? content.sending : content.sendButton}
                </Button>
              </form>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">{content.contactInfo}</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-idOrange/20 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-idOrange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-300">Email</p>
                      <p className="text-white font-semibold">idanunciosonline@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-idOrange/20 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-idOrange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-300">WhatsApp</p>
                      <p className="text-white font-semibold">+55 (61) 99960-1534</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
