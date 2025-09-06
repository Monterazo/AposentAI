import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calculator, Download, TrendingUp, Clock, DollarSign } from "lucide-react";

interface SimulationRule {
  id: string;
  name: string;
  description: string;
  timeRemaining: string;
  estimatedDate: string;
  estimatedValue: string;
  progress: number;
  isRecommended?: boolean;
}

const mockSimulations: SimulationRule[] = [
  {
    id: "1",
    name: "Aposentadoria por Idade (Urbana)",
    description: "65 anos de idade + 15 anos de contribuição",
    timeRemaining: "2 anos e 4 meses", 
    estimatedDate: "Mai/2026",
    estimatedValue: "R$ 3.247,50",
    progress: 78,
    isRecommended: true
  },
  {
    id: "2", 
    name: "Aposentadoria por Idade (Rural)",
    description: "60 anos de idade + 15 anos de contribuição rural",
    timeRemaining: "4 anos e 8 meses",
    estimatedDate: "Set/2028", 
    estimatedValue: "R$ 2.890,00",
    progress: 65
  },
  {
    id: "3",
    name: "Aposentadoria Híbrida (Rural + Urbana)",
    description: "65 anos + 15 anos (rural + urbano)",
    timeRemaining: "1 ano e 2 meses",
    estimatedDate: "Mar/2025",
    estimatedValue: "R$ 3.455,20", 
    progress: 92
  },
  {
    id: "4",
    name: "Regra de Transição (2019) - Pontos",
    description: "96 pontos (idade + tempo contribuição)",
    timeRemaining: "3 anos e 6 meses",
    estimatedDate: "Jul/2027",
    estimatedValue: "R$ 4.120,80",
    progress: 68
  },
  {
    id: "5",
    name: "Aposentadoria Especial",
    description: "25 anos de atividade especial + 60 anos",
    timeRemaining: "Documentos insuficientes",
    estimatedDate: "Verificar PPP/LTCAT",
    estimatedValue: "R$ 5.200,00",
    progress: 45
  },
  {
    id: "6",
    name: "Aposentadoria por Incapacidade",
    description: "Incapacidade permanente para o trabalho",
    timeRemaining: "Avaliação médica",
    estimatedDate: "Depende de perícia",
    estimatedValue: "R$ 3.800,00",
    progress: 0
  },
  {
    id: "7",
    name: "Aposentadoria - Pessoa com Deficiência",
    description: "25 anos contribuição + deficiência comprovada",
    timeRemaining: "Documentos insuficientes",
    estimatedDate: "Verificar relatórios médicos",
    estimatedValue: "R$ 4.500,00",
    progress: 30
  },
  {
    id: "8",
    name: "Aposentadoria do Professor",
    description: "25 anos magistério + 60 anos (mulher) / 65 (homem)",
    timeRemaining: "8 anos e 2 meses",
    estimatedDate: "Jan/2032",
    estimatedValue: "R$ 3.650,00",
    progress: 55
  }
];

export const RetirementSimulation = () => {
  const [simulations] = useState<SimulationRule[]>(mockSimulations);
  const [selectedRule, setSelectedRule] = useState<string>(simulations[0].id);

  const recommendedRule = simulations.find(rule => rule.isRecommended);

  return (
    <Card className="p-6 border-input-border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-foreground">Simulação de Aposentadoria</h2>
        <Button variant="outline" size="sm">
          <Calculator className="w-4 h-4 mr-2" />
          Nova Simulação
        </Button>
      </div>

      {/* Recommended Rule Highlight */}
      {recommendedRule && (
        <Card className="p-4 mb-6 bg-primary/5 border-primary/20">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-medium text-primary">Regra Recomendada</h3>
          </div>
          <p className="text-sm text-foreground mb-3">
            <strong>{recommendedRule.name}</strong> - Melhor custo-benefício
          </p>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Tempo restante</p>
              <p className="font-medium text-foreground">{recommendedRule.timeRemaining}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Data estimada</p>
              <p className="font-medium text-foreground">{recommendedRule.estimatedDate}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Valor estimado</p>
              <p className="font-medium text-primary">{recommendedRule.estimatedValue}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Simulation Results */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-foreground">Todas as Modalidades</h3>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar PDF
          </Button>
        </div>

        {simulations.map((simulation) => (
          <Card 
            key={simulation.id}
            className={`p-4 cursor-pointer transition-colors ${
              selectedRule === simulation.id 
                ? "border-primary bg-primary/5" 
                : "border-input-border hover:bg-accent"
            }`}
            onClick={() => setSelectedRule(simulation.id)}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-foreground">{simulation.name}</h4>
                  {simulation.isRecommended && (
                    <Badge className="bg-primary text-primary-foreground text-xs">
                      Recomendada
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{simulation.description}</p>
              </div>
              
              {simulation.progress > 0 && (
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{simulation.progress}%</p>
                  <p className="text-xs text-muted-foreground">Completo</p>
                </div>
              )}
            </div>

            {simulation.progress > 0 && (
              <div className="mb-3">
                <Progress value={simulation.progress} className="h-2" />
              </div>
            )}

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Tempo restante</p>
                  <p className="font-medium text-foreground">{simulation.timeRemaining}</p>
                </div>
              </div>
              
              <div>
                <p className="text-muted-foreground">Data estimada</p>
                <p className="font-medium text-foreground">{simulation.estimatedDate}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Valor estimado</p>
                  <p className="font-medium text-foreground">{simulation.estimatedValue}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};