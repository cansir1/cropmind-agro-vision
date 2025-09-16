import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ModelOutputChartProps {
  type: 'heatmap' | 'confidence';
}

const ModelOutputChart = ({ type }: ModelOutputChartProps) => {
  const heatmapData = [
    { zone: 'Zone A', healthy: 85, stressed: 10, diseased: 5 },
    { zone: 'Zone B', healthy: 75, stressed: 20, diseased: 5 },
    { zone: 'Zone C', healthy: 60, stressed: 25, diseased: 15 },
    { zone: 'Zone D', healthy: 90, stressed: 8, diseased: 2 }
  ];

  const confidenceData = [
    { name: 'High Confidence', value: 65, color: 'hsl(var(--success))' },
    { name: 'Medium Confidence', value: 25, color: 'hsl(var(--warning))' },
    { name: 'Low Confidence', value: 10, color: 'hsl(var(--destructive))' }
  ];

  if (type === 'confidence') {
    return (
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={confidenceData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}%`}
            >
              {confidenceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={heatmapData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="zone" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px'
            }}
          />
          <Bar dataKey="healthy" stackId="a" fill="hsl(var(--success))" name="Healthy" />
          <Bar dataKey="stressed" stackId="a" fill="hsl(var(--warning))" name="Stressed" />
          <Bar dataKey="diseased" stackId="a" fill="hsl(var(--destructive))" name="Diseased" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ModelOutputChart;