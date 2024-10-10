import React from 'react';
import { Typography, Container, Grid } from '@mui/material';
import Tour from './Tour';
import Empty from '../../ui/Empty';
const TourShowing = ({ tours,bookings }) => {
  console.log(tours);
  
  if (!tours||tours.length <= 0 ) return <Empty resourceName="tours" />;
  

  return (
    <Container>
      
      <Grid container spacing={4} padding={2}>
        {tours.map((tour) => (
          <Tour key={tour.id} tour={tour} bookings={bookings}/>
        ))}
      </Grid>
    </Container>
  );
};

export default TourShowing;