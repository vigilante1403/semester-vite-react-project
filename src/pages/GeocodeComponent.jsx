import React, { useState } from 'react';
import opencage from 'opencage-api-client';

const GeocodeComponent = () => {
  const [address, setAddress] = useState('134, nguyễn thái học, Phường Đa Kao, Quận 1, TP Hồ Chí Minh');
  const [placeDetails, setPlaceDetails] = useState(null);
  const [error, setError] = useState(null);

  const geocodeAddress = async (address) => {
    try {
      const data = await opencage.geocode({ q: address,key: '6160a88ca50f47be968022f736bfb7ec' });
      if (data.results.length > 0) {
        const place = data.results[0];
        console.log(place)
        setPlaceDetails({
          formatted: place.formatted,
          geometry: place.geometry,
          timezone: place.annotations.timezone.name,
        });
      } else {
        setError(`Status: ${data.status.message}, total_results: ${data.total_results}`);
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
      if (error.status && error.status.code === 402) {
        setError('Hit free trial daily limit. Become a customer: https://opencagedata.com/pricing');
      }
    }
  };

  const handleGeocode = () => {
    geocodeAddress(address);
  };

  return (
    <div>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter address"
      />
      <button onClick={handleGeocode}>Geocode Address</button>

      {placeDetails && (
        <div>
          <h3>Place Details:</h3>
          <p>Formatted: {placeDetails.formatted}</p>
          <p>Latitude: {placeDetails.geometry.lat}</p>
          <p>Longitude: {placeDetails.geometry.lng}</p>
          <p>Timezone: {placeDetails.timezone}</p>
        </div>
      )}

      {error && (
        <div>
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default GeocodeComponent;
