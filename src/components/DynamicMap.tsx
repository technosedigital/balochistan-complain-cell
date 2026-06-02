'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const DynamicMap = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[350px] bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-sm font-semibold text-gray-500 animate-pulse">
      Loading Interactive Maps...
    </div>
  ),
});

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  title: string;
  description?: string;
  color?: string;
}

interface DynamicMapProps {
  markers?: MapMarker[];
  center?: [number, number];
  zoom?: number;
}

export default function SafeMap(props: DynamicMapProps) {
  return <DynamicMap {...props} />;
}
