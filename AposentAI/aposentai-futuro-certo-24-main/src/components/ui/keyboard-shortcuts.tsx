import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Keyboard } from "lucide-react";

interface Shortcut {
  keys: string[];
  description: string;
  category: string;
}

const shortcuts: Shortcut[] = [
  { keys: ["Ctrl", "K"], description: "Busca rápida", category: "Navegação" },
  { keys: ["Ctrl", "N"], description: "Novo cliente", category: "Ações" },
  { keys: ["Ctrl", "D"], description: "Dashboard", category: "Navegação" },
  { keys: ["Ctrl", "H"], description: "Mostrar/ocultar ajuda", category: "Interface" },
  { keys: ["Ctrl", "?"], description: "Atalhos de teclado", category: "Interface" },
  { keys: ["Esc"], description: "Fechar modal/overlay", category: "Interface" },
  { keys: ["Enter"], description: "Confirmar ação", category: "Ações" },
  { keys: ["Tab"], description: "Navegar pelos campos", category: "Navegação" }
];

export const KeyboardShortcuts = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + ? para mostrar atalhos
      if (e.ctrlKey && e.key === "/") {
        e.preventDefault();
        setIsVisible(true);
      }
      
      // ESC para fechar
      if (e.key === "Escape") {
        setIsVisible(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const categories = Array.from(new Set(shortcuts.map(s => s.category)));

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Keyboard className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Atalhos de Teclado</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                {category}
              </h3>
              <div className="space-y-2">
                {shortcuts
                  .filter(shortcut => shortcut.category === category)
                  .map((shortcut, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <span className="text-foreground">{shortcut.description}</span>
                      <div className="flex items-center space-x-1">
                        {shortcut.keys.map((key, keyIndex) => (
                          <Badge 
                            key={keyIndex} 
                            variant="outline" 
                            className="text-xs font-mono bg-background"
                          >
                            {key}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            Pressione <Badge variant="outline" className="text-xs font-mono">Ctrl + ?</Badge> para 
            mostrar atalhos ou <Badge variant="outline" className="text-xs font-mono">Esc</Badge> para fechar
          </p>
        </div>
      </Card>
    </div>
  );
};