import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Settings, Eye } from "lucide-react";

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  format: "PDF" | "DOCX";
  sections: string[];
}

const mockTemplates: ReportTemplate[] = [
  {
    id: "1",
    name: "Parecer Técnico Completo",
    description: "Relatório detalhado com análise jurídica e recomendações",
    format: "PDF",
    sections: ["Dados do Cliente", "Análise das Regras", "Simulações", "Recomendações", "Fundamentação Legal"]
  },
  {
    id: "2",
    name: "Resumo Executivo",
    description: "Relatório resumido para apresentação ao cliente",
    format: "PDF", 
    sections: ["Dados Básicos", "Melhor Opção", "Cronograma", "Próximos Passos"]
  },
  {
    id: "3",
    name: "Relatório para Tribunal",
    description: "Documentação formal para processos judiciais",
    format: "DOCX",
    sections: ["Qualificação", "Histórico Contributivo", "Análise Legal", "Pedido", "Anexos"]
  }
];

export const ReportGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>(mockTemplates[0].id);
  const [customComments, setCustomComments] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const currentTemplate = mockTemplates.find(t => t.id === selectedTemplate);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <Card className="p-6 border-input-border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-foreground">Gerador de Relatórios</h2>
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Configurar Template
        </Button>
      </div>

      {/* Template Selection */}
      <div className="mb-6">
        <h3 className="font-medium text-foreground mb-3">Selecionar Template</h3>
        <div className="grid gap-3">
          {mockTemplates.map((template) => (
            <Card 
              key={template.id}
              className={`p-4 cursor-pointer transition-colors ${
                selectedTemplate === template.id 
                  ? "border-primary bg-primary/5" 
                  : "border-input-border hover:bg-accent"
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-foreground">{template.name}</h4>
                <Badge className="bg-secondary text-secondary-foreground text-xs">
                  {template.format}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
              <div className="flex flex-wrap gap-1">
                {template.sections.map((section, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {section}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Custom Comments */}
      <div className="mb-6">
        <h3 className="font-medium text-foreground mb-3">Comentários Personalizados</h3>
        <Textarea
          placeholder="Adicione observações específicas, recomendações adicionais ou considerações especiais para este cliente..."
          value={customComments}
          onChange={(e) => setCustomComments(e.target.value)}
          className="min-h-[120px]"
        />
      </div>

      {/* Report Preview */}
      {currentTemplate && (
        <div className="mb-6">
          <h3 className="font-medium text-foreground mb-3">Prévia do Relatório</h3>
          <Card className="p-4 bg-muted/30">
            <div className="flex items-center space-x-2 mb-3">
              <FileText className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium text-foreground">{currentTemplate.name}</span>
              <Badge className="bg-secondary text-secondary-foreground text-xs">
                {currentTemplate.format}
              </Badge>
            </div>
            <div className="space-y-2 text-sm">
              {currentTemplate.sections.map((section, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span className="text-muted-foreground">{section}</span>
                </div>
              ))}
              {customComments && (
                <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-input-border">
                  <div className="w-1 h-1 bg-primary rounded-full"></div>
                  <span className="text-primary font-medium">Comentários Personalizados</span>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-3">
        <Button 
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className="flex-1"
        >
          <Download className="w-4 h-4 mr-2" />
          {isGenerating ? "Gerando..." : "Gerar Relatório"}
        </Button>
        
        <Button variant="outline">
          <Eye className="w-4 h-4 mr-2" />
          Visualizar
        </Button>
      </div>

      {/* Generation Progress */}
      {isGenerating && (
        <Card className="p-4 mt-4 bg-primary/5 border-primary/20">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <div>
              <p className="font-medium text-primary">Gerando relatório...</p>
              <p className="text-sm text-muted-foreground">
                Processando dados do cliente e formatando documento
              </p>
            </div>
          </div>
        </Card>
      )}
    </Card>
  );
};