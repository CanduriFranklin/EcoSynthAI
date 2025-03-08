import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Loader2, City, TreePine, Zap, Bike } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function UrbanWidget() {
  const { data, isLoading, error } = useQuery<{
    greenSpacePercent: number;
    sustainabilityScore: number;
    energyEfficiency: number;
    recommendations: string[];
  }>({ queryKey: ["/api/urban-metrics"] });

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
          Failed to load urban planning data
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <City className="h-5 w-5 text-primary" />
          Urban Sustainability
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TreePine className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">Green Space</span>
                </div>
                <span className="text-sm font-medium">{data.greenSpacePercent}%</span>
              </div>
              <Progress value={data.greenSpacePercent} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-muted-foreground">Energy Efficiency</span>
                </div>
                <span className="text-sm font-medium">{data.energyEfficiency}%</span>
              </div>
              <Progress value={data.energyEfficiency} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bike className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-muted-foreground">
                    Sustainability Score
                  </span>
                </div>
                <span className="text-sm font-medium">{data.sustainabilityScore}%</span>
              </div>
              <Progress value={data.sustainabilityScore} className="h-2" />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Recommendations</h4>
            <ul className="space-y-2">
              {data.recommendations.map((recommendation, index) => (
                <li
                  key={index}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <span className="text-primary">•</span>
                  {recommendation}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
