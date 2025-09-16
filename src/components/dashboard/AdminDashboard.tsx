import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { MapPin, Users, TrendingUp, AlertCircle, Activity, BarChart3 } from "lucide-react";
import { User } from "@supabase/supabase-js";
import RegionalMap from "./RegionalMap";
import FairnessMetricsChart from "./FairnessMetricsChart";
import UserActivityChart from "./UserActivityChart";

interface AdminDashboardProps {
  user: User | null;
}

const AdminDashboard = ({ user }: AdminDashboardProps) => {
  // Mock data for admin dashboard
  const regionalSummary = [
    { region: "North Plains", fields: 145, healthScore: 87, alerts: 3 },
    { region: "Central Valley", fields: 203, healthScore: 92, alerts: 1 },
    { region: "South Hills", fields: 89, healthScore: 79, alerts: 7 },
    { region: "East Meadows", fields: 167, healthScore: 85, alerts: 4 }
  ];

  const fairnessMetrics = [
    { metric: "Resource Allocation Equity", score: 0.85, status: "good" },
    { metric: "Prediction Bias", score: 0.12, status: "warning" },
    { metric: "Regional Fairness", score: 0.91, status: "good" },
    { metric: "User Access Equity", score: 0.88, status: "good" }
  ];

  const userActivity = {
    totalUsers: 1247,
    activeUsers: 892,
    fieldSubmissions: 3456,
    feedbackReceived: 789
  };

  const policyInsights = [
    {
      title: "Water Conservation Priority",
      description: "AI models suggest focusing water conservation efforts in South Hills region",
      impact: "High",
      recommendation: "Implement tiered water allocation system"
    },
    {
      title: "Fertilizer Distribution",
      description: "Uneven fertilizer access detected across Central Valley farms",
      impact: "Medium",
      recommendation: "Establish regional distribution centers"
    },
    {
      title: "Technology Adoption",
      description: "Lower smartphone usage in rural areas affecting AI recommendations reach",
      impact: "Medium",
      recommendation: "Develop SMS-based alert system"
    }
  ];

  const getHealthColor = (score: number) => {
    if (score >= 85) return "success";
    if (score >= 70) return "warning";
    return "destructive";
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "destructive";
      case "Medium": return "warning";
      case "Low": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="w-4 h-4" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground mb-2">
              {userActivity.totalUsers.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">
              {userActivity.activeUsers} active today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="w-4 h-4" />
              Fields Monitored
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground mb-2">
              {regionalSummary.reduce((sum, region) => sum + region.fields, 0).toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">
              Across {regionalSummary.length} regions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="w-4 h-4" />
              Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground mb-2">
              {userActivity.fieldSubmissions.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="w-4 h-4" />
              Feedback Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground mb-2">
              4.2/5
            </div>
            <p className="text-sm text-muted-foreground">
              {userActivity.feedbackReceived} responses
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="regional" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="regional">Regional Overview</TabsTrigger>
          <TabsTrigger value="fairness">Fairness Metrics</TabsTrigger>
          <TabsTrigger value="activity">User Activity</TabsTrigger>
          <TabsTrigger value="insights">Policy Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="regional" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Regional Summary Map</CardTitle>
              </CardHeader>
              <CardContent>
                <RegionalMap />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Regional Health Scores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regionalSummary.map((region, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{region.region}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant={getHealthColor(region.healthScore) as any}>
                            {region.healthScore}%
                          </Badge>
                          {region.alerts > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {region.alerts} alerts
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground mb-1">
                        <span>{region.fields} fields</span>
                        <span>{region.healthScore}% healthy</span>
                      </div>
                      <Progress value={region.healthScore} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fairness" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Fairness Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fairnessMetrics.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{metric.metric}</span>
                        <Badge variant={metric.status === 'good' ? 'success' : 'warning' as any}>
                          {(metric.score * 100).toFixed(1)}%
                        </Badge>
                      </div>
                      <Progress value={metric.score * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Bias Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <FairnessMetricsChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Activity Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <UserActivityChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                AI-Driven Policy Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {policyInsights.map((insight, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-card">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-medium">{insight.title}</h4>
                      <Badge variant={getImpactColor(insight.impact) as any}>
                        {insight.impact} Impact
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {insight.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Recommendation:</span>
                      <span className="text-sm">{insight.recommendation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">Generate Monthly Report</Button>
            <Button variant="outline">Schedule System Maintenance</Button>
            <Button variant="outline">Review User Feedback</Button>
            <Button variant="outline">Export Regional Data</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;