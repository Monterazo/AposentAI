import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Mail, Check, Home, UserCheck, RefreshCw } from "lucide-react";

const EmailConfirmation = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasResent, setHasResent] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeRemaining]);

  const handleVerifyCode = async () => {
    if (verificationCode.length !== 6) return;
    
    setIsLoading(true);
    
    // Simular verificação do código
    setTimeout(() => {
      setIsLoading(false);
      // Redirecionar para dashboard após verificação bem-sucedida
      navigate("/dashboard");
    }, 1500);
  };

  const handleResendCode = async () => {
    setHasResent(true);
    setCanResend(false);
    setTimeRemaining(60);
    
    // Simular reenvio do código
    setTimeout(() => {
      setHasResent(false);
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="flex items-center">
                <Home className="w-4 h-4 mr-2" />
                Página Inicial
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center">
                <UserCheck className="w-4 h-4 mr-2" />
                Confirmação de E-mail
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Confirme seu e-mail</h1>
            <p className="text-sm text-muted-foreground">
              Enviamos um código de verificação para
            </p>
            <p className="text-sm font-medium text-foreground">{email}</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Código de verificação
              </label>
              <Input
                type="text"
                placeholder="Digite o código de 6 dígitos"
                value={verificationCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setVerificationCode(value);
                }}
                maxLength={6}
                className="text-center text-lg tracking-widest"
              />
              <p className="text-xs text-muted-foreground text-center">
                Verifique sua caixa de entrada e spam
              </p>
            </div>

            {hasResent && (
              <Alert>
                <Check className="h-4 w-4" />
                <AlertDescription>
                  Código reenviado com sucesso!
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <Button 
                onClick={handleVerifyCode}
                disabled={verificationCode.length !== 6 || isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Verificando...
                  </>
                ) : (
                  "Confirmar E-mail"
                )}
              </Button>

              <div className="text-center">
                {!canResend ? (
                  <p className="text-sm text-muted-foreground">
                    Reenviar código em {formatTime(timeRemaining)}
                  </p>
                ) : (
                  <Button 
                    variant="ghost" 
                    onClick={handleResendCode}
                    className="text-sm"
                  >
                    Reenviar código
                  </Button>
                )}
              </div>
            </div>

            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground">
                Não recebeu o e-mail?{" "}
                <Link to="/auth/register" className="text-primary hover:underline">
                  Tentar outro endereço
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmation;