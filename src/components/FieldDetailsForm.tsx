import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const cropTypes = [
  'Wheat', 'Corn', 'Rice', 'Soybean', 'Cotton', 'Sugarcane', 
  'Potato', 'Tomato', 'Onion', 'Carrot', 'Apple', 'Orange', 'Other'
];

const fieldFormSchema = z.object({
  fieldName: z.string().min(1, 'Field name is required'),
  cropType: z.string().min(1, 'Please select a crop type'),
  soilMoisture: z.string().optional(),
  temperature: z.string().optional(),
  humidity: z.string().optional(),
  notes: z.string().optional(),
});

type FieldFormData = z.infer<typeof fieldFormSchema>;

interface FieldDetailsFormProps {
  userRole: 'farmer' | 'scientist' | 'admin';
  location: string;
  area: number;
  onSubmit: (data: FieldFormData) => void;
  loading?: boolean;
}

const FieldDetailsForm: React.FC<FieldDetailsFormProps> = ({
  userRole,
  location,
  area,
  onSubmit,
  loading = false
}) => {
  const form = useForm<FieldFormData>({
    resolver: zodResolver(fieldFormSchema),
    defaultValues: {
      fieldName: '',
      cropType: '',
      soilMoisture: '',
      temperature: '',
      humidity: '',
      notes: '',
    },
  });

  const handleSubmit = (data: FieldFormData) => {
    onSubmit(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-agriculture-primary">Field Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fieldName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Field Name/ID</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., North Field A1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cropType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Crop Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select crop type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cropTypes.map((crop) => (
                          <SelectItem key={crop} value={crop.toLowerCase()}>
                            {crop}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input value={location} readOnly className="bg-muted" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Area</label>
                <Input 
                  value={area > 0 ? `${area.toFixed(2)} acres` : 'Draw area on map'} 
                  readOnly 
                  className="bg-muted" 
                />
              </div>
            </div>

            {/* Sensor Data Section */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-3 text-agriculture-secondary">Sensor Data</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="soilMoisture"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Soil Moisture (%)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="e.g., 65" 
                          min="0" 
                          max="100" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="temperature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Temperature (°C)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="e.g., 25" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="humidity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Humidity (%)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="e.g., 70" 
                          min="0" 
                          max="100" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Advanced features for Scientists/Admins */}
            {(userRole === 'scientist' || userRole === 'admin') && (
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-3 text-agriculture-secondary">
                  Advanced Data {userRole === 'admin' ? '(Admin)' : '(Scientist)'}
                </h3>
                
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Research Notes / Additional Data</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter detailed observations, research notes, or additional sensor data..."
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mt-4">
                  <label className="text-sm font-medium block mb-2">CSV Data Upload</label>
                  <Input 
                    type="file" 
                    accept=".csv" 
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-agriculture-primary file:text-white hover:file:bg-agriculture-primary/90"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload sensor data, soil analysis, or other research data in CSV format
                  </p>
                </div>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading || area <= 0}
            >
              {loading ? 'Processing...' : 'Analyze Field Data'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FieldDetailsForm;