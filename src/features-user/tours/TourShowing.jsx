import React from 'react';
import { Typography, Container, Grid } from '@mui/material';
import Tour from './Tour';
import Empty from '../../ui/Empty';

const TourShowing = ({ tours,bookings }) => {
  if (tours.length <= 0) return <Empty resourceName="tours" />;

  return (
    <Container>
      {/* <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', margin: '40px 0', fontSize: '4rem' }}>
        Our Tours
      </Typography> */}
      <Grid container spacing={4} padding={2}>
        {tours.map((tour) => (
          <Tour key={tour.id} tour={tour} bookings={bookings}/>
        ))}
      </Grid>
    </Container>
  );
};

export default TourShowing;
