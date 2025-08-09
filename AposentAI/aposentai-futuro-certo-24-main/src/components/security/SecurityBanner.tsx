import { Shield, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const SecurityBanner = () => {
  return (
    <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800">
      <Shield className="h-4 w-4 text-amber-600" />
      <AlertDescription className="text-amber-700 dark:text-amber-200">
        <strong>Modo Demonstração:</strong> Este é um ambiente de teste. 
        Não insira dados pessoais reais. Para uso em produção, configure 
        a autenticação e banco de dados adequados.
      </AlertDescription>
    </Alert>
  );
};

export const DevSecurityWarning = () => {
  if (process.env.NODE_ENV === 'production') return null;
  
  return (
    <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800 mb-4">
      <AlertTriangle className="h-4 w-4 text-red-600" />
      <AlertDescription className="text-red-700 dark:text-red-200">
        <strong>Aviso de Segurança:</strong> Este projeto está em modo de desenvolvimento. 
        Implemente autenticação real e criptografia antes do deploy em produção.
      </AlertDescription>
    </Alert>
  );
};