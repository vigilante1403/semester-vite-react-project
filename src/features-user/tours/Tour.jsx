import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, Grid, Rating } from '@mui/material';
import { HiOutlineCurrencyDollar, HiCalendar, HiUserGroup } from 'react-icons/hi2';
import CheckoutButton from './CheckoutButton';
import toast from 'react-hot-toast';
import ShowDetailButton from './ShowDetailButton';

const Tour = ({ tour, bookings }) => {

  const bookingsCount = bookings.filter(booking => booking.tour.id === tour.id);
  var participantCount=0;
  Array.from(bookingsCount).forEach(booking=>{
    participantCount=participantCount+booking.numJoin
    
  })
  const tour1 = {
    name: 'Amazing Tour',
    summary: 'An amazing tour you won’t forget!',
    price: 5000, // price in cents
    imageCover: 'cover-image.jpg',
    slug: 'amazing-tour',
    tourID: '12345',
    email: 'vytruong1999@mailsac.com',
    userID: '123456789',
  };
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{
          transition: 'transform 0.3s ease-in-out', // Thay đổi khi hover
          '&:hover': {
            transform: 'scale(1.05)', // Phóng to khi hover
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Thêm bóng khi hover
          },
        }}>
        <CardMedia
          component="img"
          height="200"
          image={'http://localhost:8080/api/v1/file/image/tour/' + tour.imageCover}
          alt={tour.name}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ fontSize: '1.6rem' }}>
            {tour.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <img 
              src={tour.countryFlag} 
              alt={tour.countryNameCommon} 
              style={{ width: 24, height: 24, marginRight: 8 }} 
            />
            <Typography variant="body2" color="textPrimary" sx={{ fontSize: '1.4rem' }}>
              {tour.countryNameCommon}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <HiOutlineCurrencyDollar size={24} style={{ marginRight: 8 }} />
              <Typography variant="body1" color="textSecondary" sx={{ fontSize: '1.2rem' }}>
                {tour.price} USD
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <HiCalendar size={24} style={{ marginRight: 8 }} />
              <Typography variant="body1" color="textSecondary" sx={{ fontSize: '1.2rem' }}>
                {tour.startDates}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <HiUserGroup size={24} style={{ marginRight: 8 }} />
              <Typography variant="body1" color="textSecondary" sx={{ fontSize: '1.2rem' }}>
                {participantCount}/{tour.maxGroupSize}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating name="read-only" value={tour.rating} readOnly />
              <Typography variant="body2" color="textSecondary" sx={{ ml: 1, fontSize: '1.2rem' }}>
                ({tour.rating ? tour.rating : 0})
              </Typography>
            </Box>
            </Box>
          <CheckoutButton tour={tour1} />
          <ShowDetailButton id={tour.id} />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Tour;