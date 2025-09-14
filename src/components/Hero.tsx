import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Satellite, BarChart3, Users, MapPin } from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/hero-agriculture.jpg";

const Hero = () => {
  const [selectedRole, setSelectedRole] = useState("farmer");

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Smart Agriculture
                <span className="block bg-gradient-to-r from-primary to-sky bg-clip-text text-transparent">
                  Powered by AI
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                CropMind combines satellite imagery, hyperspectral data, and field sensors 
                to deliver real-time, field-specific predictions of crop health through 
                intelligent AI analysis.
              </p>
            </div>
            
            {/* Feature Highlights */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-success/10">
                  <Satellite className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="font-medium">Satellite Imagery</p>
                  <p className="text-sm text-muted-foreground">Real-time monitoring</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/10">
                  <BarChart3 className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium">AI Predictions</p>
                  <p className="text-sm text-muted-foreground">Accurate insights</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-sky/10">
                  <MapPin className="h-5 w-5 text-sky" />
                </div>
                <div>
                  <p className="font-medium">Field Sensors</p>
                  <p className="text-sm text-muted-foreground">Ground truth data</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-warning/10">
                  <Users className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="font-medium">Role-Based Access</p>
                  <p className="text-sm text-muted-foreground">Tailored dashboards</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Role Selection Card */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md shadow-xl bg-card/95 backdrop-blur">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl">Get Started</CardTitle>
                <CardDescription>
                  Choose your role to access tailored agricultural insights
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-base font-medium">Select Your Role</Label>
                  <RadioGroup 
                    value={selectedRole} 
                    onValueChange={setSelectedRole}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-input hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="farmer" id="farmer" />
                      <Label htmlFor="farmer" className="cursor-pointer flex-1">
                        <div>
                          <p className="font-medium">Farmer</p>
                          <p className="text-sm text-muted-foreground">
                            Simple dashboard with actionable insights
                          </p>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-input hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="scientist" id="scientist" />
                      <Label htmlFor="scientist" className="cursor-pointer flex-1">
                        <div>
                          <p className="font-medium">Scientist</p>
                          <p className="text-sm text-muted-foreground">
                            Advanced analytics and research tools
                          </p>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-input hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="administrator" id="administrator" />
                      <Label htmlFor="administrator" className="cursor-pointer flex-1">
                        <div>
                          <p className="font-medium">Administrator</p>
                          <p className="text-sm text-muted-foreground">
                            Complete system management and oversight
                          </p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    variant="hero" 
                    className="w-full" 
                    size="lg"
                    onClick={() => window.location.href = `/field-input?role=${selectedRole}`}
                  >
                    Get Started
                  </Button>
                  <Button variant="outline" className="w-full">
                    Login to Existing Account
                  </Button>
                </div>
                
                <p className="text-xs text-center text-muted-foreground">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;