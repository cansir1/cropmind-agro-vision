import { useEffect, useRef } from 'react';

interface FieldMapProps {
  role: 'farmer' | 'scientist' | 'admin';
}

const FieldMap = ({ role }: FieldMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // For now, we'll create a simple mock map visualization
    // In a real app, this would integrate with Mapbox or similar
    if (mapRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = mapRef.current.clientWidth;
      canvas.height = 200;
      canvas.style.width = '100%';
      canvas.style.height = '200px';
      canvas.style.borderRadius = '6px';
      canvas.style.border = '1px solid hsl(var(--border))';
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Create a gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#e8f5e8');
        gradient.addColorStop(1, '#c8e6c9');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw field zones based on role
        if (role === 'farmer') {
          // Draw stress zones for farmer
          ctx.fillStyle = 'rgba(76, 175, 80, 0.7)'; // Green for healthy
          ctx.fillRect(20, 20, 120, 80);
          
          ctx.fillStyle = 'rgba(255, 193, 7, 0.7)'; // Yellow for stressed
          ctx.fillRect(160, 30, 80, 60);
          
          ctx.fillStyle = 'rgba(244, 67, 54, 0.7)'; // Red for problem areas
          ctx.fillRect(270, 40, 60, 50);
        } else if (role === 'scientist') {
          // Draw more detailed analysis zones
          for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 4; j++) {
              const intensity = Math.random();
              ctx.fillStyle = `rgba(76, 175, 80, ${intensity})`;
              ctx.fillRect(i * 40 + 10, j * 40 + 10, 35, 35);
            }
          }
        } else {
          // Admin view - regional overview
          ctx.fillStyle = 'rgba(33, 150, 243, 0.6)'; // Blue for regional data
          ctx.fillRect(50, 50, 250, 100);
          
          // Add some data points
          ctx.fillStyle = '#1976D2';
          for (let i = 0; i < 10; i++) {
            const x = Math.random() * 250 + 50;
            const y = Math.random() * 100 + 50;
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.fill();
          }
        }

        // Add labels
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        if (role === 'farmer') {
          ctx.fillText('Healthy Zone', 25, 15);
          ctx.fillText('Monitor Zone', 165, 25);
          ctx.fillText('Alert Zone', 275, 35);
        } else if (role === 'scientist') {
          ctx.fillText('NDVI Analysis Grid', 15, 15);
        } else {
          ctx.fillText('Regional Overview', 55, 45);
        }
      }
      
      mapRef.current.innerHTML = '';
      mapRef.current.appendChild(canvas);
    }
  }, [role]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-50 bg-muted rounded-lg flex items-center justify-center"
    >
      <div className="text-muted-foreground">Loading map...</div>
    </div>
  );
};

export default FieldMap;