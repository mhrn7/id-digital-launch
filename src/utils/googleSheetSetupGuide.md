
# Configuração da Integração com Google Sheets

## Passos para configurar a integração do formulário com Google Sheets

### 1. Crie uma planilha no Google Sheets
1. Acesse [Google Sheets](https://sheets.google.com/) com sua conta (idanunciosonline@gmail.com)
2. Crie uma nova planilha
3. Renomeie a primeira aba para "Contatos do Site" ou nome de sua preferência
4. Adicione os cabeçalhos na primeira linha: Data/Hora, Nome, Email, Telefone, Mensagem

### 2. Crie um Script do Google Apps Script
1. Na planilha, clique em "Extensões" > "Apps Script"
2. Cole o código abaixo no editor:

```javascript
// Cole este código no Google Apps Script
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Contatos do Site");
  
  const data = e.parameter;
  const timestamp = new Date();
  
  sheet.appendRow([
    timestamp,
    data.name,
    data.email,
    data.phone,
    data.message
  ]);
  
  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Salve o projeto com um nome como "FormularioSite"

### 3. Implante o Script como Web App
1. Clique em "Implantar" > "Nova implantação"
2. Selecione "Web app" como o tipo
3. Defina:
   - Descrição: "Integração formulário site"
   - Execute como: "Eu" (sua conta Google)
   - Quem tem acesso: "Qualquer pessoa" (para receber dados do formulário)
4. Clique em "Implantar" e autorize o acesso solicitado
5. Copie a URL da Web App que será gerada (algo como https://script.google.com/macros/s/SEU_ID_ÚNICO/exec)

### 4. Atualize o código do site
Substitua o placeholder `YOUR_SCRIPT_ID_HERE` no arquivo de contato com o ID real do seu script implantado.

Exemplo:
```javascript
const scriptUrl = 'https://script.google.com/macros/s/SEU_ID_ÚNICO/exec';
```

### Observações importantes
- A planilha e o script devem ser criados na mesma conta Google (idanunciosonline@gmail.com)
- Você pode personalizar os campos conforme necessário
- Teste o formulário após a configuração para garantir que os dados estão sendo registrados corretamente
- Considere adicionar proteção CORS se necessário para maior segurança
