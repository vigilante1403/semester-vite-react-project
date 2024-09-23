import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken =
  'pk.eyJ1Ijoidnl0cnVvbmcxODEyIiwiYSI6ImNseWlydXVtMzBpOWkyaW9zdTJ2aHRtd2cifQ.GFzF0pNm34sePRhSCIVRGw';

const MapComponent = ({ locations,centerDisplay=null, centerDefault = [10.7626, 106.660],styleDefault=null,desireHeight=null }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  console.log(centerDisplay)
  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style:!styleDefault? 'mapbox://styles/vytruong1812/clyirzson00z601pn8maud24v':styleDefault,
      center: locations
        ? [locations[0].coordinates[0], locations[0].coordinates[1]]
        : [centerDefault[1], centerDefault[0]],
      zoom: 10,
      scrollZoom:false
    });

    // Optional: Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    if(centerDisplay){
      new mapboxgl.Marker({ color: 'black', rotation: 45 })
        .setLngLat([centerDefault[1], centerDefault[0]])
        .setPopup(new mapboxgl.Popup({closeButton:true,closeOnClick:true}).setText(centerDisplay))
        .addTo(map.current);
    }
    if (locations) {
      locations.map((location) =>
        new mapboxgl.Marker()
          .setLngLat([location.coordinates[0], location.coordinates[1]]) // Position of the marker [lng, lat]
          .setPopup(new mapboxgl.Popup().setText(`day ${location.day}`))
          .addTo(map.current)
      );
    }
  }, [locations,centerDisplay,centerDefault,styleDefault]);

  return <div ref={mapContainer} style={{ width: '100%', height: `${!desireHeight?'400px':desireHeight}` }} />;
};

export default MapComponent;
