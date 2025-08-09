import { useLocation } from "react-router-dom";
import { Home, Settings as SettingsIcon, LayoutDashboard } from "lucide-react";
import { AuthenticatedLayout } from "@/components/layout/AuthenticatedLayout";
import { Settings as SettingsComponent } from "@/components/dashboard/Settings";

const Settings = () => {
  const location = useLocation();
  
  const getBreadcrumbTrail = () => {
    const referrer = location.state?.from;
    const trail = [];
    
    // Always start with home
    trail.push({
      href: "/",
      label: "Início",
      icon: Home
    });
    
    // Add dashboard if user came from there or if no specific referrer
    if (referrer === "/dashboard" || !referrer) {
      trail.push({
        href: "/dashboard", 
        label: "Dashboard",
        icon: LayoutDashboard
      });
    }
    
    // Add current page
    trail.push({
      href: "/settings",
      label: "Configurações",
      icon: SettingsIcon,
      current: true
    });
    
    return trail;
  };

  return (
    <AuthenticatedLayout breadcrumbItems={getBreadcrumbTrail()}>
      <div className="max-w-4xl mx-auto px-6 py-6">
        <SettingsComponent />
      </div>
    </AuthenticatedLayout>
  );
};

export default Settings;