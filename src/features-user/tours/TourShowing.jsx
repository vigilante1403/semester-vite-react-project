import React from 'react';
import { Typography, Container, Grid } from '@mui/material';
import Tour from './Tour';
import Empty from '../../ui/Empty';
import Spinner from '../../ui/Spinner';
const TourShowing = ({ tours,bookings=null }) => {
  if (!tours||!tours.length) return <Empty resourceName={'tour'} />
  

  return (
    <Container>
      
      <Grid container spacing={4} padding={2}>
        {tours.map((tour) => (
          <Tour key={tour.id} tour={tour}/>
        ))}
      </Grid>
    </Container>
  );
};

export default TourShowing;