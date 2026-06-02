'use client';

import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  title: string;
  description?: string;
  color?: string; // Hex color for custom pin indicator
}

interface MapComponentProps {
  markers?: MapMarker[];
  center?: [number, number];
  zoom?: number;
}

export default function MapComponent({
  markers = [],
  center = [30.1798, 66.9750], // Default centered on Quetta, Balochistan
  zoom = 7,
}: MapComponentProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-full min-h-[350px] bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-sm font-semibold text-gray-500 animate-pulse">
        Loading Interactive Maps...
      </div>
    );
  }

  // Create DivIcon for custom circular pins
  const getMarkerIcon = (color: string = '#0f766e') => {
    return L.divIcon({
      html: `
        <div style="position: relative; width: 22px; height: 22px;">
          <div style="position: absolute; top: 0; left: 0; width: 22px; height: 22px; background-color: ${color}; border-radius: 50%; border: 3px solid white; box-shadow: 0 3px 6px rgba(0,0,0,0.3); z-index: 2;"></div>
          <div style="position: absolute; top: 0; left: 0; width: 22px; height: 22px; background-color: ${color}; border-radius: 50%; opacity: 0.4; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite; z-index: 1;"></div>
        </div>
      `,
      className: 'custom-leaflet-icon',
      iconSize: [22, 22],
      iconAnchor: [11, 11],
    });
  };

  return (
    <div className="w-full h-full min-h-[350px] relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.lat, marker.lng]}
            icon={getMarkerIcon(marker.color)}
          >
            <Popup className="custom-popup">
              <div className="p-1 max-w-[200px]">
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{marker.title}</h4>
                {marker.description && (
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{marker.description}</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
