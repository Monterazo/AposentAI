import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Check, X, Home, UserPlus } from "lucide-react";
import { sanitizeInput, isValidEmail, isValidOAB } from "@/lib/utils";

const Register = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    gender: "",
    profileName: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    oab: "",
    uf: "",
    password: ""
  });
  const navigate = useNavigate();

  // Additional validation for profile name
  const isValidProfileName = (name: string) => {
    return name.length >= 2 && name.length <= 50 && /^[a-zA-ZÀ-ÿ\s]+$/.test(name);
  };

  // Password validation
  const getPasswordValidation = (password: string) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
  };

  const passwordValidation = getPasswordValidation(formData.password);
  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, canProceed: boolean) => {
    if (e.key === 'Enter' && canProceed) {
      if (step < 4) {
        handleNext();
      } else {
        handleFinish();
      }
    }
  };

  const handleFinish = () => {
    // Simular cadastro - redirecionar para confirmação de e-mail
    navigate(`/email-confirmation?email=${encodeURIComponent(formData.email)}`);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {[1, 2, 3, 4].map((num) => (
        <div key={num} className="flex items-center">
          <button 
            onClick={() => num <= step && setStep(num)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
              num === step ? 'bg-foreground text-background' : 
              num < step ? 'bg-foreground text-background cursor-pointer hover:bg-foreground/80' : 'bg-muted text-muted-foreground'
            } ${num <= step ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            disabled={num > step}
          >
            {num}
          </button>
          {num < 4 && <div className="w-12 h-px bg-border mx-2"></div>}
        </div>
      ))}
    </div>
  );

  const renderStepLabels = () => (
    <div className="flex justify-center space-x-8 mb-12">
      <span className={`text-sm ${step >= 1 ? 'text-foreground' : 'text-muted-foreground'}`}>
        E-mail
      </span>
      <span className={`text-sm ${step >= 2 ? 'text-foreground' : 'text-muted-foreground'}`}>
        Dados Básicos
      </span>
      <span className={`text-sm ${step >= 3 ? 'text-foreground' : 'text-muted-foreground'}`}>
        OAB
      </span>
      <span className={`text-sm ${step >= 4 ? 'text-foreground' : 'text-muted-foreground'}`}>
        Senha
      </span>
    </div>
  );

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
                <UserPlus className="w-4 h-4 mr-2" />
                Cadastro
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">AposentAI</h1>
          <p className="text-sm text-muted-foreground">
            Já tem uma conta? <Link to="/auth/login" className="text-primary hover:underline">Fazer login</Link>
          </p>
        </div>

        {renderStepIndicator()}
        {renderStepLabels()}

        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-medium text-foreground mb-8">
                Digite seu endereço de e-mail
              </h2>
            </div>
            
            <div className="max-w-md mx-auto space-y-2">
              <Input
                type="email"
                placeholder="Digite seu e-mail"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: sanitizeInput(e.target.value)})}
                onKeyPress={(e) => handleKeyPress(e, !!(formData.email && isValidEmail(formData.email)))}
                className={formData.email && !isValidEmail(formData.email) ? "border-destructive" : ""}
              />
              {formData.email && !isValidEmail(formData.email) && (
                <p className="text-xs text-destructive">Por favor, digite um e-mail válido</p>
              )}
            </div>

            <div className="flex justify-center">
              <Button 
                onClick={handleNext}
                variant={formData.email && isValidEmail(formData.email) ? "default" : "form"}
                className="px-16"
                disabled={!formData.email || !isValidEmail(formData.email)}
              >
                Próximo
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 max-w-lg mx-auto">
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Label className="text-lg font-medium text-foreground">
                  Forneça suas informações básicas
                </Label>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-foreground mb-3 block">
                    Qual é o seu gênero?
                  </Label>
                  <RadioGroup 
                    value={formData.gender} 
                    onValueChange={(value) => setFormData({...formData, gender: value})}
                    className="flex flex-wrap gap-4 justify-center"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mulher" id="mulher" />
                      <Label htmlFor="mulher" className="cursor-pointer">Mulher</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="homem" id="homem" />
                      <Label htmlFor="homem" className="cursor-pointer">Homem</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nao-binario" id="nao-binario" />
                      <Label htmlFor="nao-binario" className="cursor-pointer">Não binário</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">Nome do perfil</Label>
                  <Input
                    placeholder="Digite o nome do seu perfil"
                    value={formData.profileName}
                    onChange={(e) => setFormData({...formData, profileName: sanitizeInput(e.target.value)})}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">Data de nascimento</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <Select value={formData.birthDay} onValueChange={(value) => setFormData({...formData, birthDay: value})}>
                      <SelectTrigger className="bg-input border-input-border text-foreground">
                        <SelectValue placeholder="Dia" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        {Array.from({length: 31}, (_, i) => (
                          <SelectItem key={i+1} value={String(i+1)} className="hover:bg-accent focus:bg-accent">
                            {i+1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select value={formData.birthMonth} onValueChange={(value) => setFormData({...formData, birthMonth: value})}>
                      <SelectTrigger className="bg-input border-input-border text-foreground">
                        <SelectValue placeholder="Mês" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        {["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
                          "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"].map((month, i) => (
                          <SelectItem key={i+1} value={String(i+1)} className="hover:bg-accent focus:bg-accent">
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select value={formData.birthYear} onValueChange={(value) => setFormData({...formData, birthYear: value})}>
                      <SelectTrigger className="bg-input border-input-border text-foreground">
                        <SelectValue placeholder="Ano" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border max-h-60">
                        {Array.from({length: 80}, (_, i) => {
                          const year = new Date().getFullYear() - i;
                          return (
                            <SelectItem key={year} value={String(year)} className="hover:bg-accent focus:bg-accent">
                              {year}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

              </div>
            </div>

            <div className="flex justify-center">
              <Button 
                onClick={handleNext}
                variant={!formData.gender || !formData.profileName || !isValidProfileName(formData.profileName) || !formData.birthDay || !formData.birthMonth || !formData.birthYear ? "form" : "default"}
                className="px-16"
                disabled={!formData.gender || !formData.profileName || !isValidProfileName(formData.profileName) || !formData.birthDay || !formData.birthMonth || !formData.birthYear}
              >
                Próximo
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 max-w-lg mx-auto">
            <div className="text-center mb-6">
              <Label className="text-lg font-medium text-foreground">
                Informações da OAB
              </Label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Número da OAB</Label>
                <Input
                  placeholder="Ex: 123456"
                  value={formData.oab}
                  onChange={(e) => setFormData({...formData, oab: sanitizeInput(e.target.value)})}
                  onKeyPress={(e) => handleKeyPress(e, !!(formData.oab && formData.uf))}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Estado (UF)</Label>
                <Select value={formData.uf} onValueChange={(value) => setFormData({...formData, uf: value})}>
                  <SelectTrigger className="bg-input border-input-border text-foreground">
                    <SelectValue placeholder="UF" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"].map(state => (
                      <SelectItem key={state} value={state} className="hover:bg-accent focus:bg-accent">
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-center">
              <Button 
                onClick={handleNext}
                variant={!formData.oab || !isValidOAB(formData.oab) || !formData.uf ? "form" : "default"}
                className="px-16"
                disabled={!formData.oab || !isValidOAB(formData.oab) || !formData.uf}
              >
                Próximo
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 max-w-md mx-auto">
            <div className="text-center">
              <h2 className="text-xl font-medium text-foreground mb-8">
                Finalize o seu cadastro
              </h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Senha</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    onKeyPress={(e) => handleKeyPress(e, isPasswordValid)}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {formData.password && (
                <div className="space-y-2 p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs font-medium text-foreground mb-2">Sua senha deve conter:</p>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      {passwordValidation.length ? (
                        <Check size={12} className="text-green-600" />
                      ) : (
                        <X size={12} className="text-red-500" />
                      )}
                      <span className={`text-xs ${passwordValidation.length ? 'text-green-600' : 'text-muted-foreground'}`}>
                        Pelo menos 8 caracteres
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {passwordValidation.uppercase ? (
                        <Check size={12} className="text-green-600" />
                      ) : (
                        <X size={12} className="text-red-500" />
                      )}
                      <span className={`text-xs ${passwordValidation.uppercase ? 'text-green-600' : 'text-muted-foreground'}`}>
                        Uma letra maiúscula
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {passwordValidation.lowercase ? (
                        <Check size={12} className="text-green-600" />
                      ) : (
                        <X size={12} className="text-red-500" />
                      )}
                      <span className={`text-xs ${passwordValidation.lowercase ? 'text-green-600' : 'text-muted-foreground'}`}>
                        Uma letra minúscula
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {passwordValidation.number ? (
                        <Check size={12} className="text-green-600" />
                      ) : (
                        <X size={12} className="text-red-500" />
                      )}
                      <span className={`text-xs ${passwordValidation.number ? 'text-green-600' : 'text-muted-foreground'}`}>
                        Um número
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {passwordValidation.special ? (
                        <Check size={12} className="text-green-600" />
                      ) : (
                        <X size={12} className="text-red-500" />
                      )}
                      <span className={`text-xs ${passwordValidation.special ? 'text-green-600' : 'text-muted-foreground'}`}>
                        Um símbolo (!@#$%^&*)
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center">
              <Button 
                onClick={handleFinish}
                variant={!isPasswordValid ? "form" : "default"}
                className="px-16"
                disabled={!isPasswordValid}
              >
                Concluir cadastro
              </Button>
            </div>
          </div>
        )}

        </div>
      </div>
    </div>
  );
};

export default Register;