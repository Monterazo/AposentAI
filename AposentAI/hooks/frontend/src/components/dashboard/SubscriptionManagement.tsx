import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Crown, Calendar, CreditCard, AlertTriangle, CheckCircle, ExternalLink, Sparkles, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const SubscriptionManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentPlan] = useState("trial"); // free, trial, basic, premium, enterprise
  const [subscriptionStatus] = useState("trial"); // active, cancelled, expired, trial
  const [trialDaysLeft] = useState(12);
  const [nextBilling] = useState("2025-01-15");
  const [hasOAB] = useState(true);

  const handleViewPlans = () => {
    navigate("/subscriptions");
  };

  const handleManageSubscription = () => {
    toast({
      title: "Em manutenção",
      description: "O gerenciamento de assinaturas ainda está em desenvolvimento. Tente novamente em breve.",
      variant: "default"
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const getPlanInfo = (planId: string) => {
    const plans = {
      free: { name: "Gratuito", price: 0, color: "secondary" },
      trial: { name: "Teste Gratuito", price: 0, color: "default" },
      basic: { name: "Básico", price: 49.90, color: "default" },
      premium: { name: "Premium", price: 129.90, color: "default" },
      enterprise: { name: "Enterprise", price: 299.90, color: "default" }
    };
    return plans[planId as keyof typeof plans] || plans.free;
  };

  const planInfo = getPlanInfo(currentPlan);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Gerenciar Assinatura</h3>
        <p className="text-sm text-muted-foreground">
          Gerencie seu plano, visualize faturas e atualize suas informações de pagamento
        </p>
      </div>

      <Separator />

      {/* Trial Alert for OAB users */}
      {hasOAB && trialDaysLeft > 0 && subscriptionStatus === "trial" && (
        <Alert className="border-primary bg-primary/5">
          <Sparkles className="h-4 w-4 text-primary" />
          <AlertDescription className="text-primary">
            <strong>Período de Teste:</strong> Você tem {trialDaysLeft} dias restantes do seu teste 
            gratuito de 14 dias no plano Premium por ter OAB ativa.
          </AlertDescription>
        </Alert>
      )}

      {/* Current Plan Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Crown className="w-5 h-5 text-primary" />
              <div>
                <CardTitle className="text-lg">Plano Atual</CardTitle>
                <CardDescription>Sua assinatura ativa</CardDescription>
              </div>
            </div>
            <Badge variant={subscriptionStatus === "active" ? "default" : "secondary"}>
              {subscriptionStatus === "active" ? "Ativo" : 
               subscriptionStatus === "trial" ? "Teste" : 
               subscriptionStatus === "cancelled" ? "Cancelado" : "Expirado"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-foreground">{planInfo.name}</p>
              <p className="text-sm text-muted-foreground">
                {planInfo.price > 0 ? `${formatCurrency(planInfo.price)}/mês` : "Gratuito"}
              </p>
            </div>
            {subscriptionStatus === "active" && (
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Próxima cobrança</p>
                <p className="font-medium text-foreground">{new Date(nextBilling).toLocaleDateString('pt-BR')}</p>
              </div>
            )}
          </div>

          {subscriptionStatus === "active" && (
            <div className="flex items-center space-x-2 text-sm text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span>Assinatura ativa</span>
            </div>
          )}

          {subscriptionStatus === "cancelled" && (
            <div className="flex items-center space-x-2 text-sm text-yellow-600">
              <AlertTriangle className="w-4 h-4" />
              <span>Assinatura cancelada - válida até {new Date(nextBilling).toLocaleDateString('pt-BR')}</span>
            </div>
          )}
        </CardContent>
      </Card>


      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <span>Método de Pagamento</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentPlan === "trial" ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Você está no período de teste gratuito. Configure um método de pagamento para continuar após o período de teste.
              </p>
              <Button variant="outline" size="sm" onClick={handleManageSubscription} className="w-full">
                <Settings className="w-4 h-4 mr-2" />
                Gerenciar Assinatura
              </Button>
            </div>
          ) : currentPlan !== "free" ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  •••• 4242
                </div>
                <div>
                  <p className="font-medium text-foreground">Cartão terminado em 4242</p>
                  <p className="text-sm text-muted-foreground">Expira em 12/2027</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleManageSubscription}>
                <Settings className="w-4 h-4 mr-2" />
                Gerenciar
              </Button>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Nenhum método de pagamento configurado
            </p>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={handleViewPlans} className="flex-1">
          <Crown className="w-4 h-4 mr-2" />
          Ver Todos os Planos
        </Button>
        
        {currentPlan === "trial" && (
          <Button variant="outline" onClick={handleManageSubscription} className="flex-1">
            <Settings className="w-4 h-4 mr-2" />
            Configurar Pagamento
          </Button>
        )}
      </div>

    </div>
  );
};