import React from 'react';
import { Typography, Container, Grid } from '@mui/material';
import Tour from './Tour';
const TourShowing = ({tours}) => {

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', margin: '40px 0', fontSize: '4rem' }}>
        Our Tours
      </Typography>
      <Grid container spacing={4}>
        {tours.map((tour) => (
          <Tour tour={tour} />
        ))}
      </Grid>
    </Container>
  );
};

export default TourShowing;