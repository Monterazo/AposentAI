import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, X, User, FileText, Calculator, Clock } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: "client" | "document" | "simulation" | "action";
  url: string;
  metadata?: string;
}

const mockSearchResults: SearchResult[] = [
  {
    id: "1",
    title: "Maria Silva Santos",
    description: "Cliente - CPF: 111.444.777-35",
    type: "client",
    url: "/client/1",
    metadata: "Em análise"
  },
  {
    id: "2",
    title: "João Pereira Costa", 
    description: "Cliente - CPF: 123.456.789-09",
    type: "client",
    url: "/client/2",
    metadata: "Pendente"
  },
  {
    id: "3",
    title: "Simulação de Aposentadoria por Idade",
    description: "Ferramenta de cálculo previdenciário",
    type: "simulation",
    url: "/client/1",
    metadata: "Ferramentas"
  },
  {
    id: "4",
    title: "Formulário Meu INSS",
    description: "Preenchimento automático de requerimentos",
    type: "document",
    url: "/client/1",
    metadata: "Documentos"
  },
  {
    id: "5",
    title: "Novo Cliente",
    description: "Adicionar novo cliente ao sistema",
    type: "action",
    url: "/dashboard?action=new-client",
    metadata: "Ação Rápida"
  }
];

interface GlobalSearchProps {
  isVisible: boolean;
  onClose: () => void;
}

export const GlobalSearch = ({ isVisible, onClose }: GlobalSearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (isVisible) {
      // Focus input when modal opens
      setTimeout(() => {
        const input = document.getElementById("global-search-input");
        input?.focus();
      }, 100);
    } else {
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isVisible]);

  useEffect(() => {
    if (query.trim()) {
      // Filter results based on query
      const filtered = mockSearchResults.filter(result =>
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isVisible) return;

    switch (e.key) {
      case "Escape":
        onClose();
        break;
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (results[selectedIndex]) {
          handleSelectResult(results[selectedIndex]);
        }
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, results, selectedIndex]);

  const handleSelectResult = (result: SearchResult) => {
    navigate(result.url);
    onClose();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "client": return User;
      case "document": return FileText;
      case "simulation": return Calculator;
      case "action": return Clock;
      default: return Search;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "client": return "bg-blue-100 text-blue-800";
      case "document": return "bg-green-100 text-green-800";
      case "simulation": return "bg-purple-100 text-purple-800";
      case "action": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-[10vh]">
      <Card className="w-full max-w-2xl mx-4 shadow-2xl">
        {/* Search Input */}
        <div className="flex items-center p-4 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground mr-3" />
          <Input
            id="global-search-input"
            placeholder="Buscar clientes, documentos, ferramentas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 text-lg"
          />
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Search Results */}
        {results.length > 0 && (
          <ScrollArea className="max-h-96">
            <div className="p-2">
              {results.map((result, index) => {
                const TypeIcon = getTypeIcon(result.type);
                return (
                  <div
                    key={result.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      index === selectedIndex 
                        ? "bg-primary/10 border border-primary/20" 
                        : "hover:bg-accent"
                    }`}
                    onClick={() => handleSelectResult(result)}
                  >
                    <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                      <TypeIcon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-foreground truncate">
                          {result.title}
                        </h4>
                        <Badge className={`text-xs ${getTypeColor(result.type)}`}>
                          {result.metadata}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {result.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}

        {/* Empty State */}
        {query && results.length === 0 && (
          <div className="p-8 text-center">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-foreground mb-2">Nenhum resultado encontrado</h3>
            <p className="text-sm text-muted-foreground">
              Tente buscar por nome do cliente, CPF, ou tipo de documento.
            </p>
          </div>
        )}

        {/* Initial State */}
        {!query && (
          <div className="p-8 text-center">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-foreground mb-2">Busca Inteligente</h3>
            <p className="text-sm text-muted-foreground">
              Digite para buscar clientes, documentos, ferramentas e ações rápidas.
            </p>
            <div className="flex justify-center space-x-2 mt-4">
              <Badge variant="outline" className="text-xs">↑↓ Navegar</Badge>
              <Badge variant="outline" className="text-xs">Enter Selecionar</Badge>
              <Badge variant="outline" className="text-xs">Esc Fechar</Badge>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};