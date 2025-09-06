import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  HelpCircle, 
  X, 
  Search, 
  MessageCircle, 
  Book, 
  Video, 
  ExternalLink,
  ChevronRight 
} from "lucide-react";

interface HelpItem {
  id: string;
  title: string;
  description: string;
  type: "article" | "video" | "guide";
  category: string;
  popular?: boolean;
}

const helpItems: HelpItem[] = [
  {
    id: "1",
    title: "Como adicionar um novo cliente",
    description: "Passo a passo para cadastrar clientes e iniciar análise",
    type: "guide",
    category: "Primeiros Passos",
    popular: true
  },
  {
    id: "2", 
    title: "Análise de documentos previdenciários",
    description: "Como fazer upload e interpretar resultados da IA",
    type: "video",
    category: "Recursos Principais"
  },
  {
    id: "3",
    title: "Interpretando simulações de aposentadoria",
    description: "Entenda os diferentes tipos de aposentadoria disponíveis",
    type: "article",
    category: "Simulações",
    popular: true
  },
  {
    id: "4",
    title: "Exportando relatórios para clientes",
    description: "Como gerar e personalizar relatórios profissionais",
    type: "guide",
    category: "Relatórios"
  },
  {
    id: "5",
    title: "Configurações de conta e planos",
    description: "Gerenciar sua assinatura e preferências",
    type: "article",
    category: "Conta"
  }
];

const quickActions = [
  {
    title: "Falar com Suporte",
    description: "Chat direto com nossa equipe",
    icon: MessageCircle,
    action: "chat"
  },
  {
    title: "Ver Tutoriais",
    description: "Vídeos explicativos completos",
    icon: Video,
    action: "tutorials"
  },
  {
    title: "Base de Conhecimento",
    description: "Artigos e guias detalhados",
    icon: Book,
    action: "knowledge"
  }
];

export const HelpWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", ...Array.from(new Set(helpItems.map(item => item.category)))];
  
  const filteredItems = helpItems.filter(item => {
    const matchesSearch = searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video": return Video;
      case "guide": return Book;
      case "article": return ExternalLink;
      default: return Book;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video": return "bg-blue-100 text-blue-800";
      case "guide": return "bg-green-100 text-green-800";
      case "article": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      {/* Help Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <HelpCircle className="w-6 h-6" />
        </Button>
      </div>

      {/* Help Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 z-40">
          <Card className="bg-card border-border shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div>
                <h3 className="font-semibold text-foreground">Central de Ajuda</h3>
                <p className="text-xs text-muted-foreground">Como podemos te ajudar?</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-b border-border">
              <div className="grid grid-cols-3 gap-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="h-auto flex-col p-3 space-y-1"
                  >
                    <action.icon className="w-4 h-4" />
                    <span className="text-xs">{action.title}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="p-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar ajuda..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="text-xs"
                  >
                    {category === "all" ? "Todos" : category}
                  </Button>
                ))}
              </div>

              {/* Help Items */}
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {filteredItems.map((item) => {
                    const TypeIcon = getTypeIcon(item.type);
                    return (
                      <div
                        key={item.id}
                        className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-accent cursor-pointer transition-colors"
                      >
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <TypeIcon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="text-sm font-medium text-foreground truncate">
                              {item.title}
                            </h4>
                            {item.popular && (
                              <Badge variant="secondary" className="text-xs">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <Badge className={`text-xs ${getTypeColor(item.type)}`}>
                              {item.type === "video" ? "Vídeo" : 
                               item.type === "guide" ? "Guia" : "Artigo"}
                            </Badge>
                            <ChevronRight className="w-3 h-3 text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};