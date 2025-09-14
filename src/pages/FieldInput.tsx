import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import MapComponent from '@/components/MapComponent';
import FieldDetailsForm from '@/components/FieldDetailsForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Satellite, BarChart3 } from 'lucide-react';

const FieldInput = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userRole = (searchParams.get('role') as 'farmer' | 'scientist' | 'admin') || 'farmer';
  
  const [fieldData, setFieldData] = useState({
    location: '',
    area: 0,
    coordinates: [] as number[][],
  });
  
  const [loading, setLoading] = useState(false);

  const handleAreaCalculated = (area: number, coordinates: number[][]) => {
    setFieldData(prev => ({ ...prev, area, coordinates }));
    if (area > 0) {
      toast.success(`Field area calculated: ${area.toFixed(2)} acres`);
    }
  };

  const handleLocationUpdate = (location: { lat: number; lng: number; address: string }) => {
    setFieldData(prev => ({ ...prev, location: location.address }));
    toast.info(`Location updated: ${location.address}`);
  };

  const handleFormSubmit = async (formData: any) => {
    setLoading(true);
    
    try {
      // Here we would normally save to Supabase
      const completeFieldData = {
        ...formData,
        location: fieldData.location,
        area: fieldData.area,
        coordinates: fieldData.coordinates,
        userRole,
        timestamp: new Date().toISOString(),
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Field data submitted:', completeFieldData);
      toast.success('Field data saved successfully!');
      
      // Navigate to appropriate dashboard based on role
      const dashboardRoute = `/dashboard?role=${userRole}`;
      navigate(dashboardRoute);
      
    } catch (error) {
      console.error('Error saving field data:', error);
      toast.error('Failed to save field data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getRoleDisplayName = (role: string) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-agriculture-primary mb-2">
            Field Configuration
          </h1>
          <p className="text-muted-foreground">
            Welcome, {getRoleDisplayName(userRole)}! Configure your field for AI-powered crop analysis
          </p>
        </div>

        {/* Instructions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-agriculture-primary" />
              Getting Started
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-agriculture-primary text-white flex items-center justify-center text-xs font-bold">1</div>
                <div>
                  <p className="font-medium">Select Field Location</p>
                  <p className="text-muted-foreground">Click on the map to set your field's location</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-agriculture-primary text-white flex items-center justify-center text-xs font-bold">2</div>
                <div>
                  <p className="font-medium">Draw Field Boundary</p>
                  <p className="text-muted-foreground">Use the polygon tool to outline your field area</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-agriculture-primary text-white flex items-center justify-center text-xs font-bold">3</div>
                <div>
                  <p className="font-medium">Enter Field Details</p>
                  <p className="text-muted-foreground">Complete the form with crop and sensor data</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Satellite className="h-5 w-5 text-agriculture-primary" />
                Interactive Field Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MapComponent 
                onAreaCalculated={handleAreaCalculated}
                onLocationUpdate={handleLocationUpdate}
              />
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="bg-muted rounded p-3">
                  <p className="font-medium">Selected Location:</p>
                  <p className="text-muted-foreground">
                    {fieldData.location || 'Click on map to select'}
                  </p>
                </div>
                <div className="bg-muted rounded p-3">
                  <p className="font-medium">Calculated Area:</p>
                  <p className="text-muted-foreground">
                    {fieldData.area > 0 ? `${fieldData.area.toFixed(2)} acres` : 'Draw polygon to calculate'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form Section */}
          <FieldDetailsForm
            userRole={userRole}
            location={fieldData.location}
            area={fieldData.area}
            onSubmit={handleFormSubmit}
            loading={loading}
          />
        </div>

        {/* Role-specific Information */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-agriculture-primary" />
              What Happens Next? ({getRoleDisplayName(userRole)} View)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userRole === 'farmer' && (
              <div className="space-y-2">
                <p>Your field data will be analyzed using AI to provide:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                  <li>Real-time soil health monitoring</li>
                  <li>Pest and disease risk assessment</li>
                  <li>Irrigation and fertilization recommendations</li>
                  <li>Weather-based cultivation advice</li>
                </ul>
              </div>
            )}
            
            {userRole === 'scientist' && (
              <div className="space-y-2">
                <p>Advanced analytics will be generated including:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                  <li>Detailed spectral analysis from satellite imagery</li>
                  <li>Soil composition and nutrient mapping</li>
                  <li>Predictive yield modeling with confidence intervals</li>
                  <li>Research-grade data visualization and export tools</li>
                </ul>
              </div>
            )}
            
            {userRole === 'admin' && (
              <div className="space-y-2">
                <p>Comprehensive administrative dashboard will include:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                  <li>Multi-field comparison and regional analytics</li>
                  <li>User management and data access controls</li>
                  <li>System performance metrics and AI model accuracy</li>
                  <li>Export capabilities for reports and research data</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FieldInput;