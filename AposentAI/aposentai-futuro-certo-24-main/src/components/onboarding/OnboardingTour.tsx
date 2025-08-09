import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ArrowRight, ArrowLeft, Lightbulb, Target, Users, FileText } from "lucide-react";

interface TourStep {
  id: string;
  title: string;
  description: string;
  target: string;
  icon: any;
  position: "top" | "bottom" | "left" | "right";
}

const tourSteps: TourStep[] = [
  {
    id: "welcome",
    title: "Bem-vindo ao AposentAI!",
    description: "Vamos te guiar pelos principais recursos da plataforma em 4 passos simples.",
    target: "body",
    icon: Lightbulb,
    position: "bottom"
  },
  {
    id: "dashboard",
    title: "Dashboard Inteligente",
    description: "Aqui você visualiza todos os seus casos ativos, estatísticas e progresso em tempo real.",
    target: "[data-tour='dashboard-stats']",
    icon: Target,
    position: "bottom"
  },
  {
    id: "clients",
    title: "Gestão de Clientes",
    description: "Adicione novos clientes, acompanhe status e gerencie documentos de forma organizada.",
    target: "[data-tour='client-section']",
    icon: Users,
    position: "top"
  },
  {
    id: "analysis",
    title: "Análise IA",
    description: "Nossa IA analisa documentos previdenciários e sugere as melhores estratégias para cada caso.",
    target: "[data-tour='analysis-tools']",
    icon: FileText,
    position: "left"
  }
];

interface OnboardingTourProps {
  isVisible: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

export const OnboardingTour = ({ isVisible, onComplete, onSkip }: OnboardingTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsActive(true);
      setCurrentStep(0);
    }
  }, [isVisible]);

  const currentTourStep = tourSteps[currentStep];
  const isLastStep = currentStep === tourSteps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    setIsActive(false);
    onComplete();
  };

  const handleSkip = () => {
    setIsActive(false);
    onSkip();
  };

  if (!isActive) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50" />
      
      {/* Tour Card */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4">
        <Card className="p-6 bg-card border-primary/20 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <currentTourStep.icon className="w-5 h-5 text-primary" />
              </div>
              <Badge variant="secondary" className="text-xs">
                {currentStep + 1} de {tourSteps.length}
              </Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSkip}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {currentTourStep.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {currentTourStep.description}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex space-x-1 mb-2">
              {tourSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded-full transition-colors ${
                    index <= currentStep ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center">
              {Math.round(((currentStep + 1) / tourSteps.length) * 100)}% completo
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={isFirstStep}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>

            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" onClick={handleSkip}>
                Pular
              </Button>
              <Button size="sm" onClick={handleNext}>
                {isLastStep ? "Concluir" : "Próximo"}
                {!isLastStep && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};