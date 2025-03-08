import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import ClimateWidget from "@/components/dashboard/climate-widget";
import InfrastructureWidget from "@/components/dashboard/infrastructure-widget";
import AlgaeWidget from "@/components/dashboard/algae-widget";
import UrbanWidget from "@/components/dashboard/urban-widget";
import { LogOut, Leaf } from "lucide-react";

export default function HomePage() {
  const { user, logoutMutation } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-primary" />
            <span className="font-semibold">EcoSynthAI</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {user?.username}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Environmental Dashboard</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <ClimateWidget />
          <InfrastructureWidget />
          <AlgaeWidget />
          <UrbanWidget />
        </div>
      </main>
    </div>
  );
}
