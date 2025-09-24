import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, MousePointer, Square, MapPin } from 'lucide-react';

interface Point {
  x: number;
  y: number;
  lat: number;
  lng: number;
}

interface MapComponentProps {
  onAreaCalculated: (area: number, coordinates: number[][]) => void;
  onLocationUpdate: (location: { lat: number; lng: number; address: string }) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ onAreaCalculated, onLocationUpdate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<Point[]>([]);
  const [mode, setMode] = useState<'select' | 'draw' | 'point'>('draw');
  const [selectedLocation, setSelectedLocation] = useState<Point | null>(null);

  // Convert screen coordinates to lat/lng (mock conversion for demo)
  const screenToLatLng = useCallback((x: number, y: number, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const relativeX = (x - rect.left) / rect.width;
    const relativeY = (y - rect.top) / rect.height;
    
    // Mock conversion to realistic coordinates (centered around agricultural region)
    const lat = 40.7128 - (relativeY - 0.5) * 2; // New York area
    const lng = -95.7129 + (relativeX - 0.5) * 4; // Adjusted for agricultural region
    
    return { lat, lng };
  }, []);

  // Draw the map background and overlays
  const drawMap = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background (satellite-like appearance)
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#4a5d23');
    gradient.addColorStop(0.3, '#6b7c32');
    gradient.addColorStop(0.7, '#8b9a46');
    gradient.addColorStop(1, '#a4b05a');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add some field patterns
    ctx.strokeStyle = '#2d3e0f';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 30) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Draw selected location
    if (selectedLocation) {
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(selectedLocation.x, selectedLocation.y, 6, 0, 2 * Math.PI);
      ctx.fill();
      
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Draw polygon if points exist
    if (points.length > 0) {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 3;
      ctx.setLineDash([]);

      if (points.length > 2) {
        // Fill area
        ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.closePath();
        ctx.fill();
      }

      // Draw lines
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      if (points.length > 2) {
        ctx.closePath();
      }
      ctx.stroke();

      // Draw points
      points.forEach((point, index) => {
        ctx.fillStyle = index === 0 ? '#22c55e' : '#3b82f6';
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
        ctx.fill();
      });
    }
  }, [points, selectedLocation]);

  // Calculate area using shoelace formula
  const calculateArea = useCallback(() => {
    if (points.length < 3) return 0;

    let area = 0;
    for (let i = 0; i < points.length; i++) {
      const j = (i + 1) % points.length;
      area += points[i].lng * points[j].lat;
      area -= points[j].lng * points[i].lat;
    }
    area = Math.abs(area) / 2;

    // Convert to acres (rough approximation)
    const areaInSquareMeters = area * 111320 * 111320;
    const areaInAcres = areaInSquareMeters / 4047;
    
    return areaInAcres;
  }, [points]);

  // Handle canvas click
  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const { lat, lng } = screenToLatLng(x, y, canvas);

    if (mode === 'point') {
      setSelectedLocation({ x, y, lat, lng });
      const address = `Agricultural Field ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      onLocationUpdate({ lat, lng, address });
    } else if (mode === 'draw') {
      const newPoint = { x, y, lat, lng };
      const updatedPoints = [...points, newPoint];
      setPoints(updatedPoints);
      
      if (updatedPoints.length >= 3) {
        const area = calculateArea();
        const coordinates = updatedPoints.map(p => [p.lng, p.lat]);
        onAreaCalculated(area, coordinates);
      }
    }
  }, [mode, points, screenToLatLng, calculateArea, onAreaCalculated, onLocationUpdate]);

  // Clear all drawings
  const clearAll = useCallback(() => {
    setPoints([]);
    setSelectedLocation(null);
    onAreaCalculated(0, []);
  }, [onAreaCalculated]);

  // Set up canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      drawMap();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [drawMap]);

  // Redraw when points change
  useEffect(() => {
    drawMap();
  }, [drawMap]);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={mode === 'point' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setMode('point')}
          className="flex items-center gap-2"
        >
          <MapPin className="h-4 w-4" />
          Select Location
        </Button>
        <Button
          variant={mode === 'draw' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setMode('draw')}
          className="flex items-center gap-2"
        >
          <Square className="h-4 w-4" />
          Draw Field
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={clearAll}
          className="flex items-center gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Clear All
        </Button>
      </div>

      {/* Map Canvas */}
      <div 
        ref={containerRef}
        className="w-full h-64 rounded-lg overflow-hidden border bg-muted relative"
      >
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="cursor-crosshair w-full h-full"
          style={{ display: 'block' }}
        />
        
        {/* Instructions overlay */}
        <div className="absolute top-2 left-2 bg-background/90 backdrop-blur-sm rounded px-2 py-1 text-xs text-muted-foreground">
          {mode === 'point' 
            ? 'Click to set field location' 
            : mode === 'draw' 
              ? 'Click to add field boundary points' 
              : 'Select a tool to get started'
          }
        </div>

        {/* Area display */}
        {points.length >= 3 && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded px-2 py-1 text-xs font-medium">
            Area: {calculateArea().toFixed(2)} acres
          </div>
        )}
      </div>
    </div>
  );
};

export default MapComponent;