import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import {
  LayoutDashboard,
  TreePine,
  Building2,
  Waves,
  City,
  LogOut,
} from "lucide-react";
import { useLocation } from "wouter";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: TreePine, label: "Climate Data", href: "/climate" },
  { icon: Building2, label: "Infrastructure", href: "/infrastructure" },
  { icon: Waves, label: "Algae Monitoring", href: "/algae" },
  { icon: City, label: "Urban Planning", href: "/urban" },
];

export function Sidebar() {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  return (
    <div className="h-screen w-64 border-r bg-card p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <TreePine className="h-6 w-6 text-primary" />
        <span className="font-semibold text-lg">EcoSynthAI</span>
      </div>

      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <Button
            key={item.href}
            variant={location === item.href ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start gap-2",
              location === item.href && "bg-secondary"
            )}
            onClick={() => {}}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </nav>

      <div className="border-t pt-4">
        <div className="mb-4">
          <p className="text-sm font-medium">{user?.username}</p>
          <p className="text-sm text-muted-foreground">{user?.organization}</p>
        </div>
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={() => logoutMutation.mutate()}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
