
import { useState } from 'react';

export interface FormMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  status: 'Novo' | 'Respondido';
}

// Simulação de dados iniciais para demonstração
const initialMessages: FormMessage[] = [
  {
    id: 1,
    name: 'Carlos Oliveira',
    email: 'carlos@email.com',
    phone: '+55 (11) 99999-9999',
    message: 'Gostaria de saber mais sobre os serviços de Google Ads para minha empresa.',
    date: '2024-01-20 14:30',
    status: 'Novo'
  },
  {
    id: 2,
    name: 'Ana Costa',
    email: 'ana@startup.com',
    phone: '+55 (21) 88888-8888',
    message: 'Preciso de ajuda com automação de vendas e landing pages.',
    date: '2024-01-19 10:15',
    status: 'Respondido'
  },
  {
    id: 3,
    name: 'Pedro Lima',
    email: 'pedro@comercio.com',
    phone: '+55 (31) 77777-7777',
    message: 'Quero entender melhor como funcionam as campanhas no Facebook e Instagram.',
    date: '2024-01-18 16:45',
    status: 'Novo'
  }
];

export const useFormMessages = () => {
  const [messages, setMessages] = useState<FormMessage[]>(() => {
    // Recupera mensagens do localStorage ou usa dados iniciais
    const savedMessages = localStorage.getItem('formMessages');
    return savedMessages ? JSON.parse(savedMessages) : initialMessages;
  });

  const addMessage = (messageData: Omit<FormMessage, 'id' | 'date' | 'status'>) => {
    const newMessage: FormMessage = {
      ...messageData,
      id: Date.now(), // Usar timestamp como ID único
      date: new Date().toLocaleString('pt-BR'),
      status: 'Novo'
    };
    
    const updatedMessages = [newMessage, ...messages];
    setMessages(updatedMessages);
    localStorage.setItem('formMessages', JSON.stringify(updatedMessages));
    
    console.log('Nova mensagem adicionada:', newMessage);
    return newMessage;
  };

  const updateMessageStatus = (messageId: number, status: 'Novo' | 'Respondido') => {
    const updatedMessages = messages.map(msg => 
      msg.id === messageId ? { ...msg, status } : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem('formMessages', JSON.stringify(updatedMessages));
  };

  const deleteMessage = (messageId: number) => {
    const updatedMessages = messages.filter(msg => msg.id !== messageId);
    setMessages(updatedMessages);
    localStorage.setItem('formMessages', JSON.stringify(updatedMessages));
  };

  return {
    messages,
    addMessage,
    updateMessageStatus,
    deleteMessage
  };
};
