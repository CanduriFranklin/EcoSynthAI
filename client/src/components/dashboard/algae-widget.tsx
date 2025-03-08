import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { type AlgaeData } from "@shared/schema";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

export default function AlgaeWidget() {
  const { data, isLoading } = useQuery<AlgaeData>({
    queryKey: ["/api/algae"],
  });

  if (isLoading || !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Algae Outbreak Prediction</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[150px]" />
        </CardContent>
      </Card>
    );
  }

  const getRiskColor = (risk: number) => {
    if (risk < 30) return "bg-green-500";
    if (risk < 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Algae Outbreak Prediction</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Risk Level</span>
              <span className="text-sm text-muted-foreground">
                {data.riskLevel.toFixed(1)}%
              </span>
            </div>
            <Progress
              value={data.riskLevel}
              className={getRiskColor(data.riskLevel)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm font-medium">Location</div>
              <div className="text-lg">{data.location}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium">Water Temperature</div>
              <div className="text-lg">{data.temperature.toFixed(1)}°C</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium">Nutrient Level</div>
              <div className="text-lg">{data.nutrients.toFixed(1)}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
