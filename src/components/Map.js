import React, { useEffect, useRef } from 'react';
import Header from './Header';
import L from 'leaflet';

function Map() {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    // Initialize map when component mounts
    const map = L.map(mapContainerRef.current).setView([1.505, 16.5], 3); // Centered around Africa with zoom level 3

    // Add tile layer for Africa map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      minZoom: 2,
      maxZoom: 18,
    }).addTo(map);

    // Add marathon runners' data to the map
    const marathonRunners = [
      { name: 'Runner 1', country: 'USA', coordinates: [37.0902, -95.7129] }, // Example outside Africa
      { name: 'Runner 2', country: 'Nigeria', coordinates: [9.081999, 8.675277] },
      { name: 'Runner 3', country: 'South Africa', coordinates: [-30.5595, 22.9375] },
      // Add more runners in Africa as needed...
    ];

    marathonRunners.forEach((runner) => {
      // Create a marker for each runner
      L.marker(runner.coordinates).addTo(map)
        .bindPopup(`<h3>${runner.country}</h3>`);
    });

    // Clean up the map instance when component unmounts
    return () => map.remove();
  }, []);

  return (
    <div>
      <Header />
      <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />
    </div>
  );
}

export default Map;
// 