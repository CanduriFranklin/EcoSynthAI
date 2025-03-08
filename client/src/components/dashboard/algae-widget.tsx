import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Waves, AlertCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";

export function AlgaeWidget() {
  const { data, isLoading, error } = useQuery<{
    riskLevel: string;
    probability: number;
    affectedAreas: string[];
    predictions: Array<{ date: string; risk: number }>;
  }>({ queryKey: ["/api/algae-risk"] });

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
          Failed to load algae data
        </CardContent>
      </Card>
    );
  }

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "low":
        return "bg-green-500/10 text-green-500";
      case "moderate":
        return "bg-yellow-500/10 text-yellow-500";
      case "high":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Waves className="h-5 w-5 text-primary" />
          Algae Outbreak Prediction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span className="text-sm text-muted-foreground">Current Risk Level</span>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="outline" className={getRiskColor(data.riskLevel)}>
                  {data.riskLevel}
                </Badge>
                <span className="text-sm">({data.probability}% probability)</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Affected Areas</h4>
            <div className="flex gap-2 flex-wrap">
              {data.affectedAreas.map((area) => (
                <Badge key={area} variant="secondary">
                  {area}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">7-Day Prediction</h4>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.predictions}>
                  <XAxis
                    dataKey="date"
                    tickFormatter={(date) => new Date(date).toLocaleDateString()}
                  />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
                  />
                  <Line
                    type="monotone"
                    dataKey="risk"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
