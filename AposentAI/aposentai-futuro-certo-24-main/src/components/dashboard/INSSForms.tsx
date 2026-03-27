import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Copy, Download, CheckCircle } from "lucide-react";

interface FormField {
  id: string;
  label: string;
  value: string;
  required: boolean;
  filled: boolean;
}

const mockFormFields: FormField[] = [
  { id: "nome", label: "Nome Completo", value: "Maria Silva Santos", required: true, filled: true },
  { id: "cpf", label: "CPF", value: "123.456.789-00", required: true, filled: true },
  { id: "rg", label: "RG", value: "12.345.678-9", required: true, filled: true },
  { id: "dataNascimento", label: "Data de Nascimento", value: "15/03/1962", required: true, filled: true },
  { id: "endereco", label: "Endereço", value: "Rua das Flores, 123", required: true, filled: true },
  { id: "cidade", label: "Cidade", value: "São Paulo", required: true, filled: true },
  { id: "cep", label: "CEP", value: "01234-567", required: true, filled: true },
  { id: "telefone", label: "Telefone", value: "(11) 98765-4321", required: false, filled: true },
  { id: "email", label: "E-mail", value: "maria.silva@email.com", required: false, filled: true },
  { id: "estadoCivil", label: "Estado Civil", value: "Casada", required: true, filled: true },
  { id: "profissao", label: "Profissão", value: "Professora", required: true, filled: true },
  { id: "tipoRequerimento", label: "Tipo de Requerimento", value: "Aposentadoria por Idade", required: true, filled: true },
  { id: "dataRequerimento", label: "Data do Requerimento", value: "", required: true, filled: false },
  { id: "observacoes", label: "Observações", value: "", required: false, filled: false }
];

export const INSSForms = () => {
  const [formFields, setFormFields] = useState<FormField[]>(mockFormFields);
  const [isValidated, setIsValidated] = useState(false);

  const requiredFieldsCount = formFields.filter(field => field.required).length;
  const filledRequiredCount = formFields.filter(field => field.required && field.filled).length;
  const completionPercentage = Math.round((filledRequiredCount / requiredFieldsCount) * 100);

  const updateField = (id: string, value: string) => {
    setFormFields(fields => 
      fields.map(field => 
        field.id === id 
          ? { ...field, value, filled: value.trim() !== "" }
          : field
      )
    );
  };

  const validateForm = () => {
    const allRequiredFilled = formFields
      .filter(field => field.required)
      .every(field => field.filled);
    
    setIsValidated(allRequiredFilled);
    return allRequiredFilled;
  };

  const handleExport = () => {
    // Logic to export form data
    console.log("Exporting form data...");
  };

  const handleCopyToClipboard = () => {
    const formData = formFields
      .filter(field => field.filled)
      .map(field => `${field.label}: ${field.value}`)
      .join('\n');
    
    navigator.clipboard.writeText(formData);
  };

  return (
    <Card className="p-6 border-input-border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-foreground">Requerimento Meu INSS</h2>
        <div className="flex items-center space-x-2">
          <Badge className={`text-xs ${
            completionPercentage === 100 
              ? "bg-green-100 text-green-800" 
              : "bg-yellow-100 text-yellow-800"
          }`}>
            {completionPercentage}% Completo
          </Badge>
        </div>
      </div>

      {/* Form Status */}
      <Card className="p-4 mb-6 bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {completionPercentage === 100 ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            )}
            <div>
              <p className="font-medium text-foreground">
                Status do Formulário
              </p>
              <p className="text-sm text-muted-foreground">
                {filledRequiredCount} de {requiredFieldsCount} campos obrigatórios preenchidos
              </p>
            </div>
          </div>
          
          {completionPercentage === 100 && (
            <Badge className="bg-green-100 text-green-800">
              Pronto para envio
            </Badge>
          )}
        </div>
      </Card>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {formFields.map((field) => (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={field.id}
              value={field.value}
              onChange={(e) => updateField(field.id, e.target.value)}
              placeholder={`Digite ${field.label.toLowerCase()}`}
              className={`${
                field.required && !field.filled 
                  ? "border-red-300 focus:border-red-500" 
                  : ""
              }`}
            />
            {field.required && !field.filled && (
              <p className="text-xs text-red-500">Campo obrigatório</p>
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button 
          onClick={validateForm}
          variant={isValidated ? "default" : "outline"}
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          {isValidated ? "Validado" : "Validar Formulário"}
        </Button>
        
        <Button 
          variant="outline"
          onClick={handleCopyToClipboard}
          disabled={completionPercentage < 100}
        >
          <Copy className="w-4 h-4 mr-2" />
          Copiar Dados
        </Button>
        
        <Button 
          variant="outline"
          onClick={handleExport}
          disabled={completionPercentage < 100}
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar PDF
        </Button>
      </div>

      {/* Validation Results */}
      {isValidated && (
        <Card className="p-4 mt-4 bg-green-50 border-green-200">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium text-green-800">Formulário Validado com Sucesso!</p>
              <p className="text-sm text-green-600">
                Todos os campos obrigatórios foram preenchidos. O requerimento está pronto para ser enviado ao INSS.
              </p>
            </div>
          </div>
        </Card>
      )}
    </Card>
  );
};