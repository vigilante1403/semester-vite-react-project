import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Rating,
} from '@mui/material';
import {
  HiOutlineCurrencyDollar,
  HiCalendar,
  HiUserGroup,
} from 'react-icons/hi2';
import CheckoutButton from './CheckoutButton';
import toast from 'react-hot-toast';
import ShowDetailButton from './ShowDetailButton';
import Star from '../../ui/Star';

const Tour = ({ tour, bookings }) => {
  const bookingsCount = bookings.filter(
    (booking) => booking.tour.id === tour.id && booking.status === true
  );
  let participantCount = 0;
  Array.from(bookingsCount).forEach((booking) => {
    participantCount += booking.numJoin;
  });

 
  const discountPercentage = tour.priceDiscount
    ? ((tour.priceDiscount) / tour.price) * 100
    : 0;
    console.table(tour)

  return (
    <Grid item xs={12} sm={6} md={6} lg={4}>
      <Card
        sx={{
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            backgroundColor: '#f0f0f0',
          },
          position: 'relative',
        }}
      >
        {discountPercentage > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              backgroundColor: 'red',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '2rem',
              fontWeight: 'bold',
              
              zIndex:1
            }}
          >
            -{Math.round(discountPercentage)}%
          </Box>
        )}
        <CardMedia
          component="img"
          height="200"
          image={
            'http://localhost:8080/api/v1/file/image/tour/' + tour.imageCover
          }
          alt={tour.name}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ fontSize: '1.6rem' }}>
            {tour.name}
          </Typography>
          <Box
            sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}
          >
            <img
              src={tour.countryFlag}
              alt={tour.countryNameCommon}
              style={{ width: 24, height: 24, marginRight: 8 }}
            />
            <Typography
              variant="body2"
              color="textPrimary"
              sx={{ fontSize: '1.4rem' }}
            >
              {tour.countryNameCommon}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
  <HiOutlineCurrencyDollar size={24} style={{ marginRight: 8 }} />
  {tour.priceDiscount > 0 ? (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography
        variant="body1"
        sx={{
          fontSize: '1.2rem',
          color: 'red',
          textDecoration: 'line-through', 
          mr: 1,
        }}
      >
        {tour.price} USD
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: '1.2rem',
          color: 'text.secondary', 
        }}
      >
        {tour.price - (tour.price * discountPercentage)/100 } USD
      </Typography>
    </Box>
  ) : (
    <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'text.secondary' }}>
      {tour.price} USD
    </Typography>
  )}
</Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <HiCalendar size={24} style={{ marginRight: 8 }} />
              <Typography
                variant="body1"
                color="textSecondary"
                sx={{ fontSize: '1.2rem' }}
              >
                {tour.startDates}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <HiUserGroup size={24} style={{ marginRight: 8 }} />
              <Typography
                variant="body1"
                color="textSecondary"
                sx={{ fontSize: '1.2rem' }}
              >
                {participantCount}/{tour.maxGroupSize}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    full={Math.floor(tour.ratingsAverage) >= i + 1}
                    color='#fcc419'
                    size={18}
                  />
                ))}
              </div>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ ml: 1, fontSize: '1.2rem' }}
              >
                ({tour.ratingsAverage ? tour.ratingsAverage : 0})
              </Typography>
            </Box>
          </Box>
          {/* <CheckoutButton tour={tour} /> */}
          <ShowDetailButton id={tour.id} />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Tour;
