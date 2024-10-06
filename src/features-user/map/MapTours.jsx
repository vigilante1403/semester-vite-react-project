import MapComponent from '../../features/tours/Map';
import styled from 'styled-components';
import SearchBarMap from './SearchBarMap';
import { useState } from 'react';
import { useTours } from '../../features/tours/useTours';
import Spinner from '../../ui/Spinner';
const MapShowing = styled(MapComponent)`
  min-height: 100%;
`;
const SearchBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  height: 100%;
  width: 25vw;
  background-color: var(--color-grey-100);
  border: 1px solid;
  border-color: var(--color-grey-300);
`;
const StyledMapTours = styled.div`
  position: relative;
`;

function MapTours() {
  const [center, setCenter] = useState(null);
  const [centerDisplay,setCenterDisplay]=useState('');
  const {tours,isLoading} = useTours();
  
  
  if(isLoading) return <Spinner/>
  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }
  
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; 
    return distance;
  }
  
  const maxDistance = 50;
  
  function getNearbyTours(tours, center, maxDistance = 5) {
   
    const nearbyTours = tours.filter((tour) => {
      return tour.locations.some((location) => {
        const distance = calculateDistance(
          center[0],
          center[1],
          location.coordinates[1],
          location.coordinates[0]
        );
        return distance <= maxDistance;
      });
    });
  
   
    const locations = [];
    
    nearbyTours.forEach((tour) => {
      let closestLocation = null;
      let closestDistance = Infinity;
  
      tour.locations.forEach((location) => {
        const distance = calculateDistance(
          center[0],
          center[1],
          location.coordinates[1],
          location.coordinates[0]
        );
  
       
        if (distance <= maxDistance && distance < closestDistance) {
          closestDistance = distance; 
          closestLocation = location; 
        }
      });
  
     
      if (closestLocation) {
        locations.push({
          type: closestLocation.type,
          coordinates: closestLocation.coordinates,
          address: closestLocation.address,
          description: closestLocation.description,
          name: tour.name,
          day:closestLocation.day,
          id: tour.id
        });
      }
    });
  
    return { nearbyTours, locations };
  }
  
  const nearbyData = center ? getNearbyTours(tours, center, maxDistance) : null;
  
  console.log(nearbyData?.nearbyTours); 
  console.log(nearbyData?.locations);
  
console.log(typeof setCenter)
  console.log('center',center)
  return (
    <StyledMapTours>
      <SearchBar>
        <SearchBarMap onSetCenter={setCenter} onSetCenterDisplay={setCenterDisplay} />
      </SearchBar>
      {center &&centerDisplay&& (
       <MapShowing
       onSetCenter={setCenter}
       onSetCenterDisplay={setCenterDisplay}
       locations={nearbyData ? nearbyData.locations : null}
       styleDefault="mapbox://styles/vytruong1812/cm1c6ma7h02hc01o3azvg0h6e"
       desireHeight="90vh"
       centerDefault={center}
       centerDisplay={centerDisplay}
       
     />
      )}
      {!center && (
        <MapShowing
          onSetCenter={setCenter}
          onSetCenterDisplay={setCenterDisplay}
          styleDefault="mapbox://styles/vytruong1812/cm1c6ma7h02hc01o3azvg0h6e"
          desireHeight="90vh"
        />
      )}
    </StyledMapTours>
  );
}

export default MapTours;
