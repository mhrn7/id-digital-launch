
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Mail, Phone, User } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

interface Message {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  date: string;
  status: 'Novo' | 'Respondido';
  type?: 'contact' | 'password-recovery';
}

interface MessageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: Message | null;
  onClose?: () => void;
}

const MessageModal: React.FC<MessageModalProps> = ({ open, onOpenChange, message, onClose }) => {
  const { language } = useLanguage();

  const translations = {
    PT: {
      messageDetails: 'Detalhes da Mensagem',
      from: 'De',
      email: 'Email',
      phone: 'Telefone',
      message: 'Mensagem',
      close: 'Fechar'
    },
    EN: {
      messageDetails: 'Message Details',
      from: 'From',
      email: 'Email',
      phone: 'Phone',
      message: 'Message',
      close: 'Close'
    },
    ES: {
      messageDetails: 'Detalles del Mensaje',
      from: 'De',
      email: 'Email',
      phone: 'Teléfono',
      message: 'Mensaje',
      close: 'Cerrar'
    }
  };

  const t = translations[language];

  // Don't render if message is null
  if (!message) {
    return null;
  }

  const handleClose = () => {
    onOpenChange(false);
    onClose?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-idDarkBlack border-gray-800 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-idOrange" />
            {t.messageDetails}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Mensagem recebida através do formulário de contato
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-300">
                <User className="w-4 h-4" />
                {t.from}
              </Label>
              <div className="p-3 bg-idBlack rounded-md border border-gray-700">
                <p className="text-white">{message.name}</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-300">
                <Phone className="w-4 h-4" />
                {t.phone}
              </Label>
              <div className="p-3 bg-idBlack rounded-md border border-gray-700">
                <p className="text-white">{message.phone || 'Não informado'}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-gray-300">
              <Mail className="w-4 h-4" />
              {t.email}
            </Label>
            <div className="p-3 bg-idBlack rounded-md border border-gray-700">
              <p className="text-white">{message.email}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">{t.message}</Label>
            <div className="p-4 bg-idBlack rounded-md border border-gray-700 min-h-[120px]">
              <p className="text-white whitespace-pre-wrap">{message.message}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={handleClose}
            className="bg-idOrange hover:bg-idOrange/90 text-black"
          >
            {t.close}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Helper component for labels
const Label: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <label className={`text-sm font-medium ${className}`}>
    {children}
  </label>
);

export default MessageModal;
