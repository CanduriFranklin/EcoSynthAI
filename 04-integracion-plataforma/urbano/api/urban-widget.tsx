import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { type UrbanData } from "@shared/schema";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

export default function UrbanWidget() {
  const { data, isLoading } = useQuery<UrbanData>({
    queryKey: ["/api/urban"],
  });

  if (isLoading || !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Urban Sustainability</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[150px]" />
        </CardContent>
      </Card>
    );
  }

  const metrics = [
    { label: "Green Space", value: data.greenSpacePercent, color: "bg-green-500" },
    { label: "Sustainability", value: data.sustainabilityScore, color: "bg-blue-500" },
    { label: "Energy Efficiency", value: data.energyEfficiency, color: "bg-yellow-500" },
    { label: "Water Management", value: data.waterManagement, color: "bg-purple-500" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Urban Sustainability</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{metric.label}</span>
                <span className="text-sm text-muted-foreground">
                  {metric.value.toFixed(1)}%
                </span>
              </div>
              <Progress value={metric.value} className={metric.color} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
