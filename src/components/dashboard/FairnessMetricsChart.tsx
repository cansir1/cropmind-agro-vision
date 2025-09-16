import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

const FairnessMetricsChart = () => {
  const data = [
    { subject: 'Resource Allocation', A: 85, fullMark: 100 },
    { subject: 'Prediction Accuracy', A: 78, fullMark: 100 },
    { subject: 'Regional Fairness', A: 91, fullMark: 100 },
    { subject: 'User Access', A: 88, fullMark: 100 },
    { subject: 'Data Representation', A: 82, fullMark: 100 },
    { subject: 'Bias Mitigation', A: 76, fullMark: 100 }
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
          />
          <Radar
            name="Fairness Score"
            dataKey="A"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FairnessMetricsChart;