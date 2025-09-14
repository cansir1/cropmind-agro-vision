import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Satellite, 
  Brain, 
  TrendingUp, 
  Shield, 
  Map, 
  Activity,
  Target,
  Users,
  BarChart3
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Satellite,
      title: "Satellite & Hyperspectral Imaging",
      description: "Advanced remote sensing technology provides comprehensive field coverage with detailed spectral analysis for precise crop monitoring.",
      color: "bg-sky/10 text-sky"
    },
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Machine learning algorithms analyze spectral patterns and environmental conditions to predict crop health with unprecedented accuracy.",
      color: "bg-primary/10 text-primary"
    },
    {
      icon: Activity,
      title: "Real-Time Monitoring",
      description: "Continuous field monitoring through integrated sensor networks delivers up-to-the-minute insights on crop conditions.",
      color: "bg-success/10 text-success"
    },
    {
      icon: Target,
      title: "Field-Specific Predictions",
      description: "Hyper-localized forecasts tailored to individual fields, accounting for micro-climate variations and soil conditions.",
      color: "bg-accent/10 text-accent"
    },
    {
      icon: Users,
      title: "Role-Based Dashboards",
      description: "Customized interfaces for farmers, scientists, and administrators, each optimized for specific use cases and expertise levels.",
      color: "bg-warning/10 text-warning"
    },
    {
      icon: BarChart3,
      title: "Actionable Insights",
      description: "Clear, data-driven recommendations help optimize irrigation, fertilization, pest control, and harvest timing decisions.",
      color: "bg-destructive/10 text-destructive"
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Advanced Agricultural Intelligence
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how CropMind transforms traditional farming with cutting-edge 
            technology and intelligent data analysis.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur">
                <CardHeader className="pb-4">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.color} mb-4`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;