import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { type ClimateData } from "@shared/schema";
import { Thermometer, Droplets, Wind, AlertTriangle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from "react";

const REFRESH_INTERVAL = 5000; // 5 seconds
const TEMPERATURE_WARNING = 30; // °C
const HUMIDITY_WARNING = 70; // %
const AIR_QUALITY_WARNING = 50; // index

export default function ClimateWidget() {
  const [historicalData, setHistoricalData] = useState<ClimateData[]>([]);

  const { data, isLoading } = useQuery<ClimateData>({
    queryKey: ["/api/climate"],
    refetchInterval: REFRESH_INTERVAL,
  });

  useEffect(() => {
    if (data) {
      setHistoricalData(prev => [...prev, data].slice(-20)); // Keep last 20 readings
    }
  }, [data]);

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

  const alerts = [];
  if (data.temperature > TEMPERATURE_WARNING) {
    alerts.push(`High temperature detected: ${data.temperature.toFixed(1)}°C`);
  }
  if (data.humidity > HUMIDITY_WARNING) {
    alerts.push(`High humidity detected: ${data.humidity.toFixed(1)}%`);
  }
  if (data.airQuality < AIR_QUALITY_WARNING) {
    alerts.push(`Poor air quality detected: ${data.airQuality.toFixed(0)}`);
  }

  return (
    <Card className="animate-slideIn">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-red-500" />
          Climate Data
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {alerts.length > 0 && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {alerts.map((alert, index) => (
                  <div key={index}>{alert}</div>
                ))}
              </AlertDescription>
            </Alert>
          )}

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

          <div className="h-[200px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" tick={false} />
                <YAxis yAxisId="temp" domain={['auto', 'auto']} />
                <YAxis yAxisId="humid" orientation="right" domain={[0, 100]} />
                <Tooltip 
                  formatter={(value: number, name: string) => {
                    return [
                      name === 'temperature' ? `${value.toFixed(1)}°C` :
                      name === 'humidity' ? `${value.toFixed(1)}%` :
                      value.toFixed(0),
                      name.charAt(0).toUpperCase() + name.slice(1)
                    ];
                  }}
                />
                <Line 
                  yAxisId="temp"
                  type="monotone" 
                  dataKey="temperature" 
                  stroke="#ef4444" 
                  dot={false}
                  animationDuration={300}
                />
                <Line 
                  yAxisId="humid"
                  type="monotone" 
                  dataKey="humidity" 
                  stroke="#3b82f6" 
                  dot={false}
                  animationDuration={300}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="text-sm text-muted-foreground mt-4">
            Last updated: {new Date(data.timestamp).toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}