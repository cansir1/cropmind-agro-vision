import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import Header from "@/components/Header";
import FarmerDashboard from "@/components/dashboard/FarmerDashboard";
import ScientistDashboard from "@/components/dashboard/ScientistDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      try {
        console.log('Dashboard: Checking authentication...');
        const { data: { session } } = await supabase.auth.getSession();
        
        console.log('Dashboard: Session check result:', session ? 'Session found' : 'No session');
        
        if (!session) {
          console.log('Dashboard: No session found, redirecting to home');
          navigate("/");
          return;
        }

        setUser(session.user);
        console.log('Dashboard: User authenticated:', session.user.email);
        
        // Get user profile to fetch role
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', session.user.id)
          .single();

        if (error) {
          console.error('Dashboard: Error fetching profile:', error);
          toast({
            title: "Error",
            description: "Failed to load user profile.",
            variant: "destructive",
          });
          return;
        }

        console.log('Dashboard: Profile loaded:', profile);
        setUserRole(profile?.role || "farmer");
      } catch (error) {
        console.error('Dashboard: Unexpected error:', error);
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const renderDashboard = () => {
    switch (userRole) {
      case "scientist":
        return <ScientistDashboard user={user} />;
      case "admin":
        return <AdminDashboard user={user} />;
      default:
        return <FarmerDashboard user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.user_metadata?.username || user?.email}
          </h1>
          <p className="text-muted-foreground capitalize">
            {userRole} Dashboard
          </p>
        </div>
        {renderDashboard()}
      </main>
    </div>
  );
};

export default Dashboard;