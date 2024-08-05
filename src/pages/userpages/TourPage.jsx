import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, Container, Grid, Rating } from '@mui/material';

const tours = [
  {
    id: 1,
    title: 'Tour to the Mountains',
    description: 'Enjoy a beautiful tour to the mountains.',
    image: 'https://picsum.photos/id/237/600/400',
    price: '$200',
    startDate: '2023-08-10',
    rating: 4.5
  },
  {
    id: 2,
    title: 'Beach Getaway',
    description: 'Relax on the sandy beaches.',
    image: 'https://picsum.photos/id/238/600/400',
    price: '$150',
    startDate: '2023-09-01',
    rating: 4.0
  },
  {
    id: 3,
    title: 'City Exploration',
    description: 'Discover the wonders of the city.',
    image: 'https://picsum.photos/id/239/600/400',
    price: '$100',
    startDate: '2023-10-05',
    rating: 4.2
  },
  {
    id: 4,
    title: 'Forest Adventure',
    description: 'Explore the deep forests.',
    image: 'https://picsum.photos/id/240/600/400',
    price: '$180',
    startDate: '2023-11-15',
    rating: 4.8
  },
  {
    id: 5,
    title: 'Desert Safari',
    description: 'Experience the thrill of the desert.',
    image: 'https://picsum.photos/id/241/600/400',
    price: '$220',
    startDate: '2023-12-20',
    rating: 4.7
  }
];

const TourPage = () => {
  const handleBooking = (tourId) => {
    // Add your booking logic here
    alert(`Booking tour with ID: ${tourId}`);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', margin: '40px 0', fontSize: '4rem' }}>
        Our Tours
      </Typography>
      <Grid container spacing={4}>
        {tours.map((tour) => (
          <Grid item xs={12} sm={6} md={4} key={tour.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={tour.image}
                alt={tour.title}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ fontSize: '1.5rem' }}>
                  {tour.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom sx={{ fontSize: '1rem' }}>
                  {tour.description}
                </Typography>
                <Typography variant="body1" color="textPrimary" gutterBottom sx={{ fontSize: '1.25rem' }}>
                  Price: {tour.price}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom sx={{ fontSize: '1rem' }}>
                  Start Date: {tour.startDate}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Rating name="read-only" value={tour.rating} readOnly />
                  <Typography variant="body2" color="textSecondary" sx={{ ml: 1, fontSize: '1rem' }}>
                    ({tour.rating})
                  </Typography>
                </Box>
                <Button variant="contained" color="primary" onClick={() => handleBooking(tour.id)} sx={{ marginTop: '10px', fontSize: '1rem' }}>
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TourPage;