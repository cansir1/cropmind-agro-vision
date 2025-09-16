import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CropHealthChart = () => {
  const data = [
    { date: 'Jan 1', health: 75, ndvi: 0.65 },
    { date: 'Jan 8', health: 78, ndvi: 0.68 },
    { date: 'Jan 15', health: 82, ndvi: 0.72 },
    { date: 'Jan 22', health: 85, ndvi: 0.75 },
    { date: 'Jan 29', health: 83, ndvi: 0.73 },
    { date: 'Feb 5', health: 87, ndvi: 0.77 },
    { date: 'Feb 12', health: 89, ndvi: 0.79 }
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="date" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="health" 
            stroke="hsl(var(--success))" 
            strokeWidth={2}
            name="Health Score (%)"
          />
          <Line 
            type="monotone" 
            dataKey="ndvi" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            name="NDVI Index"
            yAxisId="right"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CropHealthChart;