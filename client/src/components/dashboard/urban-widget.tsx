import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { type UrbanData } from "@shared/schema";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, Leaf, Droplets, Zap } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function UrbanWidget() {
  const { data, isLoading } = useQuery<UrbanData>({
    queryKey: ["/api/urban"],
    refetchInterval: 5000, // Real-time updates every 5 seconds
  });

  if (isLoading || !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Urban Sustainability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 animate-pulse">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-8" />
            <Skeleton className="h-8" />
            <Skeleton className="h-8" />
            <Skeleton className="h-8" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const metrics = [
    { 
      label: "Green Space",
      value: data.greenSpacePercent,
      color: "bg-green-500",
      icon: <Leaf className="h-4 w-4" />
    },
    { 
      label: "Sustainability",
      value: data.sustainabilityScore,
      color: "bg-blue-500",
      icon: <Droplets className="h-4 w-4" />
    },
    { 
      label: "Energy Efficiency",
      value: data.energyEfficiency,
      color: "bg-yellow-500",
      icon: <Zap className="h-4 w-4" />
    },
  ];

  return (
    <Card className="animate-slideIn">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-green-500" />
          Urban Sustainability
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {data.alerts && data.alerts.length > 0 && (
            <Alert variant={data.alerts[0].severity === "critical" ? "destructive" : "default"}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {data.alerts.map((alert, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="font-medium">{alert.type}:</span>
                    {alert.message}
                  </div>
                ))}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="transition-all duration-300 hover:translate-x-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium flex items-center gap-2">
                    {metric.icon}
                    {metric.label}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {metric.value.toFixed(1)}%
                  </span>
                </div>
                <Progress 
                  value={metric.value} 
                  className={`${metric.color} transition-all duration-500`}
                />
              </div>
            ))}
          </div>

          <div className="text-sm text-muted-foreground mt-4">
            Last updated: {new Date(data.timestamp).toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}