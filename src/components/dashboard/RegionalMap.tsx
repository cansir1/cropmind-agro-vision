import { useEffect, useRef } from 'react';

const RegionalMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = mapRef.current.clientWidth;
      canvas.height = 300;
      canvas.style.width = '100%';
      canvas.style.height = '300px';
      canvas.style.borderRadius = '6px';
      canvas.style.border = '1px solid hsl(var(--border))';
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#f5f5f5');
        gradient.addColorStop(1, '#e0e0e0');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw regions
        const regions = [
          { name: 'North Plains', x: 50, y: 50, w: 120, h: 80, health: 87 },
          { name: 'Central Valley', x: 200, y: 60, w: 140, h: 90, health: 92 },
          { name: 'South Hills', x: 60, y: 160, w: 100, h: 70, health: 79 },
          { name: 'East Meadows', x: 220, y: 170, w: 110, h: 75, health: 85 }
        ];

        regions.forEach(region => {
          // Color based on health score
          let color;
          if (region.health >= 90) color = 'rgba(76, 175, 80, 0.8)';
          else if (region.health >= 80) color = 'rgba(139, 195, 74, 0.8)';
          else color = 'rgba(255, 193, 7, 0.8)';

          ctx.fillStyle = color;
          ctx.fillRect(region.x, region.y, region.w, region.h);
          
          // Border
          ctx.strokeStyle = '#333';
          ctx.lineWidth = 1;
          ctx.strokeRect(region.x, region.y, region.w, region.h);
          
          // Label
          ctx.fillStyle = '#333';
          ctx.font = '12px Arial';
          ctx.fillText(region.name, region.x + 5, region.y + 15);
          ctx.fillText(`${region.health}%`, region.x + 5, region.y + 30);
        });

        // Legend
        ctx.fillStyle = '#333';
        ctx.font = '10px Arial';
        ctx.fillText('Health Score:', 10, canvas.height - 30);
        
        // Legend colors
        const legendItems = [
          { color: 'rgba(76, 175, 80, 0.8)', label: '90%+', x: 10 },
          { color: 'rgba(139, 195, 74, 0.8)', label: '80-89%', x: 60 },
          { color: 'rgba(255, 193, 7, 0.8)', label: '<80%', x: 120 }
        ];

        legendItems.forEach(item => {
          ctx.fillStyle = item.color;
          ctx.fillRect(item.x, canvas.height - 20, 15, 10);
          ctx.fillStyle = '#333';
          ctx.fillText(item.label, item.x + 20, canvas.height - 12);
        });
      }
      
      mapRef.current.innerHTML = '';
      mapRef.current.appendChild(canvas);
    }
  }, []);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-75 bg-muted rounded-lg flex items-center justify-center"
    >
      <div className="text-muted-foreground">Loading regional map...</div>
    </div>
  );
};

export default RegionalMap;