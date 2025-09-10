
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from './LanguageProvider';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    message: ''
  });

  const getContent = () => {
    switch (language) {
      case 'EN':
        return {
          title: 'Ready to scale your business?',
          subtitle: 'Contact us and discover how we can help accelerate your company\'s growth.',
          namePlaceholder: 'Your full name',
          companyPlaceholder: 'Your company',
          phonePlaceholder: 'Your phone',
          messagePlaceholder: 'Tell us about your business and goals...',
          sendButton: 'Contact on WhatsApp',
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
          companyPlaceholder: 'Tu empresa',
          phonePlaceholder: 'Tu teléfono',
          messagePlaceholder: 'Cuéntanos sobre tu negocio y objetivos...',
          sendButton: 'Contactar en WhatsApp',
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
          companyPlaceholder: 'Sua empresa',
          phonePlaceholder: 'Seu telefone',
          messagePlaceholder: 'Conte-nos sobre seu negócio e objetivos...',
          sendButton: 'Contatar no WhatsApp',
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
    
    if (!formData.name || !formData.phone || !formData.message) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to Supabase
      const { error } = await supabase
        .from('form_submissions')
        .insert([
          {
            name: formData.name,
            phone: formData.phone,
            company: formData.company,
            message: formData.message
          }
        ]);

      if (error) throw error;

      // Redirect to WhatsApp with form data
      const phoneNumber = "5561999601534";
      const whatsappMessage = `Olá! Meu nome é ${formData.name}${formData.company ? ` da empresa ${formData.company}` : ''}. ${formData.message}`;
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Clear form
      setFormData({
        name: '',
        phone: '',
        company: '',
        message: ''
      });

      toast({
        title: "Sucesso!",
        description: content.successMessage,
      });

      // Open WhatsApp
      window.open(whatsappURL, '_blank');

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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    placeholder={content.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-idDarkBlack border-gray-700 text-white placeholder:text-gray-400 focus:border-idOrange transition-colors"
                    required
                  />
                  <Input
                    type="tel"
                    placeholder={content.phonePlaceholder}
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-idDarkBlack border-gray-700 text-white placeholder:text-gray-400 focus:border-idOrange transition-colors"
                    required
                  />
                </div>
                <Input
                  type="text"
                  placeholder={content.companyPlaceholder}
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="bg-idDarkBlack border-gray-700 text-white placeholder:text-gray-400 focus:border-idOrange transition-colors"
                />
                <Textarea
                  placeholder={content.messagePlaceholder}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="bg-idDarkBlack border-gray-700 text-white placeholder:text-gray-400 focus:border-idOrange transition-colors min-h-[120px] resize-none"
                  required
                />
                <Button
                  type="submit"
                  className="btn-primary w-full h-12 text-lg font-semibold hover:scale-105 transition-all duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                      {content.sending}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                      </svg>
                      {content.sendButton}
                    </div>
                  )}
                </Button>
              </form>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-6 text-center lg:text-left">{content.contactInfo}</h3>
                <div className="space-y-6">
                  <a 
                    href="https://wa.me/5561999601534?text=Olá! Gostaria de saber mais sobre os serviços da Agência iD." 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-green-500/10 border border-green-500/20 rounded-xl hover:bg-green-500/20 transition-all duration-200 group"
                  >
                    <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-green-400 font-medium">WhatsApp</p>
                      <p className="text-white font-semibold text-lg">+55 (61) 99960-1534</p>
                      <p className="text-gray-400 text-sm">Clique para conversar conosco</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="bg-gradient-to-br from-idOrange/10 to-yellow-500/10 border border-idOrange/20 rounded-xl p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-idOrange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-idOrange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Resposta Rápida</h4>
                  <p className="text-gray-300 text-sm">Respondemos em até 30 minutos durante horário comercial</p>
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
