import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Rating,
  IconButton,
} from '@mui/material';
import {
  HiOutlineCurrencyDollar,
  HiCalendar,
  HiUserGroup,
  HiOutlineHeart,
  HiHeart,
} from 'react-icons/hi2';
import ShowDetailButton from './ShowDetailButton';
import Star from '../../ui/Star';
import { compareTwoDates } from '../../utils/helpers';
import { useAddFavorite, useFavoriteOfUser, useUpdateFavorite } from './useFavorite';
import { useAuthenticate } from '../security/useAuthenticate';
import Spinner from '../../ui/Spinner';
import { UserContext } from '../../ui/userLayout/ProtectedRouteUser';
import { getAllFavoriteUser } from '../../services/apiFavorite';

const Tour = ({ tour, bookings=null  }) => {
  // const { user, isAuthenticated, isLoading } = useAuthenticate()
  const { user, isAuthenticated, isLoading } = useContext(UserContext)

  const { addFavorite, isAdding } = useAddFavorite();
  const { changeFavorite, isUpdating } = useUpdateFavorite();

  // const bookingsCount = bookings.filter(
  //   (booking) => booking.tour.id === tour.id && booking.status === true
  // );
  // var participantCount = 0;
  // Array.from(bookingsCount).forEach((booking) => {
  //   participantCount += booking.numJoin;
  // });
  const [dateShowing, setDateShowing] = useState('')
  if (tour.startDates != null && tour.startDates.length > 0) {
    Array.from(tour.startDates).forEach(date => {
      var today = new Date().toLocaleDateString('en-CA')
      var compare = compareTwoDates(today, date.toString())
      if (compare === 'before' && dateShowing === '') {
        setDateShowing(prev => date);

      }
    });
  }

  const discountPercentage = tour.priceDiscount
    ? (tour.priceDiscount / tour.price) * 100
    : 0;
  // console.table(tour);

  const [favorites, setFavorites] = useState([]);
  // Thêm state quản lý trạng thái like
  useEffect(() => {
    if (user) {
      const fetchFavorites = async () => {
        if (isAuthenticated) { 
          const favoriteList = await getAllFavoriteUser(user.id.toString());
          if (favoriteList) {
            setFavorites(favoriteList);
           
          }
        }
      };
      fetchFavorites();
      
    }
  }, [user, isAuthenticated]);

  const isTourLiked = (tourId) => {
    return favorites.some((favorite) => favorite.tourId === tourId && favorite.liked === true);
  };

  const handleLikeToggle = async () => {
    const liked = isTourLiked(tour.id);

    if (liked) {
      changeFavorite({ tourId: tour.id, userId: user.id, liked: false },
        {
          onSettled: async () => {
            const updatedFavorites = await getAllFavoriteUser(user.id.toString());
            const filteredFavorites = updatedFavorites.filter(favorite => favorite.liked === true);
            setFavorites(filteredFavorites);
           
          }
        });
    } else {
      addFavorite({ tourId: tour.id, userId: user.id },
        {
          onSettled: async () => {
            const updatedFavorites = await getAllFavoriteUser(user.id.toString());
            setFavorites(updatedFavorites);
            
          }
        }
      );
    }


  };

  // if (isLoading) return <Spinner />



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

              zIndex: 1,
            }}
          >
            -{Math.round(discountPercentage)}%
          </Box>
        )}
        {/* Add to Favorite Button */}
        {isAuthenticated && ( // Kiểm tra isAuthenticated trước khi hiển thị nút yêu thích
          <IconButton
            sx={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              backgroundColor: 'white',
              '&:hover': {
                backgroundColor: '#ffcccc',
              },
              zIndex: 1,
            }}
            aria-label="add to favorites"
            onClick={handleLikeToggle}
          >
            {isTourLiked(tour.id) ? (
              <HiHeart size={24} color="red" />
            ) : (
              <HiOutlineHeart size={24} color="red" />
            )}
          </IconButton>
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
                    {tour.price - (tour.price * discountPercentage) / 100} USD
                  </Typography>
                </Box>
              ) : (
                <Typography
                  variant="body1"
                  sx={{ fontSize: '1.2rem', color: 'text.secondary' }}
                >
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
                {dateShowing !== '' ? dateShowing : 'No start date yet'}
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
            {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <HiUserGroup size={24} style={{ marginRight: 8 }} />
              <Typography
                variant="body1"
                color="textSecondary"
                sx={{ fontSize: '1.2rem' }}
              >
                {participantCount}/{tour.maxGroupSize}
              </Typography>
            </Box> */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    full={Math.floor(tour.ratingsAverage) >= i + 1}
                    color="#fcc419"
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