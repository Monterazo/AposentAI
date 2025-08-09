import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Settings, LucideIcon, Crown } from "lucide-react";
import { ProfileDropdown } from "@/components/dashboard/ProfileDropdown";

interface BreadcrumbItem {
  href?: string;
  label: string;
  icon: LucideIcon;
  current?: boolean;
}

interface AuthenticatedLayoutProps {
  children: ReactNode;
  breadcrumbItems: BreadcrumbItem[];
}

export const AuthenticatedLayout = ({ children, breadcrumbItems }: AuthenticatedLayoutProps) => {
  const navigate = useNavigate();

  const handleOpenSettings = () => {
    navigate("/settings", { state: { from: window.location.pathname } });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <h1 
                className="text-2xl font-bold text-foreground cursor-pointer hover:text-muted-foreground transition-colors" 
                onClick={() => navigate("/dashboard")}
              >
                AposentAI
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* Subscription Banner */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/subscriptions")}
                className="text-primary hover:text-primary hover:bg-primary/10 border border-primary/20 hover:border-primary/40 transition-all"
              >
                <Crown className="w-4 h-4 mr-2" />
                Assinatura
              </Button>
              
              <Button variant="outline" size="icon" onClick={handleOpenSettings}>
                <Settings className="w-4 h-4" />
              </Button>
              <ProfileDropdown onOpenSettings={handleOpenSettings} />
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbItems.map((item, index) => (
              <div key={item.href || item.label} className="flex items-center">
                <BreadcrumbItem>
                  {item.current ? (
                    <BreadcrumbPage className="flex items-center">
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href} className="flex items-center">
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Main Content */}
      {children}
    </div>
  );
};