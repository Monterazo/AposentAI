import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Search, FileText, Users, Calculator, Shield, TrendingUp, CheckCircle, Clock, User, Home } from "lucide-react";
import { DevSecurityWarning } from "@/components/security/SecurityBanner";
const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results or dashboard with query
      navigate(`/dashboard?search=${encodeURIComponent(searchQuery)}`);
    }
  };
  const features = [{
    icon: FileText,
    title: "Análise Automatizada de Documentos",
    description: "Upload e análise inteligente de documentos previdenciários com IA"
  }, {
    icon: Calculator,
    title: "Cálculos Previdenciários Precisos",
    description: "Simulações e cálculos automatizados de benefícios e aposentadorias"
  }, {
    icon: Shield,
    title: "Conformidade e Segurança",
    description: "Dados protegidos e processos em conformidade com a legislação vigente"
  }];
  const stats = [{
    number: "15mil+",
    label: "Processos Analisados"
  }, {
    number: "98%",
    label: "Taxa de Sucesso"
  }, {
    number: "2.5x",
    label: "Velocidade Aumentada"
  }, {
    number: "500+",
    label: "Advogados Ativos"
  }];
  return <div className="min-h-screen bg-background">
      <DevSecurityWarning />
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-foreground">AposentAI</h1>
              <nav className="hidden md:flex space-x-8">
                <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Recursos</a>
                <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Planos</a>
                
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Entrar
              </Button>
              <Button onClick={() => navigate("/register")}>
                Cadastre-se
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      

      {/* Hero Section */}
      <section className="py-24 px-6 bg-gradient-secondary">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-4xl mx-auto mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Transforme sua prática previdenciária com
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Inteligência Artificial</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Automatize análises, acelere cálculos e aumente sua taxa de sucesso com a plataforma mais avançada para advogados previdenciários do Brasil.
            </p>
            
            {/* Demo Preview */}
            <div className="max-w-2xl mx-auto mb-8">
              <Card className="p-6 shadow-medium border-primary/10 bg-card/50 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">AposentAI Dashboard</span>
                </div>
                <div className="text-left space-y-2">
                  <div className="h-4 bg-gradient-primary rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              </Card>
            </div>

            <div className="flex justify-center space-x-4">
              <Button size="lg" variant="premium" onClick={() => navigate("/register")} className="text-lg px-8 py-4">
                Começar Agora - Grátis
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/login")} className="text-lg px-8 py-4">
                Fazer Login
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Recursos que fazem a diferença
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tecnologia de ponta para advogados que buscam excelência e eficiência em casos previdenciários
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => <Card key={index} className="p-8 text-center border-primary/10 hover:shadow-strong transition-all duration-300 hover:-translate-y-2 bg-gradient-secondary">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6 shadow-medium">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>)}
          </div>
        </div>
      </section>

      {/* About Platform Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Sobre a plataforma
            </h2>
            <p className="text-xl text-muted-foreground">
              Tecnologia de ponta desenvolvida especialmente para advogados previdenciários
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Inteligência Artificial Especializada
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Nossa plataforma utiliza algoritmos avançados de machine learning treinados especificamente 
                para o direito previdenciário brasileiro. Analisamos milhares de casos para oferecer 
                insights precisos e estratégias vencedoras.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-foreground">Análise automatizada de documentos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-foreground">Cálculos previdenciários precisos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-foreground">Conformidade com legislação vigente</span>
                </div>
              </div>
            </div>
            <div>
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="text-center">
                  <TrendingUp className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-foreground mb-2">
                    Resultados Comprovados
                  </h4>
                  <p className="text-muted-foreground">
                    Advogados usando nossa plataforma reportam aumento de 300% na produtividade 
                    e 95% de precisão em análises previdenciárias.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Benefit Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Acompanhe seus casos de perto
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Monitore o progresso de todos os seus processos previdenciários em tempo real. 
                Receba notificações automáticas e mantenha seus clientes sempre informados com 
                relatórios claros e atualizações constantes.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-foreground">Dashboards intuitivos e personalizáveis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-foreground">Relatórios automáticos para clientes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-foreground">Análise preditiva de sucessos</span>
                </div>
              </div>
              <Button size="lg" onClick={() => navigate("/dashboard")}>
                Explorar Dashboard
              </Button>
            </div>
            <div className="relative">
              <Card className="p-8 border-border">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">Casos Ativos</h3>
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">Em Análise</p>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{
                          width: "65%"
                        }}></div>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">12 casos</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">Concluídos</p>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{
                          width: "90%"
                        }}></div>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">47 casos</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Planos que se adaptam ao seu escritório
            </h2>
            <p className="text-xl text-muted-foreground">
              Escolha o plano ideal para o tamanho e necessidades do seu escritório
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 border-border hover:shadow-lg transition-shadow">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground mb-2">Starter</h3>
                <div className="text-4xl font-bold text-primary mb-4">
                  R$ 297<span className="text-lg text-muted-foreground">/mês</span>
                </div>
                <p className="text-muted-foreground mb-6">Perfeito para advogados individuais</p>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-foreground">Até 50 processos/mês</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-foreground">Análise de documentos</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-foreground">Suporte por email</span>
                  </li>
                </ul>
                <Button size="lg" variant="outline" className="w-full">
                  Começar Agora
                </Button>
              </div>
            </Card>

            <Card className="p-8 border-primary shadow-lg relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  Mais Popular
                </span>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground mb-2">Professional</h3>
                <div className="text-4xl font-bold text-primary mb-4">
                  R$ 597<span className="text-lg text-muted-foreground">/mês</span>
                </div>
                <p className="text-muted-foreground mb-6">Ideal para escritórios em crescimento</p>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-foreground">Até 200 processos/mês</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-foreground">Todos os recursos do Starter</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-foreground">Relatórios avançados</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-foreground">Suporte prioritário</span>
                  </li>
                </ul>
                <Button size="lg" className="w-full">
                  Começar Agora
                </Button>
              </div>
            </Card>

            <Card className="p-8 border-border hover:shadow-lg transition-shadow">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground mb-2">Enterprise</h3>
                <div className="text-4xl font-bold text-primary mb-4">
                  R$ 1.197<span className="text-lg text-muted-foreground">/mês</span>
                </div>
                <p className="text-muted-foreground mb-6">Para grandes escritórios</p>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-foreground">Processos ilimitados</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-foreground">Todos os recursos</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-foreground">API personalizada</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-foreground">Suporte 24/7</span>
                  </li>
                </ul>
                <Button size="lg" variant="outline" className="w-full">
                  Falar com Vendas
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      

      {/* CTA Section */}
      

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">AposentAI</h3>
              <p className="text-muted-foreground">
                Inteligência artificial especializada em direito previdenciário brasileiro.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-4">Produto</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Recursos</a></li>
                <li><a href="#pricing" className="hover:text-foreground transition-colors">Planos</a></li>
                <li><button onClick={() => navigate("/dashboard")} className="hover:text-foreground transition-colors">Demo</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-4">Empresa</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#about" className="hover:text-foreground transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Suporte</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">LGPD</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 AposentAI. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;