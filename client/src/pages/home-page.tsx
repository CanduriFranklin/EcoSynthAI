import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import ClimateWidget from "@/components/dashboard/climate-widget";
import InfrastructureWidget from "@/components/dashboard/infrastructure-widget";
import AlgaeWidget from "@/components/dashboard/algae-widget";
import UrbanWidget from "@/components/dashboard/urban-widget";
import { LogOut, Leaf, Download, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { exportToPDF, exportToExcel } from "@/lib/utils";

export default function HomePage() {
  const { user, logoutMutation } = useAuth();

  // Fetch all data for export
  const climateData = useQuery({
    queryKey: ["/api/climate"],
  });

  const infraData = useQuery({
    queryKey: ["/api/infrastructure"],
  });

  const algaeData = useQuery({
    queryKey: ["/api/algae"],
  });

  const urbanData = useQuery({
    queryKey: ["/api/urban"],
  });

  const handleExportPDF = async () => {
    const exportData = {
      climate: climateData.data,
      infrastructure: infraData.data,
      algae: algaeData.data,
      urban: urbanData.data,
    };
    await exportToPDF([exportData], "EcoSynthAI Dashboard Report");
  };

  const handleExportExcel = async () => {
    const exportData = {
      climate: climateData.data,
      infrastructure: infraData.data,
      algae: algaeData.data,
      urban: urbanData.data,
    };
    await exportToExcel([exportData], "EcoSynthAI Dashboard Data");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-primary animate-pulse" />
            <span className="font-semibold">EcoSynthAI</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {user?.username}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportPDF}
                className="transition-all hover:scale-105"
              >
                <FileText className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportExcel}
                className="transition-all hover:scale-105"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Excel
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
                className="transition-all hover:scale-105"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 animate-fadeIn">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Environmental Dashboard</h1>
          <div className="text-sm text-muted-foreground">
            Location: United Kingdom
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="transform hover:scale-[1.02] transition-transform duration-200">
            <ClimateWidget />
          </div>
          <div className="transform hover:scale-[1.02] transition-transform duration-200">
            <InfrastructureWidget />
          </div>
          <div className="transform hover:scale-[1.02] transition-transform duration-200">
            <AlgaeWidget />
          </div>
          <div className="transform hover:scale-[1.02] transition-transform duration-200">
            <UrbanWidget />
          </div>
        </div>
      </main>
    </div>
  );
}