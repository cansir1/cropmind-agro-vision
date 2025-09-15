import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Satellite, BarChart3, Users, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-agriculture.jpg";

const Hero = () => {
  const [selectedRole, setSelectedRole] = useState("farmer");
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const handleSignup = async () => {
    if (!signupEmail || !signupUsername || !signupPassword) {
      toast.error("Email, username and password are required");
      return;
    }
    if (signupPassword !== signupConfirm) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      setAuthLoading(true);
      const { error } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: { 
          data: { 
            username: signupUsername,
            role: selectedRole 
          },
          emailRedirectTo: `${window.location.origin}/`
        },
      });
      if (error) throw error;
      toast.success("Account created successfully! Please check your email to confirm.");
      setShowSignup(false);
    } catch (err: any) {
      toast.error(err.message || "Registration failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!loginIdentifier || !loginPassword) {
      toast.error("Username/email and password are required");
      return;
    }
    try {
      setAuthLoading(true);
      
      // Try to get user email by username or email
      const { data: userData } = await supabase.rpc('get_user_by_username_or_email', {
        identifier: loginIdentifier
      });
      
      let emailToUse = loginIdentifier;
      if (userData && userData.length > 0) {
        emailToUse = userData[0].email;
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailToUse,
        password: loginPassword,
      });
      
      if (error) throw error;
      
      toast.success("Logged in successfully");
      setShowLogin(false);
      window.location.href = `/field-input?role=${selectedRole}`;
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setAuthLoading(false);
    }
  };

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
                    onClick={() => setShowSignup(true)}
                  >
                    Get Started
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => setShowLogin(true)}>
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

      {/* Auth Dialogs */}
      <Dialog open={showSignup} onOpenChange={setShowSignup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create your account</DialogTitle>
            <DialogDescription>Register to continue to CropMind</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input id="signup-email" type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="signup-username">Username</Label>
              <Input id="signup-username" type="text" value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input id="signup-password" type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="signup-confirm">Confirm Password</Label>
              <Input id="signup-confirm" type="password" value={signupConfirm} onChange={(e) => setSignupConfirm(e.target.value)} />
            </div>
            <p className="text-xs text-muted-foreground">Selected role: {selectedRole}</p>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowSignup(false)}>Cancel</Button>
            <Button onClick={handleSignup} disabled={authLoading}>{authLoading ? "Signing up..." : "Create account"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showLogin} onOpenChange={setShowLogin}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>Sign in to continue to CropMind</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="login-identifier">Username or Email</Label>
              <Input id="login-identifier" type="text" value={loginIdentifier} onChange={(e) => setLoginIdentifier(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="login-password">Password</Label>
              <Input id="login-password" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
            </div>
            <p className="text-xs text-muted-foreground">Selected role: {selectedRole}</p>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowLogin(false)}>Cancel</Button>
            <Button onClick={handleLogin} disabled={authLoading}>{authLoading ? "Logging in..." : "Login"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Hero;