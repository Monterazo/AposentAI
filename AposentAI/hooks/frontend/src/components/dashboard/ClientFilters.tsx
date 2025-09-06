import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ClientFiltersProps {
  statusFilter: "all" | "analysis" | "pending" | "completed";
  setStatusFilter: (filter: "all" | "analysis" | "pending" | "completed") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ClientFilters = ({ 
  statusFilter, 
  setStatusFilter, 
  searchQuery, 
  setSearchQuery 
}: ClientFiltersProps) => {
  return (
    <div className="flex items-center space-x-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Buscar por nome ou CPF..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 w-64"
        />
      </div>
      
      <div className="flex space-x-2">
        <Button
          variant={statusFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setStatusFilter("all")}
        >
          Todos
        </Button>
        <Button
          variant={statusFilter === "analysis" ? "default" : "outline"}
          size="sm"
          onClick={() => setStatusFilter("analysis")}
        >
          Em Análise
        </Button>
        <Button
          variant={statusFilter === "pending" ? "default" : "outline"}
          size="sm"
          onClick={() => setStatusFilter("pending")}
        >
          Pendentes
        </Button>
        <Button
          variant={statusFilter === "completed" ? "default" : "outline"}
          size="sm"
          onClick={() => setStatusFilter("completed")}
        >
          Concluídos
        </Button>
      </div>
    </div>
  );
};