import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken =
  'pk.eyJ1Ijoidnl0cnVvbmcxODEyIiwiYSI6ImNseWlydXVtMzBpOWkyaW9zdTJ2aHRtd2cifQ.GFzF0pNm34sePRhSCIVRGw';

const MapComponent = ({locations}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; 

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/vytruong1812/clyirzson00z601pn8maud24v', 
      center:[locations[0].coordinates[0],locations[0].coordinates[1]],
      zoom:10
      
    });

    // Optional: Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    locations.map(location=>new mapboxgl.Marker()
    .setLngLat([location.coordinates[0], location.coordinates[1]]) // Position of the marker [lng, lat]
    .setPopup(new mapboxgl.Popup().setText(`day ${location.day}`)) 
    .addTo(map.current))
    ;
  }, [locations]);

  return <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />;
};

export default MapComponent;
