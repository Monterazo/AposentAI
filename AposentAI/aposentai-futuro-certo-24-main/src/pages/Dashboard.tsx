import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, Home, Search } from "lucide-react";
import { AuthenticatedLayout } from "@/components/layout/AuthenticatedLayout";
import { NewClientModal } from "@/components/dashboard/NewClientModal";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { DashboardSummary } from "@/components/dashboard/DashboardSummary";
import { ClientFilters } from "@/components/dashboard/ClientFilters";
import { ClientCard } from "@/components/dashboard/ClientCard";
import { OnboardingTour } from "@/components/onboarding/OnboardingTour";
import { HelpWidget } from "@/components/help/HelpWidget";
import { KeyboardShortcuts } from "@/components/ui/keyboard-shortcuts";
import { GlobalSearch } from "@/components/search/GlobalSearch";
import { useOnboarding } from "@/hooks/useOnboarding";
import { useGlobalSearch } from "@/hooks/useGlobalSearch";

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

const mockClients: Client[] = [
  {
    id: "1",
    name: "Maria Silva Santos",
    cpf: "111.444.777-35",
    status: "analysis",
    lastUpdate: "2024-01-15",
    documentsCount: 8,
    progress: 65,
    priority: "high"
  },
  {
    id: "2", 
    name: "João Pereira Costa",
    cpf: "123.456.789-09",
    status: "pending",
    lastUpdate: "2024-01-14",
    documentsCount: 12,
    progress: 35,
    priority: "medium"
  },
  {
    id: "3",
    name: "Ana Carolina Oliveira",
    cpf: "987.654.321-00", 
    status: "completed",
    lastUpdate: "2024-01-13",
    documentsCount: 15,
    progress: 100,
    priority: "low"
  },
  {
    id: "4",
    name: "Pedro Santos Lima",
    cpf: "456.789.123-45",
    status: "analysis",
    lastUpdate: "2024-01-12",
    documentsCount: 6,
    progress: 25,
    priority: "high"
  }
];


const Dashboard = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<"all" | "analysis" | "pending" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { showOnboarding, completeOnboarding, skipOnboarding } = useOnboarding();
  const { isSearchVisible, closeSearch } = useGlobalSearch();

  const handleClientSelect = (client: Client) => {
    navigate(`/client/${client.id}`);
  };

  const breadcrumbItems = [
    {
      href: "/dashboard",
      label: "Início",
      icon: Home,
      current: true
    }
  ];

  const filteredClients = mockClients
    .filter(client => {
      const matchesStatus = statusFilter === "all" || client.status === statusFilter;
      const matchesSearch = searchQuery === "" || 
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.cpf.replace(/[.-]/g, '').includes(searchQuery.replace(/[.-]/g, ''));
      return matchesStatus && matchesSearch;
    });

  const completedClients = mockClients.filter(c => c.status === "completed").length;
  const activeClients = mockClients.filter(c => c.status !== "completed").length;
  const analysisClients = mockClients.filter(c => c.status === "analysis").length;
  const pendingClients = mockClients.filter(c => c.status === "pending").length;
  const totalDocuments = mockClients.reduce((sum, c) => sum + c.documentsCount, 0);
  const avgProgress = Math.round(mockClients.reduce((sum, c) => sum + c.progress, 0) / mockClients.length);

  return (
    <AuthenticatedLayout breadcrumbItems={breadcrumbItems}>
      {/* Onboarding Tour */}
      <OnboardingTour
        isVisible={showOnboarding}
        onComplete={completeOnboarding}
        onSkip={skipOnboarding}
      />

      {/* Help Widget */}
      <HelpWidget />

      {/* Keyboard Shortcuts */}
      <KeyboardShortcuts />

      {/* Global Search */}
      <GlobalSearch isVisible={isSearchVisible} onClose={closeSearch} />

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Cards */}
        <div data-tour="dashboard-stats">
          <DashboardStats
            activeClients={activeClients}
            analysisClients={analysisClients}
            completedClients={completedClients}
            avgProgress={avgProgress}
          />
        </div>

        {/* Clients Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Client List */}
          <div className="lg:col-span-3" data-tour="client-section">
            <Card className="p-6">
              {/* Título destacado */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground">Meus Clientes</h2>
              </div>
              
              {/* Barra de Busca */}
              <div className="mb-4">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Buscar por nome ou CPF..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
              </div>
              
              {/* Controles de Filtros */}
              <div className="flex justify-between items-center mb-6">
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
                <div className="flex items-center space-x-4">
                  <NewClientModal 
                    trigger={
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Novo Cliente
                      </Button>
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                {filteredClients.map((client) => (
                  <ClientCard
                    key={client.id}
                    client={client}
                    onClick={handleClientSelect}
                  />
                ))}
              </div>
            </Card>
          </div>

          {/* Summary */}
          <div className="space-y-6" data-tour="analysis-tools">
            <DashboardSummary
              totalDocuments={totalDocuments}
              pendingClients={pendingClients}
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Dashboard;