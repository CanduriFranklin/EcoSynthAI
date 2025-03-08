import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Loader2, Thermometer, Droplets, Wind } from "lucide-react";

export function ClimateWidget() {
  const { data, isLoading, error } = useQuery<{
    temperature: number;
    humidity: number;
    airQuality: number;
    co2Levels: number;
    timestamps: string[];
  }>({ queryKey: ["/api/climate-data"] });

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
          Failed to load climate data
        </CardContent>
      </Card>
    );
  }

  const chartData = data.timestamps.map((timestamp, i) => ({
    time: new Date(timestamp).toLocaleTimeString(),
    temperature: data.temperature - Math.random() * 2,
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-primary" />
          Climate Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-orange-500" />
              <span className="text-sm text-muted-foreground">Temperature</span>
            </div>
            <p className="text-2xl font-bold">{data.temperature}°C</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-muted-foreground">Humidity</span>
            </div>
            <p className="text-2xl font-bold">{data.humidity}%</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">Air Quality</span>
            </div>
            <p className="text-2xl font-bold">{data.airQuality}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-purple-500" />
              <span className="text-sm text-muted-foreground">CO2 Levels</span>
            </div>
            <p className="text-2xl font-bold">{data.co2Levels} ppm</p>
          </div>
        </div>

        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
