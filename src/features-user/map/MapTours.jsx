// import MapComponent from '../../features/tours/Map';
// import styled from 'styled-components';
// import SearchBarMap from './SearchBarMap';
// import { useState } from 'react';
// const MapShowing = styled(MapComponent)`
//   min-height: 100%;
// `;
// const SearchBar = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   z-index: 9999;
//   height: 100%;
//   width: 25vw;
//   background-color: var(--color-grey-100);
//   border: 1px solid;
//   border-color: var(--color-grey-300);
// `;
// const StyledMapTours = styled.div`
//   position: relative;
// `;

// function MapTours() {
//   const [center, setCenter] = useState(null);
//   const [centerDisplay,setCenterDisplay]=useState('');
//   console.log('center',center)
//   return (
//     <StyledMapTours>
//       <SearchBar>
//         <SearchBarMap onSetCenter={setCenter} onSetCenterDisplay={setCenterDisplay} />
//       </SearchBar>
//       {center &&centerDisplay&& (
//         <MapShowing
//           styleDefault="mapbox://styles/vytruong1812/cm1c6ma7h02hc01o3azvg0h6e"
//           desireHeight="90vh"
//           centerDefault={center}
//           centerDisplay={centerDisplay}
//         />
//       )}
//       {!center && (
//         <MapShowing
//           styleDefault="mapbox://styles/vytruong1812/cm1c6ma7h02hc01o3azvg0h6e"
//           desireHeight="90vh"
//         />
//       )}
//     </StyledMapTours>
//   );
// }

// export default MapTours;
import MapComponent from '../../features/tours/Map';
import styled from 'styled-components';
import SearchBarMap from './SearchBarMap';
import { useState } from 'react';
import { useTours } from '../../features/tours/useTours';
import Spinner from '../../ui/Spinner';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import { getNearbyTours } from './TourNearMe';

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
 
  const nearbyData = center ? getNearbyTours(tours, center) : null;
  
  console.log(nearbyData?.nearbyTours); 
  console.log(nearbyData?.locations);
  
console.log(typeof setCenter)
  console.log('center',center)
  return (
    <StyledMapTours>
      <SearchBar>
        <SearchBarMap nearbyData={nearbyData} center={center} centerDisplay={centerDisplay} onSetCenter={setCenter} onSetCenterDisplay={setCenterDisplay} />
       
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