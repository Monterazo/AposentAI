import { Card } from "@/components/ui/card";

interface DashboardSummaryProps {
  totalDocuments: number;
  pendingClients: number;
}

export const DashboardSummary = ({ totalDocuments, pendingClients }: DashboardSummaryProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Resumo</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total de documentos</span>
          <span className="font-medium text-foreground">{totalDocuments}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Casos pendentes</span>
          <span className="font-medium text-foreground">{pendingClients}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Taxa de sucesso</span>
          <span className="font-medium text-green-600">98%</span>
        </div>
      </div>
    </Card>
  );
};