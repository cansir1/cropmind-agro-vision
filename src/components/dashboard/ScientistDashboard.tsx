import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Download, Database, TrendingUp, Brain, BarChart3 } from "lucide-react";
import { User } from "@supabase/supabase-js";
import ModelOutputChart from "./ModelOutputChart";
import FieldMap from "./FieldMap";
import DataTable from "./DataTable";

interface ScientistDashboardProps {
  user: User | null;
}

const ScientistDashboard = ({ user }: ScientistDashboardProps) => {
  // Mock data for scientist dashboard
  const modelMetrics = [
    { name: "NDVI Classification", accuracy: 92.5, confidence: 0.89 },
    { name: "Pest Detection", accuracy: 87.3, confidence: 0.84 },
    { name: "Yield Prediction", accuracy: 78.9, confidence: 0.76 }
  ];

  const featureImportance = [
    { feature: "Soil Moisture", importance: 0.34 },
    { feature: "Temperature", importance: 0.28 },
    { feature: "NDVI", importance: 0.22 },
    { feature: "Humidity", importance: 0.16 }
  ];

  const sensorData = [
    { timestamp: "2024-01-15 09:00", moisture: 65, temp: 24.5, humidity: 72, ndvi: 0.75 },
    { timestamp: "2024-01-15 12:00", moisture: 63, temp: 26.8, humidity: 68, ndvi: 0.74 },
    { timestamp: "2024-01-15 15:00", moisture: 61, temp: 28.2, humidity: 65, ndvi: 0.73 },
    { timestamp: "2024-01-15 18:00", moisture: 64, temp: 25.1, humidity: 70, ndvi: 0.74 }
  ];

  return (
    <div className="space-y-6">
      {/* Model Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modelMetrics.map((model, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Brain className="w-4 h-4" />
                {model.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Accuracy</span>
                    <span>{model.accuracy}%</span>
                  </div>
                  <Progress value={model.accuracy} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Confidence</span>
                    <span>{(model.confidence * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={model.confidence * 100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="data" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="data" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Raw Data
          </TabsTrigger>
          <TabsTrigger value="models" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Model Output
          </TabsTrigger>
          <TabsTrigger value="explainable" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Explainable AI
          </TabsTrigger>
          <TabsTrigger value="map" className="flex items-center gap-2">
            Field Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Sensor Data Logs</CardTitle>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable data={sensorData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Classification Heatmap</CardTitle>
              </CardHeader>
              <CardContent>
                <ModelOutputChart type="heatmap" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Confidence Scores</CardTitle>
              </CardHeader>
              <CardContent>
                <ModelOutputChart type="confidence" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="explainable" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Feature Importance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {featureImportance.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.feature}</span>
                        <span>{(item.importance * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={item.importance * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Prediction Rationale</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted">
                    <h4 className="font-medium mb-2">Current Prediction: Healthy Crop</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      The model predicts healthy crop status based on the following factors:
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>✓ NDVI value (0.75) indicates vigorous vegetation</li>
                      <li>✓ Soil moisture (65%) is within optimal range</li>
                      <li>✓ Temperature (24°C) suitable for crop growth</li>
                      <li>⚠ Humidity (72%) slightly above ideal range</li>
                    </ul>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    Confidence: 89%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="map" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Field Analysis Map</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldMap role="scientist" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Data Export</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Raw Data
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Model Results
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Analysis Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScientistDashboard;