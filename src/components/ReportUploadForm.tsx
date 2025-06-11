
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/components/LanguageProvider';
import { v4 as uuidv4 } from 'uuid';

interface Client {
  id: string;
  name: string;
  email: string;
}

interface Report {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  date: string;
  fileUrl: string;
}

interface ReportUploadFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (report: Report) => void;
  clients: Client[];
  selectedClient: Client | null;
}

const ReportUploadForm: React.FC<ReportUploadFormProps> = ({
  open,
  onOpenChange,
  onSubmit,
  clients,
  selectedClient
}) => {
  const { language } = useLanguage();
  const [title, setTitle] = useState('');
  const [clientId, setClientId] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedClient) {
      setClientId(selectedClient.id);
    } else {
      setClientId('');
    }
    
    // Reset form when dialog is opened
    if (open) {
      setTitle('');
      setFile(null);
      setFileUrl('');
      setError('');
    }
  }, [open, selectedClient]);

  const translations = {
    PT: {
      uploadReport: 'Enviar Relatório',
      reportDescription: 'Envie um relatório para um cliente',
      client: 'Cliente',
      selectClient: 'Selecione um cliente',
      reportTitle: 'Título do Relatório',
      reportFile: 'Arquivo do Relatório',
      submit: 'Enviar',
      cancel: 'Cancelar',
      errorClient: 'Selecione um cliente',
      errorTitle: 'Informe um título para o relatório',
      errorFile: 'Selecione um arquivo para o relatório',
      uploadPdf: 'Enviar PDF',
      chooseFile: 'Escolher arquivo',
      noFileSelected: 'Nenhum arquivo selecionado'
    },
    EN: {
      uploadReport: 'Upload Report',
      reportDescription: 'Upload a report for a client',
      client: 'Client',
      selectClient: 'Select a client',
      reportTitle: 'Report Title',
      reportFile: 'Report File',
      submit: 'Submit',
      cancel: 'Cancel',
      errorClient: 'Please select a client',
      errorTitle: 'Please enter a report title',
      errorFile: 'Please select a file for the report',
      uploadPdf: 'Upload PDF',
      chooseFile: 'Choose file',
      noFileSelected: 'No file selected'
    },
    ES: {
      uploadReport: 'Subir Informe',
      reportDescription: 'Sube un informe para un cliente',
      client: 'Cliente',
      selectClient: 'Selecciona un cliente',
      reportTitle: 'Título del Informe',
      reportFile: 'Archivo del Informe',
      submit: 'Enviar',
      cancel: 'Cancelar',
      errorClient: 'Por favor selecciona un cliente',
      errorTitle: 'Por favor ingresa un título para el informe',
      errorFile: 'Por favor selecciona un archivo para el informe',
      uploadPdf: 'Subir PDF',
      chooseFile: 'Elegir archivo',
      noFileSelected: 'Ningún archivo seleccionado'
    }
  };

  const t = translations[language];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Create a temporary URL for the file
      const url = URL.createObjectURL(selectedFile);
      setFileUrl(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!clientId) {
      setError(t.errorClient);
      return;
    }
    
    if (!title.trim()) {
      setError(t.errorTitle);
      return;
    }
    
    if (!file) {
      setError(t.errorFile);
      return;
    }
    
    const selectedClientData = clients.find(c => c.id === clientId);
    if (!selectedClientData) return;
    
    const newReport: Report = {
      id: uuidv4(),
      clientId,
      clientName: selectedClientData.name,
      title,
      date: new Date().toISOString(),
      fileUrl: fileUrl // In a real app, this would be a URL to the uploaded file
    };
    
    onSubmit(newReport);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-idDarkBlack border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-idOrange">{t.uploadReport}</DialogTitle>
          <DialogDescription className="text-gray-400">
            {t.reportDescription}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Client Selection */}
          <div>
            <Label htmlFor="client">{t.client}</Label>
            <Select 
              value={clientId} 
              onValueChange={setClientId}
              disabled={Boolean(selectedClient)}
            >
              <SelectTrigger className="bg-idBlack border-gray-700 text-white">
                <SelectValue placeholder={t.selectClient} />
              </SelectTrigger>
              <SelectContent className="bg-idBlack border-gray-700 text-white">
                {clients.map(client => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Report Title */}
          <div>
            <Label htmlFor="title">{t.reportTitle}</Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="bg-idBlack border-gray-700 text-white"
            />
          </div>
          
          {/* File Upload */}
          <div>
            <Label htmlFor="file">{t.reportFile}</Label>
            <div className="flex items-center gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => document.getElementById('file-input')?.click()}
                className="border-gray-700"
              >
                {t.chooseFile}
              </Button>
              <span className="text-gray-400">
                {file ? file.name : t.noFileSelected}
              </span>
              <input
                id="file-input"
                type="file"
                onChange={handleFileChange}
                accept=".pdf"
                className="hidden"
              />
            </div>
          </div>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => onOpenChange(false)}
              className="text-gray-400 hover:text-white"
            >
              {t.cancel}
            </Button>
            <Button 
              type="submit"
              className="bg-idOrange hover:bg-idOrange/90 text-black"
            >
              {t.submit}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportUploadForm;
