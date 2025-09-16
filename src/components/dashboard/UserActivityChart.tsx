import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const UserActivityChart = () => {
  const data = [
    { date: 'Jan 1', submissions: 45, feedback: 12, users: 120 },
    { date: 'Jan 8', submissions: 52, feedback: 18, users: 135 },
    { date: 'Jan 15', submissions: 48, feedback: 15, users: 142 },
    { date: 'Jan 22', submissions: 61, feedback: 22, users: 158 },
    { date: 'Jan 29', submissions: 58, feedback: 19, users: 165 },
    { date: 'Feb 5', submissions: 67, feedback: 25, users: 172 },
    { date: 'Feb 12', submissions: 73, feedback: 28, users: 184 }
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
          <Area
            type="monotone"
            dataKey="users"
            stackId="1"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.6}
            name="Active Users"
          />
          <Area
            type="monotone"
            dataKey="submissions"
            stackId="2"
            stroke="hsl(var(--success))"
            fill="hsl(var(--success))"
            fillOpacity={0.6}
            name="Field Submissions"
          />
          <Area
            type="monotone"
            dataKey="feedback"
            stackId="3"
            stroke="hsl(var(--accent))"
            fill="hsl(var(--accent))"
            fillOpacity={0.6}
            name="Feedback Received"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserActivityChart;