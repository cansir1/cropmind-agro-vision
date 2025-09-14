import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

interface MapComponentProps {
  onAreaCalculated: (area: number, coordinates: number[][]) => void;
  onLocationUpdate: (location: { lat: number; lng: number; address: string }) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ onAreaCalculated, onLocationUpdate }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const draw = useRef<MapboxDraw | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');

  useEffect(() => {
    // For now, we'll use a placeholder. In production, this should come from Supabase secrets
    const token = process.env.REACT_APP_MAPBOX_TOKEN || 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example';
    setMapboxToken(token);
    
    if (!mapContainer.current || !token) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [-95.7129, 37.0902], // Center of US
      zoom: 10,
    });

    // Add drawing controls
    draw.current = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        point: true,
        trash: true
      },
      defaultMode: 'draw_polygon'
    });

    map.current.addControl(draw.current);
    map.current.addControl(new mapboxgl.NavigationControl());

    // Handle drawing events
    map.current.on('draw.create', updateArea);
    map.current.on('draw.delete', updateArea);
    map.current.on('draw.update', updateArea);

    // Handle click events for location
    map.current.on('click', async (e) => {
      const { lng, lat } = e.lngLat;
      
      // Reverse geocoding to get address
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${token}`
        );
        const data = await response.json();
        const address = data.features[0]?.place_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        
        onLocationUpdate({ lat, lng, address });
      } catch (error) {
        console.error('Geocoding error:', error);
        onLocationUpdate({ lat, lng, address: `${lat.toFixed(4)}, ${lng.toFixed(4)}` });
      }
    });

    return () => {
      map.current?.remove();
    };
  }, [onAreaCalculated, onLocationUpdate]);

  function updateArea() {
    if (!draw.current) return;
    
    const data = draw.current.getAll();
    if (data.features.length > 0) {
      const area = turf.area(data) / 4047; // Convert to acres
      const coordinates = data.features[0].geometry.coordinates[0];
      onAreaCalculated(area, coordinates);
    } else {
      onAreaCalculated(0, []);
    }
  }

  // Simple area calculation (replacing turf for now)
  const turf = {
    area: (geojson: any) => {
      if (!geojson.features || geojson.features.length === 0) return 0;
      
      const coords = geojson.features[0].geometry.coordinates[0];
      let area = 0;
      
      for (let i = 0; i < coords.length - 1; i++) {
        area += coords[i][0] * coords[i + 1][1] - coords[i + 1][0] * coords[i][1];
      }
      
      return Math.abs(area / 2) * 111320 * 111320; // Rough conversion to square meters
    }
  };

  if (!mapboxToken) {
    return (
      <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-2">Mapbox token required</p>
          <p className="text-sm text-muted-foreground">
            Please add your Mapbox token to environment variables
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden border">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default MapComponent;