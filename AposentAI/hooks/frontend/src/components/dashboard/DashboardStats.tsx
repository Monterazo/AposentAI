import { Card } from "@/components/ui/card";
import { Users, Clock, CheckCircle, TrendingUp } from "lucide-react";

interface DashboardStatsProps {
  activeClients: number;
  analysisClients: number;
  completedClients: number;
  avgProgress: number;
}

export const DashboardStats = ({ 
  activeClients, 
  analysisClients, 
  completedClients, 
  avgProgress 
}: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Clientes Ativos</p>
            <p className="text-2xl font-bold text-foreground">{activeClients}</p>
          </div>
          <Users className="w-8 h-8 text-primary" />
        </div>
      </Card>
      
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Em Análise</p>
            <p className="text-2xl font-bold text-foreground">{analysisClients}</p>
          </div>
          <Clock className="w-8 h-8 text-yellow-500" />
        </div>
      </Card>
      
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Concluídos</p>
            <p className="text-2xl font-bold text-foreground">{completedClients}</p>
          </div>
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
      </Card>
      
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Progresso Médio</p>
            <p className="text-2xl font-bold text-foreground">{avgProgress}%</p>
          </div>
          <TrendingUp className="w-8 h-8 text-blue-500" />
        </div>
      </Card>
    </div>
  );
};