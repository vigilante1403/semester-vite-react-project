
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, Button, Divider, Container, Avatar } from '@mui/material';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useBookingById } from '../../features/bookings/useBookings';
import { useMoveBack } from '../../hooks/useMoveBack';
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';
import PersonIcon from '@mui/icons-material/Person';
import { MyLocation } from '@mui/icons-material';
import { LocationOn } from '@mui/icons-material';
import TourIcon from '@mui/icons-material/Tour';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GroupIcon from '@mui/icons-material/Group';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EmailIcon from '@mui/icons-material/Email';
import FlagIcon from '@mui/icons-material/Flag';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PaymentIcon from '@mui/icons-material/Payment';
import { useTourGuides } from '../../features/tours/useTourGuides';
import { useUsers } from '../../features/authentication/useUsers';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import { useGetAllSchedulesFromASingleBookingId } from './useBookings';

export default function BookingDetailUser({bookingFromComponent}) {
  const { bookingId } = useParams()
  const [searchParams]=useSearchParams()
  const [schedule, setSchedule] = useState(['']);
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  let { booking, isLoading } = useBookingById();
  const { users, isLoading: isLoadingUser } = useUsers();
  const {schedules,isLoading1}=useGetAllSchedulesFromASingleBookingId({bookingId:bookingId})
  const moveBack = useMoveBack();
  const fetchAndSetTourLocations = async (tour) => {
    if (tour?.locations) {

      const locationAddresses = tour.locations.map((location) => location.address);
      const newSubDescriptions = tour.locations.map((location) =>
        location.description.split(", ").map((desc) => desc.trim())
      );

      setSchedule(newSubDescriptions);
      setAddress(locationAddresses);

    } else {
      setAddress('');
      setSchedule(['']);
    }
  };
  useEffect(() => {
    if (booking?.tour) {
      fetchAndSetTourLocations(booking.tour);

    }
  }, [booking?.tour]);
  if (isLoading || isLoadingUser||isLoading1) return <Spinner />;
  if(bookingFromComponent!=null){
    booking=bookingFromComponent;
  }
  if (!booking) return <Empty resourceName={"booking"} />;

  const {
    tour,
    user,
    startDate,
    priceOrigin,
    priceDiscount,
    priceFinal,
    numJoin,
    paid,
    createdAt,
    status
  } = booking;

  const guidesList = users.filter(g => schedules.some(sc => sc.guideId === g.id));
  
  console.log(guidesList);

  return (
    <Box sx={{ padding: '2rem', backgroundColor: '#f4f6f9' }}>
      <Card sx={{ maxWidth: 800, margin: '0 auto', padding: '1rem', boxShadow: 3, borderRadius: '16px', backgroundColor: '#CDD2D2' }}>
        <CardContent>
          <Box sx={{ backgroundColor: '#e3f2fd', padding: '1rem',borderRadius: '8px'  }}><Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2'}}>
            Booking Details
          </Typography></Box>

          <Divider sx={{ marginBottom: '1rem' }} />


          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            backgroundColor: '#e3f2fd',
            padding: '1rem',
            paddingLeft:'2rem',
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>
             
            <Typography variant="h4"><PersonIcon sx={{ marginRight: '1rem', color: '#ffb300' }} />Guides</Typography>
            <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
              {guidesList.map((guide) => (
                <Grid item xs={12} sm={6} key={guide.id} sx={{ display: 'flex', alignItems: 'center' }}>
                  {/* <img src={guide.countryFlag} alt={`${guide.nationality} flag`} style={{ width: 40, height: 40, marginRight: '1rem',borderRadius:'90%' }} /> */}
                  <Box display={'flex'} flexDirection={'column'}  >
                  <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                     <Avatar src={`http://localhost:8080/api/v1/file/image/user/${guide.photo}` || ''} alt="User Photo" sx={{ width: 40, height: 40, marginRight: '10px' }} />
                   <Typography variant="h5">{guide.fullName} </Typography>
                 
                  </Box>
                 <Typography variant="h6" sx={{margin:'5px'}}>{guide.email} </Typography>
                 </Box>
                </Grid> 
              ))}
            </Grid>
          </Box>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            backgroundColor: '#e3f2fd',
            padding: '1rem',
           
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>
            <Box sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#bbdefb',
              padding: '1rem 1rem 1rem 1rem',
              borderRadius: '8px',
              transition: 'background-color 0.3s, transform 0.3s',
              '&:hover': { backgroundColor: '#96DDE5', transform: 'scale(1.02)' }
            }}>
              {/* <TourIcon sx={{ marginRight: '1rem', color: '#1976d2' }} /> */}
              <img src={`http://localhost:8080/api/v1/file/image/tour/${tour.imageCover}`} alt={`${tour.name} flag`} style={{ width: 40, height: 30, marginRight: '1rem' }} />
              <Typography variant="h4">{tour.name}</Typography>
            </Box>
            <Grid container spacing={2} sx={{ marginTop: '1rem' }}>

              <Grid item xs={12} sm={6}>
                <Typography variant="h5"><TourIcon sx={{ marginRight: '0.5rem',color:'#00ACC1'  }} />Tour Location:</Typography>
                {/* <Typography variant="h6">{tour?.name || 'N/A'}</Typography> */}
                <SimpleTreeView>
                  {address && address.map((address, index) => (
                   
                    <TreeItem
                    sx={{
                      '& .MuiTreeItem-content': {
                        flexDirection: 'row-reverse',
                      },
                      '& .MuiTreeItem-label': {
                        display: 'flex',
                        alignItems: 'center',
                      },
                    }}
                      itemId={index.toString()}
                      label={<span style={{ fontSize: "1.3rem" }}> <LocationOn sx={{ color:'#DC4F4C',marginRight:'0.5rem' }} />Day {index + 1}: {address}</span>}
                      key={index}

                    >

                      {schedule && schedule[index].map((schedule, idx) => (
                        <TreeItem
                          itemId={`${index}-${idx}`}
                          label={<span style={{ fontSize: "1.2rem" }}>{schedule}</span>}
                          key={`${index}-${idx}`}
                        // style={{ fontSize: '1.2rem' }}
                        />
                      ))}
                    </TreeItem>
                  ))}
                </SimpleTreeView>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5"><CalendarTodayIcon sx={{ marginRight: '0.5rem',color:'#F57F17' }} />Start Date:</Typography>
                <Typography variant="h6">{startDate || 'N/A'}</Typography>
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <Typography variant="h5"><GroupIcon sx={{ marginRight: '0.5rem' }} />Group Size:</Typography>
                <Typography variant="h6">{tour?.maxGroupSize || 'N/A'}</Typography>
              </Grid> */}
              {/* <Grid item xs={12} sm={6}>
                <Typography variant="h5"><MonetizationOnIcon sx={{ marginRight: '0.5rem' }} />Tour Price:</Typography>
                <Typography variant="h6">${tour?.price || 'N/A'}</Typography>
              </Grid> */}
            </Grid>
          </Box>


          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            backgroundColor: '#e3f2fd',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>
            <Box sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#fff9c4',
              padding: '1rem',
              borderRadius: '8px',
              transition: 'background-color 0.3s, transform 0.3s',
              '&:hover': { backgroundColor: '#ffe082', transform: 'scale(1.02)' }
            }}>
              <PersonIcon sx={{ marginRight: '1rem', color: '#ffb300' }} />
              <Typography variant="h4">User Information</Typography>
            </Box>
            <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5"><PersonIcon sx={{ marginRight: '0.5rem',color:'#F57F17' }} />Customer Name:</Typography>
                <Typography variant="h6">{user?.fullName || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5"><EmailIcon sx={{ marginRight: '0.5rem' ,color:'#DC4F4C' }} />Email:</Typography>
                <Typography variant="h6">{user?.email || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5"><FlagIcon sx={{ marginRight: '0.5rem',color:'#8BC34A' }} />Nationality:</Typography>
                <Typography variant="h6">{user?.nationality || 'N/A'}</Typography>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            backgroundColor: '#e3f2fd',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>
            <Box sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#dcedc8',
              padding: '1rem',
              borderRadius: '8px',
              transition: 'background-color 0.3s, transform 0.3s',
              '&:hover': { backgroundColor: '#c5e1a5', transform: 'scale(1.02)' }
            }}>
              <AttachMoneyIcon sx={{ marginRight: '1rem', color: '#689f38' }} />
              <Typography variant="h4">Booking Information</Typography>
            </Box>
            <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
              <Grid item xs={12} sm={12}>
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>

                  <Typography variant="h5"><CalendarTodayIcon sx={{ marginRight: '0.5rem',color:'#F57F17' }} />Created At:</Typography>
                  <Typography variant="h6">{new Date(createdAt).toLocaleDateString() || 'N/A'}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>

                  <Typography variant="h5"><CheckCircleIcon sx={{ marginRight: '0.5rem',color:'#8BC34A'  }} />Booking Status:</Typography>
                  <Typography variant="h6">{status ? 'Active' : 'Cancelled'}</Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>

                  <Typography variant="h5"><CheckCircleIcon sx={{ marginRight: '0.5rem',color:'#8BC34A' }} />Paid:</Typography>
                  <Typography variant="h6">{paid ? 'Yes' : 'No'}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                  <Typography variant="h5"><AttachMoneyIcon sx={{ marginRight: '0.5rem' ,color:'#FFA000'}} />Original Price:</Typography>
                  <Typography variant="h6">${priceOrigin || 'N/A'}</Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>

                  <Typography variant="h5"><AttachMoneyIcon sx={{ marginRight: '0.5rem',color:'#E57373' }} />Discount:</Typography>
                  <Typography variant="h6" sx={{ color:'gray', textDecoration: 'line-through', }}>${priceDiscount || 'N/A'}</Typography>
                </Box>
              </Grid>

              {/* <Grid item xs={12} sm={6}>
                <Typography variant="h5"><GroupIcon sx={{ marginRight: '0.5rem' }} />Participants:</Typography>
                <Typography variant="h6">{numJoin === 0 ? 1 : numJoin || 'N/A'}</Typography>
                </Grid> */}

              <Grid item xs={12} sm={12}>
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>

                  <Typography variant="h5"><PaymentIcon sx={{ marginRight: '0.5rem',color:'#00ACC1' }} />Total Price:</Typography>
                  <Typography variant="h6">${priceFinal || 'N/A'}</Typography>
                </Box>
              </Grid>

            </Grid>
          </Box>

         {bookingFromComponent === null && <Grid item xs={12} style={{ marginTop: '1rem', textAlign: 'center' }}>
            <Button variant="contained" color="primary" onClick={moveBack} sx={{ marginRight: '1rem' }}>
              Go Back
            </Button>
          </Grid>}
        </CardContent>
      </Card>
    </Box>
  );
}  