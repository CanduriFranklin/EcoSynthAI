import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { type ClimateData } from "@shared/schema";
import { Thermometer, Droplets, Wind } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ClimateWidget() {
  const { data, isLoading } = useQuery<ClimateData>({
    queryKey: ["/api/climate"],
  });

  if (isLoading || !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Climate Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-20" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Climate Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center">
            <Thermometer className="h-8 w-8 text-red-500 mb-2" />
            <div className="text-2xl font-semibold">{data.temperature.toFixed(1)}°C</div>
            <div className="text-sm text-muted-foreground">Temperature</div>
          </div>
          <div className="flex flex-col items-center">
            <Droplets className="h-8 w-8 text-blue-500 mb-2" />
            <div className="text-2xl font-semibold">{data.humidity.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">Humidity</div>
          </div>
          <div className="flex flex-col items-center">
            <Wind className="h-8 w-8 text-green-500 mb-2" />
            <div className="text-2xl font-semibold">{data.airQuality.toFixed(0)}</div>
            <div className="text-sm text-muted-foreground">Air Quality</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
