import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Camera, Save, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SubscriptionManagement } from "./SubscriptionManagement";

export const Settings = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Mock user data - replace with actual user data later
  const [userData, setUserData] = useState({
    name: "Dr. Maria Silva",
    email: "maria.silva@escritorio.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    avatar: ""
  });

  // Email notification preferences
  const [emailNotifications, setEmailNotifications] = useState({
    newDocuments: true,
    simulationResults: true,
    systemUpdates: false,
    clientActivity: true,
    reminderNotifications: false
  });

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSaveProfile = () => {
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso.",
    });
  };

  const handleChangePassword = () => {
    if (userData.newPassword !== userData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Senha alterada",
      description: "Sua senha foi alterada com sucesso.",
    });
    
    setUserData(prev => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }));
  };

  const handleAvatarChange = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUserData(prev => ({ ...prev, avatar: result }));
        toast({
          title: "Foto atualizada",
          description: "Sua foto de perfil foi alterada com sucesso.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmailNotificationChange = (key: keyof typeof emailNotifications, checked: boolean) => {
    setEmailNotifications(prev => ({ ...prev, [key]: checked }));
  };

  return (
    <div className="space-y-6">
      {/* Profile Photo */}
      <Card className="p-6 border-input-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">Foto de Perfil</h2>
        <div className="flex items-center space-x-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={userData.avatar} alt={userData.name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg">
              {getUserInitials(userData.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <Button onClick={handleAvatarChange} className="mb-2">
              <Camera className="w-4 h-4 mr-2" />
              Alterar Foto
            </Button>
            <p className="text-sm text-muted-foreground">
              Recomendamos uma imagem de pelo menos 200x200 pixels.
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>
      </Card>

      {/* Personal Information */}
      <Card className="p-6 border-input-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">Informações Pessoais</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                value={userData.name}
                onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={userData.email}
                onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                className="mt-1"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSaveProfile}>
              <Save className="w-4 h-4 mr-2" />
              Salvar Informações
            </Button>
          </div>
        </div>
      </Card>

      {/* Security */}
      <Card className="p-6 border-input-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">Segurança</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">Senha Atual</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showPassword ? "text" : "password"}
                value={userData.currentPassword}
                onChange={(e) => setUserData(prev => ({ ...prev, currentPassword: e.target.value }))}
                className="mt-1 pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="newPassword">Nova Senha</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={userData.newPassword}
                  onChange={(e) => setUserData(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="mt-1 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={userData.confirmPassword}
                onChange={(e) => setUserData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="mt-1"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleChangePassword}>
              <Save className="w-4 h-4 mr-2" />
              Alterar Senha
            </Button>
          </div>
        </div>
      </Card>

      {/* Email Notifications */}
      <Card className="p-6 border-input-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">Notificações por Email</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="newDocuments"
              checked={emailNotifications.newDocuments}
              onCheckedChange={(checked) => handleEmailNotificationChange('newDocuments', checked as boolean)}
            />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="newDocuments" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Novos documentos
              </Label>
              <p className="text-xs text-muted-foreground">
                Receber notificação quando novos documentos forem enviados
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="simulationResults"
              checked={emailNotifications.simulationResults}
              onCheckedChange={(checked) => handleEmailNotificationChange('simulationResults', checked as boolean)}
            />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="simulationResults" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Resultados de simulações
              </Label>
              <p className="text-xs text-muted-foreground">
                Receber notificação quando simulações forem concluídas
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="clientActivity"
              checked={emailNotifications.clientActivity}
              onCheckedChange={(checked) => handleEmailNotificationChange('clientActivity', checked as boolean)}
            />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="clientActivity" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Atividade de clientes
              </Label>
              <p className="text-xs text-muted-foreground">
                Receber notificação sobre atualizações importantes dos clientes
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="systemUpdates"
              checked={emailNotifications.systemUpdates}
              onCheckedChange={(checked) => handleEmailNotificationChange('systemUpdates', checked as boolean)}
            />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="systemUpdates" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Atualizações do sistema
              </Label>
              <p className="text-xs text-muted-foreground">
                Receber notificação sobre novos recursos e atualizações
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="reminderNotifications"
              checked={emailNotifications.reminderNotifications}
              onCheckedChange={(checked) => handleEmailNotificationChange('reminderNotifications', checked as boolean)}
            />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="reminderNotifications" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Lembretes
              </Label>
              <p className="text-xs text-muted-foreground">
                Receber lembretes sobre prazos e tarefas importantes
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Subscription Management */}
      <SubscriptionManagement />
    </div>
  );
};