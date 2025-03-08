import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { type InfrastructureData } from "@shared/schema";
import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function InfrastructureWidget() {
  const { data, isLoading } = useQuery<InfrastructureData[]>({
    queryKey: ["/api/infrastructure"],
  });

  if (isLoading || !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Infrastructure Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px]" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Infrastructure Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <div className="font-semibold">{item.type}</div>
                <div className="text-sm text-muted-foreground">{item.location}</div>
              </div>
              <div className="flex items-center gap-2">
                {item.status === "good" && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                {item.status === "warning" && (
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                )}
                {item.status === "critical" && (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                <span className="capitalize">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
