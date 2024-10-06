import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';


mapboxgl.accessToken =
  'pk.eyJ1Ijoidnl0cnVvbmcxODEyIiwiYSI6ImNseWlydXVtMzBpOWkyaW9zdTJ2aHRtd2cifQ.GFzF0pNm34sePRhSCIVRGw';

const MapComponent = ({ locations, centerDisplay = null, centerDefault = [10.7626, 106.660], styleDefault = null, desireHeight = null, onSetCenter, onSetCenterDisplay }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);


  useEffect(() => {
    if (map.current) {

      map.current.setCenter([centerDefault[1], centerDefault[0]]);
      const existingMarkers = document.querySelectorAll('.mapboxgl-marker');
      existingMarkers.forEach(marker => marker.remove());

    } else {

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: !styleDefault ? 'mapbox://styles/vytruong1812/clyirzson00z601pn8maud24v' : styleDefault,
        center: locations
          ? [locations[0].coordinates[0], locations[0].coordinates[1]]
          : [centerDefault[1], centerDefault[0]],
        zoom: 10,
        scrollZoom: true
      });
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      const geolocateControl = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserLocation: true
      });

      map.current.addControl(geolocateControl, 'top-right');
      geolocateControl.on('geolocate', (e) => {
        const { latitude, longitude } = e.coords;

        if (typeof onSetCenter === 'function') {
          onSetCenter([latitude, longitude]);
        } else {
          console.error('onSetCenter is not a function');
        }

        if (typeof onSetCenterDisplay === 'function') {
          onSetCenterDisplay('Your Location');
        } else {
          console.error('onSetCenterDisplay is not a function');
        }
      });
    }

   

    if (centerDisplay) {
      new mapboxgl.Marker({ color: 'black', rotation: 45 })
        .setLngLat([centerDefault[1], centerDefault[0]])
        .setPopup(new mapboxgl.Popup({ closeButton: true, closeOnClick: true }).setText(centerDisplay))
        .addTo(map.current);
    }
    if (locations) {
      locations.map((location) =>
        new mapboxgl.Marker()
          .setLngLat([location.coordinates[0], location.coordinates[1]])
          .setPopup(new mapboxgl.Popup()
            .setText(location.name ? `${location.name} - Day ${location.day}` : `Day ${location.day}`)
            .on('open', location.name ? () => {
           
              const popupElement = document.querySelector('.mapboxgl-popup');
              if (popupElement) {
                popupElement.addEventListener('click', () => {
                  
                  console.log(`Navigating to details for ${location.name}`);
                  window.location.href = `/tours/tour-detail/${location.id}`;
                });
              }
            } : () => { }))
          .addTo(map.current)



      );

    }
  }, [locations, centerDisplay, centerDefault, styleDefault, onSetCenter,onSetCenterDisplay]);

  return <div ref={mapContainer} style={{ width: '100%', height: `${!desireHeight ? '400px' : desireHeight}` }} />;
};

export default MapComponent;
