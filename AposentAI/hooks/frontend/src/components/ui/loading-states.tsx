import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export const LoadingCard = () => (
  <Card className="p-6">
    <div className="space-y-4">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  </Card>
);

export const LoadingStats = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
    {[...Array(4)].map((_, i) => (
      <Card key={i} className="p-6">
        <div className="space-y-3">
          <Skeleton className="h-6 w-12" />
          <Skeleton className="h-4 w-20" />
        </div>
      </Card>
    ))}
  </div>
);

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

export const LoadingSpinner = ({ size = "md", text }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
      {text && <span className="text-sm text-muted-foreground">{text}</span>}
    </div>
  );
};

export const LoadingButton = ({ children, ...props }: any) => (
  <button {...props} disabled className="flex items-center space-x-2 opacity-50 cursor-not-allowed">
    <Loader2 className="w-4 h-4 animate-spin" />
    <span>{children}</span>
  </button>
);