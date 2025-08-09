import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthenticatedLayout } from "@/components/layout/AuthenticatedLayout";
import { useNavigate } from "react-router-dom";
import { Check, Crown, Zap, Star, Home, CreditCard, Sparkles } from "lucide-react";

const Subscriptions = () => {
  const navigate = useNavigate();
  const [currentPlan] = useState("free"); // free, basic, premium, enterprise
  const [trialDaysLeft] = useState(12); // Simulando período de teste
  const [hasOAB] = useState(true); // Simulando usuário com OAB

  const getBreadcrumbTrail = () => [
    {
      href: "/",
      label: "Início",
      icon: Home
    },
    {
      href: "/dashboard", 
      label: "Dashboard",
      icon: Home
    },
    {
      href: "/subscriptions",
      label: "Assinaturas",
      icon: CreditCard,
      current: true
    }
  ];

  const plans = [
    {
      id: "basic",
      name: "Básico",
      price: "R$ 49,90",
      period: "/mês",
      description: "Ideal para advogados iniciantes",
      features: [
        "Até 50 análises por mês",
        "Relatórios básicos",
        "Suporte por email",
        "Simulações de aposentadoria",
        "Armazenamento de 5GB"
      ],
      color: "border-border",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      id: "premium",
      name: "Premium",
      price: "R$ 129,90",
      period: "/mês",
      description: "Para escritórios em crescimento",
      features: [
        "Análises ilimitadas",
        "Relatórios avançados e personalizados",
        "Suporte prioritário",
        "Integrações com sistemas jurídicos",
        "Armazenamento de 50GB",
        "Dashboard analytics",
        "Exportação em múltiplos formatos"
      ],
      color: "border-primary",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "R$ 299,90",
      period: "/mês",
      description: "Para grandes escritórios",
      features: [
        "Tudo do Premium",
        "API personalizada",
        "Suporte 24/7",
        "Treinamento da equipe",
        "Armazenamento ilimitado",
        "White-label disponível",
        "Gerenciamento de usuários",
        "Relatórios corporativos"
      ],
      color: "border-yellow-500",
      buttonVariant: "outline" as const,
      popular: false
    }
  ];

  const handleSubscribe = (planId: string) => {
    // Aqui integraria com Stripe
    console.log(`Assinando plano: ${planId}`);
  };

  const handleManageSubscription = () => {
    // Aqui abriria o portal do Stripe
    console.log("Abrindo portal de gerenciamento");
  };

  return (
    <AuthenticatedLayout breadcrumbItems={getBreadcrumbTrail()}>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Escolha o plano ideal para você
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Potencialize seu trabalho com ferramentas avançadas de análise previdenciária
          </p>
        </div>

        {/* Trial Alert for OAB users */}
        {hasOAB && trialDaysLeft > 0 && (
          <Alert className="mb-8 border-primary bg-primary/5">
            <Sparkles className="h-4 w-4 text-primary" />
            <AlertDescription className="text-primary">
              <strong>Parabéns!</strong> Como advogado com OAB ativa, você tem {trialDaysLeft} dias restantes 
              do seu período de teste gratuito de 14 dias no plano Premium. 
              Aproveite todos os recursos avançados!
            </AlertDescription>
          </Alert>
        )}

        {/* Current Plan Status */}
        {currentPlan !== "free" && (
          <Card className="mb-8 border-primary bg-primary/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-primary" />
                    Plano Atual: Premium
                  </CardTitle>
                  <CardDescription>
                    Sua assinatura está ativa até 15 de Janeiro de 2025
                  </CardDescription>
                </div>
                <Button variant="outline" onClick={handleManageSubscription}>
                  Gerenciar Assinatura
                </Button>
              </div>
            </CardHeader>
          </Card>
        )}

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <Card key={plan.id} className={`relative ${plan.color} ${plan.popular ? 'shadow-lg scale-105' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  <Star className="w-3 h-3 mr-1" />
                  Mais Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="pt-4">
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </CardContent>
              
              <CardFooter>
                <Button 
                  variant={plan.buttonVariant}
                  className="w-full"
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={currentPlan === plan.id}
                >
                  {currentPlan === plan.id ? (
                    "Plano Atual"
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Assinar {plan.name}
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="text-center space-y-8">
          <h2 className="text-2xl font-bold text-foreground">
            Por que escolher o AposentAI?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Análise Rápida</h3>
              <p className="text-sm text-muted-foreground">
                Processe documentos previdenciários em segundos com nossa IA avançada
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Crown className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Precisão Garantida</h3>
              <p className="text-sm text-muted-foreground">
                Algoritmos treinados com milhares de casos reais do INSS
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Suporte Especializado</h3>
              <p className="text-sm text-muted-foreground">
                Equipe de especialistas em direito previdenciário sempre disponível
              </p>
            </div>
          </div>
        </div>

        {/* FAQ or additional info could go here */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Tem dúvidas? Entre em contato conosco pelo{" "}
            <Button variant="link" className="h-auto p-0 text-primary">
              support@aposentai.com
            </Button>
          </p>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Subscriptions;