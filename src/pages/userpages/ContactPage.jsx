import React, { useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { fetchAddress } from '../../services/apiTours';

function YourComponent() {
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState('');
  
    const handleFindLocation = async () => {
      try {
        const { position, address } = await fetchAddress();
        setLocation(position);
        setAddress(address);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };
  
    return (
      <div>
        <button onClick={handleFindLocation}>Find My Location</button>
        {location && (
          <p>
            Location: Latitude {location.latitude}, Longitude {location.longitude}
          </p>
        )}
        {address && <p>Address: {address}</p>}
      </div>
    );
  }
  
  export default YourComponent;
