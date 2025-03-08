import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Building2, AlertTriangle, ShieldAlert } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function InfrastructureWidget() {
  const { data, isLoading, error } = useQuery<{
    resilience: number;
    vulnerableAreas: number;
    criticalPoints: number;
    lastUpdated: string;
  }>({ queryKey: ["/api/infrastructure"] });

  if (isLoading) {
    return (
      <Card className="w-full h-[400px]">
        <CardContent className="flex items-center justify-center h-full">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full h-[400px]">
        <CardContent className="flex items-center justify-center h-full text-destructive">
          Failed to load infrastructure data
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          Infrastructure Resilience
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Resilience Score</span>
              <span className="text-sm font-medium">{data.resilience}%</span>
            </div>
            <Progress value={data.resilience} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-muted-foreground">
                    Vulnerable Areas
                  </span>
                </div>
                <p className="text-2xl font-bold mt-2">{data.vulnerableAreas}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-muted-foreground">
                    Critical Points
                  </span>
                </div>
                <p className="text-2xl font-bold mt-2">{data.criticalPoints}</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-sm text-muted-foreground">
            Last updated: {new Date(data.lastUpdated).toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
