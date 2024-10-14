import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Container,
  IconButton,
  CardMedia,
  Button,
} from '@mui/material';
import {
  Event,
  AttachMoney,
  ArrowBackIos,
  ArrowForwardIos,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useBookingsOfUser } from '../../features-user/bookings/useBookings';
import { UserContext } from '../../ui/userLayout/ProtectedRouteUser';
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';
import PaymentHistory from '../../features-user/payment/PaymentHistory';
import usePaymentHistory from '../../features-user/payment/usePaymentHistory';
import Slider from 'react-slick/lib/slider';
import BookingDetailModal from '../../features-user/bookings/BookingDetailModal';
import toast from 'react-hot-toast';

const convertToValidDate = (dateStr) => {
  const months = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  };
  const parts = dateStr.split(' ');
  const day = parts[2];
  const month = months[parts[1]];
  const year = parts[5];
  return `${year}-${month}-${day}`;
};

const dashboardBackground =
  'url(https://wallpapers.com/images/featured-full/travel-ibk7fgrvtvhs7qzg.jpg)';

export default function MyDashboard() {
  const { user } = useContext(UserContext);
  const [upcomingTourList, setUpcomingTourList] = useState([]);
  const { bookings, isLoading } = useBookingsOfUser(user.id);
  const [bookedTours, setBookedTours] = useState(0);
  const [upcomingTours, setUpcomingTours] = useState(0);
  const {
    data: paymentHistory,
    isLoading: isPaymentLoading,
    error,
  } = usePaymentHistory(user.email);
  const navigate = useNavigate();
  const filterBookingsAfterToday = (bookings) => {
    const todayString = new Date().toISOString().split('T')[0];
    return bookings.filter(
      (booking) => convertToValidDate(booking.startDate) > todayString
    );
  };
  useEffect(() => {
    if (bookings) {
      const upcoming = filterBookingsAfterToday(bookings);
      setUpcomingTourList(upcoming);
      setBookedTours(bookings.length);
      setUpcomingTours(upcoming.length);
    }
  }, [bookings]);

  if (isLoading || isPaymentLoading) return <Spinner />;
  if (!bookings) return <Empty resourceName="bookings" />;
  if (error) return toast.error(`Error: ${error.message}`);

  const calculateTotalTransaction = (paymentHistory) => {
    return paymentHistory.reduce((total, payment) => {
      if (payment.booking?.paid) {
        return total + payment.booking.priceFinal;
      }
      return total;
    }, 0);
  };

  const totalTransaction = paymentHistory
    ? calculateTotalTransaction(paymentHistory)
    : 0;

  const formattedTransaction = () => {
    if (totalTransaction >= 1e9) {
      return `${(totalTransaction / 1e9).toFixed(2)}B`;
    } else if (totalTransaction >= 1e6) {
      return `${(totalTransaction / 1e6).toFixed(2)}M`;
    } else if (totalTransaction >= 1e3) {
      return `${(totalTransaction / 1e3).toFixed(1)}K`;
    }
    return totalTransaction;
  };

  const transaction = formattedTransaction();

  return (
    <Box
      sx={{
        height: '100%',
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        backgroundImage: dashboardBackground,
        backgroundSize: 'cover',
        p: 3,
      }}
    >
      <Typography
        variant="h2"
        sx={{ color: 'black', mb: 3, textAlign: 'center' }}
      >
        User Tours Dashboard
      </Typography>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '90vw',
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <InfoCard
              count={bookedTours}
              label="Booked"
              color="#1976d2"
              icon={<Event />}
              onClick={() => navigate('/user/bookings')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <InfoCard
              count={upcomingTours}
              label="Upcoming"
              color="#4caf50"
              icon={<Event />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <InfoCard
              count={transaction}
              label="Transaction"
              color="#ff9800"
              icon={<AttachMoney />}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                background: 'rgba(73, 101, 183, 0.9)',
                borderRadius: '8px',
                p: 2,
              }}
            >
              <Typography
                variant="h3"
                sx={{ mb: 2, color: 'var(--color-grey-100)' }}
              >
                <strong>Upcoming Tours</strong>
              </Typography>
              <hr />
              {upcomingTourList.length > 0 ? (
                <ImageSlider upcomingBookings={upcomingTourList} />
              ) : (
                <Typography variant="h5">
                  No upcoming booking available.
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <PaymentHistory paymentList={paymentHistory} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

const InfoCard = ({ count, label, color, icon, onClick }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}
  >
    <Box
      sx={{
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 1,
      }}
    >
      <Typography variant="h2" sx={{ color, paddingBottom: '30px' }}>
        <strong>{count}</strong>
      </Typography>
    </Box>
    <Avatar
      sx={{
        width: 130,
        height: 130,
        backgroundColor: 'transparent',
        border: '2px solid black',
      }}
    >
      {icon}
    </Avatar>
    <Typography
      variant="h4"
      sx={{
        color: 'black',
        mt: 1,
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': { color: onClick ? color : 'inherit' },
      }}
      onClick={onClick}
    >
      {label}
    </Typography>
  </Box>
);

const ImageSlider = ({ upcomingBookings }) => {
  const [open, setOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleOpen = (booking) => {
    setSelectedBooking(booking);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBooking(null);
  };

  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section>
      <BookingDetailModal
        open={open}
        handleClose={handleClose}
        booking={selectedBooking}
      />
      <Container>
        <Box sx={{ mt: 5 }}>
          <Slider {...settings}>
            {upcomingBookings.map((booking, index) => (
              <Box
                key={booking.id}
                onClick={() => handleOpen(booking)}
                sx={{
                  flex: '0 0 auto', // Keeps the boxes to fit flexibly without wrapping to columns
                  padding: '0 10px',
                  borderRadius: '5%',
                  cursor: 'pointer',
                  display: 'flex', // Keep this
                  flexDirection: 'row', // This ensures a row layout for each booking card
                  justifyContent: 'flex-start', // Adjust alignment if needed
                  alignItems: 'center', // Aligns items along the cross-axis
                }}
              >
                <CardMedia
                  component="img"
                  image={
                    'http://localhost:8080/api/v1/file/image/tour/' +
                    booking.tour.imageCover
                  }
                  alt={`slide-${index}`}
                  sx={{
                    height: '70%',
                    objectFit: 'cover',
                  }}
                />
                <Typography
                  variant="h4"
                  sx={{ color: 'var(--color-grey-50)', marginBottom: '5px' }}
                >
                  {booking.tour.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: 'var(--color-grey-100)' }}
                >
                  Start Date: {booking.startDate}
                </Typography>
              </Box>
            ))}
          </Slider>
        </Box>
      </Container>
    </section>
  );
};
