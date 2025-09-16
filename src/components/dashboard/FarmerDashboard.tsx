import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Droplets, Thermometer, Eye, ThumbsUp, ThumbsDown } from "lucide-react";
import { User } from "@supabase/supabase-js";
import CropHealthChart from "./CropHealthChart";
import FieldMap from "./FieldMap";

interface FarmerDashboardProps {
  user: User | null;
}

const FarmerDashboard = ({ user }: FarmerDashboardProps) => {
  // Mock data for farmer dashboard
  const cropHealthStatus = {
    overall: "good",
    ndvi: 0.75,
    healthScore: 85
  };

  const sensorData = [
    { label: "Soil Moisture", value: 65, unit: "%", icon: Droplets, status: "good" },
    { label: "Temperature", value: 24, unit: "°C", icon: Thermometer, status: "good" },
    { label: "Humidity", value: 72, unit: "%", icon: Eye, status: "warning" }
  ];

  const recommendations = [
    {
      type: "irrigation",
      title: "Irrigation Recommendation",
      message: "Consider watering Zone A in the next 2 days based on soil moisture levels.",
      priority: "medium"
    },
    {
      type: "fertilizer",
      title: "Fertilizer Alert",
      message: "Nitrogen levels are optimal. Consider potassium supplement in 2 weeks.",
      priority: "low"
    },
    {
      type: "pest",
      title: "Pest Alert",
      message: "Early signs of aphid activity detected in Zone C. Monitor closely.",
      priority: "high"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "success";
      case "warning": return "warning";
      case "danger": return "destructive";
      default: return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Crop Health Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${
                cropHealthStatus.overall === 'good' ? 'bg-success' : 
                cropHealthStatus.overall === 'warning' ? 'bg-warning' : 'bg-destructive'
              }`}></div>
              Crop Health Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Health Score</span>
                  <span>{cropHealthStatus.healthScore}%</span>
                </div>
                <Progress value={cropHealthStatus.healthScore} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>NDVI Index</span>
                  <span>{cropHealthStatus.ndvi}</span>
                </div>
                <Progress value={cropHealthStatus.ndvi * 100} className="h-2" />
              </div>
              <Badge variant={getStatusColor(cropHealthStatus.overall) as any} className="capitalize">
                {cropHealthStatus.overall}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Recent Sensor Readings */}
        {sensorData.map((sensor, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <sensor.icon className="w-4 h-4" />
                {sensor.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-2">
                {sensor.value}{sensor.unit}
              </div>
              <Badge variant={getStatusColor(sensor.status) as any}>
                {sensor.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Crop Health Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <CropHealthChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Field Map</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldMap role="farmer" />
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium">{rec.title}</h4>
                    <Badge variant={getPriorityColor(rec.priority) as any} className="text-xs">
                      {rec.priority} priority
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{rec.message}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="h-8">
                      <ThumbsUp className="w-3 h-3 mr-1" />
                      Helpful
                    </Button>
                    <Button size="sm" variant="outline" className="h-8">
                      <ThumbsDown className="w-3 h-3 mr-1" />
                      Not Helpful
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Feedback Section */}
      <Card>
        <CardHeader>
          <CardTitle>Prediction Accuracy Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Help us improve our AI predictions by providing feedback on accuracy.
          </p>
          <Button className="bg-primary hover:bg-primary/90">
            Rate Recent Predictions
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerDashboard;