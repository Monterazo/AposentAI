import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, Download, Eye, Trash2, CheckCircle, AlertCircle } from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  processed: boolean;
  required: boolean;
}

// Documentos por etapa conforme requisitos
const documentStages = {
  stage1: {
    title: "Etapa 1: Documentos Obrigatórios",
    description: "Documentos básicos de identificação",
    documents: [
      { type: "rg_cpf", label: "RG e CPF", required: true },
      { type: "comprovante_residencia", label: "Comprovante de Residência", required: true },
      { type: "certidao_nascimento", label: "Certidão de Nascimento ou Casamento", required: true },
      { type: "carteira_trabalho", label: "Carteira de Trabalho", required: true },
      { type: "pis_pasep", label: "Número do PIS/PASEP", required: true }
    ]
  },
  stage2: {
    title: "Etapa 2: Documentos sobre Contribuição",
    description: "Comprovação de contribuições previdenciárias",
    documents: [
      { type: "cnis", label: "CNIS (extrato do Meu INSS)", required: true },
      { type: "gps_carnes", label: "GPS/carnês de contribuição", required: false },
      { type: "declaracao_ir", label: "Declaração de Imposto de Renda", required: false },
      { type: "certidao_tempo_servico", label: "Certidão de tempo de serviço (regime próprio)", required: false },
      { type: "termo_rescisao_fgts", label: "Termo de rescisão e extrato do FGTS", required: false }
    ]
  },
  stage3: {
    title: "Etapa 3: Documentos Específicos",
    description: "Documentos específicos conforme tipo de aposentadoria",
    documents: [
      { type: "ppp_especial", label: "PPP, LTCAT (Aposentadoria Especial)", required: false },
      { type: "laudos_medicos", label: "Laudos e relatórios médicos (Por invalidez)", required: false },
      { type: "declaracao_sindical", label: "Declaração sindical, notas fiscais (Rural)", required: false },
      { type: "receitas_exames", label: "Receitas, relatórios, exames (Pessoa com deficiência)", required: false },
      { type: "declaracao_ensino", label: "Declaração da instituição de ensino (Professor)", required: false }
    ]
  }
};

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "RG_Maria_Silva.pdf",
    type: "rg_cpf",
    size: "2.3 MB",
    uploadDate: "2024-01-15",
    processed: true,
    required: true
  },
  {
    id: "2",
    name: "CNIS_Maria_Silva.pdf", 
    type: "cnis",
    size: "4.1 MB",
    uploadDate: "2024-01-15",
    processed: true,
    required: true
  },
  {
    id: "3",
    name: "Carteira_Trabalho.pdf",
    type: "carteira_trabalho",
    size: "1.8 MB",
    uploadDate: "2024-01-15",
    processed: false,
    required: true
  }
];

const getDocumentStage = (type: string): string => {
  for (const [stageKey, stage] of Object.entries(documentStages)) {
    if (stage.documents.some(doc => doc.type === type)) {
      return stageKey;
    }
  }
  return "stage1";
};

const getDocumentLabel = (type: string): string => {
  for (const stage of Object.values(documentStages)) {
    const doc = stage.documents.find(d => d.type === type);
    if (doc) return doc.label;
  }
  return type;
};

const getDocumentColor = (type: string, required: boolean): string => {
  if (required) return "bg-destructive/10 text-destructive";
  return "bg-primary/10 text-primary";
};

export const DocumentUpload = () => {
  const [documents] = useState<Document[]>(mockDocuments);
  const [dragActive, setDragActive] = useState(false);
  const [activeStage, setActiveStage] = useState("stage1");

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file upload logic here
  };

  const getStageProgress = (stageKey: string) => {
    const stage = documentStages[stageKey as keyof typeof documentStages];
    const requiredDocs = stage.documents.filter(doc => doc.required);
    const uploadedRequired = requiredDocs.filter(doc => 
      documents.some(uploaded => uploaded.type === doc.type)
    );
    return requiredDocs.length > 0 ? (uploadedRequired.length / requiredDocs.length) * 100 : 100;
  };

  const renderStageContent = (stageKey: string) => {
    const stage = documentStages[stageKey as keyof typeof documentStages];
    const stageDocuments = documents.filter(doc => getDocumentStage(doc.type) === stageKey);
    
    return (
      <div className="space-y-4">
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
            dragActive 
              ? "border-primary bg-primary/5" 
              : "border-input-border hover:border-primary/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <h4 className="font-medium text-foreground mb-2">
            Enviar documentos para {stage.title}
          </h4>
          <p className="text-sm text-muted-foreground mb-3">
            {stage.description}
          </p>
          <Button variant="outline" size="sm">
            Selecionar Arquivos
          </Button>
        </div>

        {/* Required Documents Checklist */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Documentos desta etapa:</h4>
          {stage.documents.map((docType) => {
            const uploaded = documents.find(doc => doc.type === docType.type);
            return (
              <div key={docType.type} className="flex items-center justify-between p-3 border border-input-border rounded-lg">
                <div className="flex items-center space-x-3">
                  {uploaded ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : docType.required ? (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  ) : (
                    <FileText className="w-5 h-5 text-muted-foreground" />
                  )}
                  <div>
                    <p className="font-medium text-foreground">
                      {docType.label} {docType.required && <span className="text-red-500">*</span>}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {uploaded ? `Enviado: ${uploaded.name}` : docType.required ? "Obrigatório" : "Opcional"}
                    </p>
                  </div>
                </div>
                {uploaded && (
                  <Badge className={getDocumentColor(uploaded.type, uploaded.required)}>
                    {uploaded.processed ? "Processado" : "Enviado"}
                  </Badge>
                )}
              </div>
            );
          })}
        </div>

        {/* Uploaded Documents for this stage */}
        {stageDocuments.length > 0 && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-foreground">Documentos enviados ({stageDocuments.length})</h4>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
            
            {stageDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 border border-input-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">{doc.name}</p>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>{doc.uploadDate}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge className={getDocumentColor(doc.type, doc.required)}>
                    {getDocumentLabel(doc.type)}
                  </Badge>
                  {doc.processed && (
                    <Badge className="bg-green-500/10 text-green-600">
                      Processado
                    </Badge>
                  )}
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="p-6 border-input-border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-foreground">Upload de Documentos</h2>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Exportar Todos
        </Button>
      </div>

      <Tabs value={activeStage} onValueChange={setActiveStage} className="w-full">
        <TabsList className="grid w-full grid-cols-3 gap-2 bg-transparent p-0 h-auto">
          {Object.entries(documentStages).map(([stageKey, stage]) => {
            const progress = getStageProgress(stageKey);
            const isCompleted = progress === 100;
            const isActive = stageKey === activeStage;
            
            return (
              <TabsTrigger 
                key={stageKey} 
                value={stageKey} 
                className={`flex flex-col items-center justify-center p-4 h-auto min-h-[120px] border-2 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'border-primary bg-primary text-primary-foreground shadow-md' 
                    : isCompleted 
                      ? 'border-green-200 bg-green-50 text-green-700 hover:border-green-300' 
                      : 'border-input-border bg-background text-foreground hover:border-primary/50 hover:bg-accent'
                } data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary`}
              >
                <div className="flex items-center justify-center mb-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isCompleted 
                      ? 'bg-green-500 text-white' 
                      : isActive 
                        ? 'bg-primary-foreground text-primary' 
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    {isCompleted ? '✓' : stageKey.slice(-1)}
                  </div>
                </div>
                
                <div className="text-center mb-3">
                  <div className="font-semibold text-sm mb-1">
                    {stage.title.split(":")[0]}
                  </div>
                  <div className="text-xs opacity-80">
                    {stage.title.split(":")[1]?.trim() || ''}
                  </div>
                </div>
                
                <div className="w-full max-w-20">
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-1">
                    <div 
                      className={`h-full transition-all duration-300 rounded-full ${
                        isCompleted ? 'bg-green-500' : isActive ? 'bg-primary-foreground' : 'bg-primary'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className={`text-xs font-medium text-center ${
                    isCompleted ? 'text-green-600' : isActive ? 'text-primary-foreground' : 'text-muted-foreground'
                  }`}>
                    {Math.round(progress)}%
                  </div>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {Object.entries(documentStages).map(([stageKey, stage]) => (
          <TabsContent key={stageKey} value={stageKey} className="mt-6">
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-3">
              <h3 className="text-xl font-bold text-foreground">{stage.title}</h3>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                getStageProgress(stageKey) === 100 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-primary/10 text-primary'
              }`}>
                {getStageProgress(stageKey) === 100 ? 'Completa' : 'Em andamento'}
              </div>
            </div>
            <p className="text-muted-foreground">{stage.description}</p>
          </div>
            {renderStageContent(stageKey)}
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
};