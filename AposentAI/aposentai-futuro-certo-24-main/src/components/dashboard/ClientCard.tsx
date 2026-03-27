import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, CheckCircle, FileText } from "lucide-react";
import { validateCPF } from "@/lib/utils";

interface Client {
  id: string;
  name: string;
  cpf: string;
  status: "analysis" | "pending" | "completed";
  lastUpdate: string;
  documentsCount: number;
  progress: number;
  priority: "high" | "medium" | "low";
}

interface ClientCardProps {
  client: Client;
  onClick: (client: Client) => void;
}

const statusConfig = {
  analysis: { label: "Em Análise", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  pending: { label: "Pendente", color: "bg-blue-100 text-blue-800", icon: FileText },
  completed: { label: "Concluído", color: "bg-green-100 text-green-800", icon: CheckCircle }
};

const priorityConfig = {
  high: { label: "Alta", color: "bg-red-500" },
  medium: { label: "Média", color: "bg-yellow-500" },
  low: { label: "Baixa", color: "bg-green-500" }
};

export const ClientCard = ({ client, onClick }: ClientCardProps) => {
  const status = statusConfig[client.status];
  const priority = priorityConfig[client.priority];
  const StatusIcon = status.icon;
  
  return (
    <div
      className="p-4 border border-border rounded-lg hover:bg-muted/30 cursor-pointer transition-colors"
      onClick={() => onClick(client)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="" />
            <AvatarFallback>
              {client.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-foreground">{client.name}</h3>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">CPF: {client.cpf}</p>
              {validateCPF(client.cpf) ? (
                <div className="w-3 h-3" title="CPF válido">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                </div>
              ) : (
                <div className="w-3 h-3 rounded-full bg-red-500" title="CPF inválido" />
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${priority.color}`} title={`Prioridade ${priority.label}`}></div>
          <Badge className={status.color}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {status.label}
          </Badge>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progresso</span>
          <span className="text-foreground">{client.progress}%</span>
        </div>
        <Progress value={client.progress} className="h-2" />
      </div>
      
      <div className="flex justify-between items-center mt-3 text-sm text-muted-foreground">
        <span>{client.documentsCount} documentos</span>
        <span>Atualizado em {client.lastUpdate}</span>
      </div>
    </div>
  );
};