
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/components/LanguageProvider';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  plan: string;
  currency: string;
  monthlyValue: number;
}

interface ClientFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (client: Client, isEdit: boolean) => void;
  editingClient: Client | null;
}

const ClientForm: React.FC<ClientFormProps> = ({ open, onOpenChange, onSubmit, editingClient }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    plan: '',
    currency: '',
    monthlyValue: 0
  });
  const { language } = useLanguage();

  const translations = {
    PT: {
      addClient: 'Adicionar Cliente',
      editClient: 'Editar Cliente',
      name: 'Nome',
      email: 'Email',
      phone: 'Telefone',
      password: 'Senha',
      plan: 'Plano',
      selectPlan: 'Selecione um plano',
      basicPlan: 'Start',
      standardPlan: 'Pro',
      currency: 'Moeda',
      selectCurrency: 'Selecione a moeda',
      monthlyValue: 'Valor Mensal',
      save: 'Salvar',
      cancel: 'Cancelar'
    },
    EN: {
      addClient: 'Add Client',
      editClient: 'Edit Client',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      password: 'Password',
      plan: 'Plan',
      selectPlan: 'Select a plan',
      basicPlan: 'Start',
      standardPlan: 'Pro',
      currency: 'Currency',
      selectCurrency: 'Select currency',
      monthlyValue: 'Monthly Value',
      save: 'Save',
      cancel: 'Cancel'
    },
    ES: {
      addClient: 'Añadir Cliente',
      editClient: 'Editar Cliente',
      name: 'Nombre',
      email: 'Email',
      phone: 'Teléfono',
      password: 'Contraseña',
      plan: 'Plan',
      selectPlan: 'Selecciona un plan',
      basicPlan: 'Start',
      standardPlan: 'Pro',
      currency: 'Moneda',
      selectCurrency: 'Selecciona moneda',
      monthlyValue: 'Valor Mensual',
      save: 'Guardar',
      cancel: 'Cancelar'
    }
  };

  const t = translations[language];

  useEffect(() => {
    if (editingClient) {
      setFormData({
        name: editingClient.name || '',
        email: editingClient.email || '',
        phone: editingClient.phone || '',
        password: editingClient.password || '',
        plan: editingClient.plan || '',
        currency: editingClient.currency || '',
        monthlyValue: editingClient.monthlyValue || 0
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        plan: '',
        currency: '',
        monthlyValue: 0
      });
    }
  }, [editingClient, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const clientData = {
      id: editingClient?.id || Date.now().toString(),
      ...formData
    };

    onSubmit(clientData, !!editingClient);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-idDarkBlack border-gray-800 text-white max-w-md">
        <DialogHeader>
          <DialogTitle>{editingClient ? t.editClient : t.addClient}</DialogTitle>
          <DialogDescription className="text-gray-400">
            {editingClient ? 'Edite as informações do cliente' : 'Adicione um novo cliente ao sistema'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">{t.name}</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="bg-idBlack border-gray-700 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">{t.email}</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="bg-idBlack border-gray-700 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white">{t.phone}</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="bg-idBlack border-gray-700 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">{t.password}</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="bg-idBlack border-gray-700 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="plan" className="text-white">{t.plan}</Label>
            <Select value={formData.plan} onValueChange={(value) => handleInputChange('plan', value)}>
              <SelectTrigger className="bg-idBlack border-gray-700 text-white">
                <SelectValue placeholder={t.selectPlan} />
              </SelectTrigger>
              <SelectContent className="bg-idDarkBlack border-gray-700">
                <SelectItem value="Start">{t.basicPlan}</SelectItem>
                <SelectItem value="Pro">{t.standardPlan}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency" className="text-white">{t.currency}</Label>
            <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
              <SelectTrigger className="bg-idBlack border-gray-700 text-white">
                <SelectValue placeholder={t.selectCurrency} />
              </SelectTrigger>
              <SelectContent className="bg-idDarkBlack border-gray-700">
                <SelectItem value="BRL">Real (BRL)</SelectItem>
                <SelectItem value="USD">Dólar (USD)</SelectItem>
                <SelectItem value="EUR">Euro (EUR)</SelectItem>
                <SelectItem value="GBP">Libra (GBP)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyValue" className="text-white">{t.monthlyValue}</Label>
            <Input
              id="monthlyValue"
              type="number"
              value={formData.monthlyValue}
              onChange={(e) => handleInputChange('monthlyValue', parseFloat(e.target.value) || 0)}
              className="bg-idBlack border-gray-700 text-white"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="flex gap-2">
            <Button 
              type="submit" 
              className="bg-idOrange hover:bg-idOrange/90 text-black"
            >
              {t.save}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="border-gray-700 text-white hover:bg-gray-800"
            >
              {t.cancel}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ClientForm;
