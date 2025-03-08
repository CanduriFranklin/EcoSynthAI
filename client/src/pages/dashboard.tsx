import { Sidebar } from "@/components/layout/sidebar";
import { ClimateWidget } from "@/components/dashboard/climate-widget";
import { InfrastructureWidget } from "@/components/dashboard/infrastructure-widget";
import { AlgaeWidget } from "@/components/dashboard/algae-widget";
import { UrbanWidget } from "@/components/dashboard/urban-widget";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Environmental Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ClimateWidget />
            <InfrastructureWidget />
            <AlgaeWidget />
            <UrbanWidget />
          </div>
        </div>
      </main>
    </div>
  );
}
