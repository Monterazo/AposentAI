import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, FileText, Clock, CheckCircle } from "lucide-react";
import { NewClientModal } from "./NewClientModal";

interface Client {
  id: string;
  name: string;
  cpf: string;
  status: "analysis" | "pending" | "completed";
  lastUpdate: string;
  documentsCount: number;
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "Maria Silva Santos",
    cpf: "123.456.789-00",
    status: "analysis",
    lastUpdate: "2024-01-15",
    documentsCount: 8
  },
  {
    id: "2", 
    name: "João Pereira Costa",
    cpf: "987.654.321-00",
    status: "pending",
    lastUpdate: "2024-01-14",
    documentsCount: 12
  },
  {
    id: "3",
    name: "Ana Carolina Oliveira",
    cpf: "456.789.123-00", 
    status: "completed",
    lastUpdate: "2024-01-13",
    documentsCount: 15
  }
];

const statusConfig = {
  analysis: { label: "Em Análise", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  pending: { label: "Pendente", color: "bg-blue-100 text-blue-800", icon: FileText },
  completed: { label: "Concluído", color: "bg-green-100 text-green-800", icon: CheckCircle }
};

interface ClientListProps {
  onSelectClient: (client: Client) => void;
}

export const ClientList = ({ onSelectClient }: ClientListProps) => {
  const [search, setSearch] = useState("");
  const [clients] = useState<Client[]>(mockClients);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(search.toLowerCase()) ||
    client.cpf.includes(search)
  );

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-4">
        <NewClientModal 
          trigger={
            <Button variant="default" size="sm" className="w-full space-x-2">
              <Plus className="w-4 h-4" />
              <span>Novo Cliente</span>
            </Button>
          }
        />
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 text-sm"
        />
      </div>

      <div className="space-y-2">
        {filteredClients.map((client) => {
          const status = statusConfig[client.status];
          const StatusIcon = status.icon;
          
          return (
            <div
              key={client.id}
              className="p-3 border border-input-border rounded-lg hover:bg-accent cursor-pointer transition-colors"
              onClick={() => onSelectClient(client)}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-foreground text-sm truncate">{client.name}</h3>
                <Badge className={`${status.color} text-xs`}>
                  <StatusIcon className="w-3 h-3" />
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-1">CPF: {client.cpf}</p>
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>{client.documentsCount} docs</span>
                <span>{client.lastUpdate}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};