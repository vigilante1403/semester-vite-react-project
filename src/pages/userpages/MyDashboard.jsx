import React, { useContext, useEffect, useState } from 'react';
import {
    Box,
    Grid,
    Typography,
    Avatar,
    Button,
    IconButton,
    CardMedia,
    Container,
} from '@mui/material';
import { Event, AttachMoney, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useBookingsOfUser } from '../../features-user/bookings/useBookings';
import { UserContext } from '../../ui/userLayout/ProtectedRouteUser';
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';

function convertToValidDate(dateStr) {
    const months = {
      Jan: '01', Feb: '02', Mar: '03', Apr: '04',
      May: '05', Jun: '06', Jul: '07', Aug: '08',
      Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    };
  
    // Tách chuỗi dựa trên khoảng trắng
    const parts = dateStr.split(' ');
  
    // Tạo chuỗi định dạng YYYY-MM-DD
    const day = parts[2]; 
    const month = months[parts[1]]; 
    const year = parts[5]; 
  
    return `${year}-${month}-${day}`;
  }
const dashboardBackground = 'url(https://wallpapers.com/images/featured-full/travel-ibk7fgrvtvhs7qzg.jpg)';

export default function MyDashboard() {
    const {user}=useContext(UserContext)
    const [upcomingTourList,setUpcomingTourList ]= useState([]);
    const {bookings,isLoading}=useBookingsOfUser(user.id);
    const [bookedTours,setBookedTours]= useState(0);
    const [upcomingTours,setUpcomingTours]= useState(1);
    // Giả lập dữ liệu
   
    const navigate = useNavigate();
    useEffect(() => {
        if(bookings) {
            setUpcomingTourList(filterBookingsAfterToday(bookings));
            setBookedTours(bookings.length);
            setUpcomingTours(filterBookingsAfterToday(bookings).length);
        }
            } ,[bookings]);
    if(isLoading) return <Spinner/>;
    if(!bookings) return <Empty resourceName={'bookings'}/>
   
   
     console.log(filterBookingsAfterToday(bookings));
     
     function filterBookingsAfterToday(bookings) {
        const todayString = new Date().toISOString().split('T')[0];
        return bookings.filter(booking =>convertToValidDate(booking.startDate) > '2024-08-12' );
    }

    return (
        <Box
            sx={{
                backgroundImage: dashboardBackground,
                backgroundSize: 'cover',
                height: '100vh', // Thay đổi chiều cao thành 100vh
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start', // Căn giữa ở trên cùng
            }}
        >
            <Typography
                variant="h4"
                sx={{ color: 'black', mb: 3, textAlign: 'center' }}
            >
                User Tours Dashboard
            </Typography>
            <Grid container spacing={0} justifyContent="center">
                {/* Hình tròn cho số tour đã đặt */}
                <Grid item xs={3}>
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
                            <Typography variant="h2" sx={{ color: '#1976d2', paddingBottom: '30px' }}><strong>{bookedTours}</strong></Typography>
                        </Box>
                        <Avatar sx={{ width: 100, height: 100, backgroundColor: 'transparent', border: '2px solid black' }}>
                            <Event sx={{ color: '#fff' }} />
                        </Avatar>
                       
                        <Typography variant="h4" sx={{ color: 'black', mt: 1, cursor: 'pointer','&:hover': {
            color: '#1976d2', 
        }, }} onClick={()=>navigate('/user/bookings')}>Booked</Typography>
                    </Box>
                </Grid>
                
              
                <Grid item xs={3}>
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
                            <Typography variant="h2" sx={{ color: '#4caf50', paddingBottom: '30px' }}><strong>{upcomingTours}</strong></Typography>
                        </Box>
                        <Avatar sx={{ width: 100, height: 100, backgroundColor: 'transparent', border: '2px solid black' }}>
                            <Event sx={{ color: '#fff' }} />
                        </Avatar>
                        <Typography variant="h4" sx={{ color: 'black', mt: 1 }}>Upcoming</Typography>
                    </Box>
                </Grid>

              
                <Grid item xs={3}>
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
                            <Typography variant="h2" sx={{ color: '#ff9800', paddingBottom: '30px' }}><strong>{"2.5M"}</strong></Typography>
                        </Box>
                        <Avatar sx={{ width: 100, height: 100, background: 'transparent', border: '2px solid black' }}>
                            <AttachMoney sx={{ color: '#fff' }} />
                        </Avatar>
                        <Typography variant="h4" sx={{ color: 'black', mt: 1 }}>Transaction</Typography>
                    </Box>
                </Grid>
            </Grid>

          
            <Grid container spacing={2} sx={{ mt: 4 }}>
                
                <Grid item xs={6}>
                    <Box sx={{ background: 'rgba(73, 101, 183, 0.9)', borderRadius: '8px', p: 2 }}>
                    <Typography variant="h3" sx={{ mb: 2, color:'var(--color-grey-100)' }}><strong>Upcoming Tours</strong></Typography>
                       <hr/>
                       {upcomingTourList !== '' && upcomingTourList.length > 0 ? <ImageSlider upcomingBookings={upcomingTourList}/> 
                       : <Typography variant="body1">No upcoming booking available.</Typography> }
                    </Box>
                </Grid>

              
                <Grid item xs={6}>
                    <Box sx={{ background: 'rgba(73, 183, 96, 0.9)', borderRadius: '8px', p: 2 }}>
                        <Typography variant="h3" sx={{ mb: 2, color:'var(--color-grey-100)' }}><strong> Payment History</strong></Typography>
                        <hr/>
                        <Typography variant="body1">No payment history available.</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
function ImageSlider({ upcomingBookings }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 600) {
                setSlidesToShow(1);
            } else if (window.innerWidth < 900) {
                setSlidesToShow(2);
            } else {
                setSlidesToShow(3);
            }
        };

        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % upcomingBookings.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [upcomingBookings.length]);

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? upcomingBookings.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % upcomingBookings.length);
    };

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <section style={{ position: 'relative', textAlign: 'center', padding: '10px 0' }}>
            <Container>
                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconButton
                        onClick={handlePrevClick}
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '10px',
                            transform: 'translateY(-50%)',
                            color: 'white',
                            zIndex: 1,
                        }}
                    >
                        <ArrowBackIos />
                    </IconButton>
                    <Box sx={{ display: 'flex', overflow: 'hidden', width: '100%', position: 'relative' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                transition: 'transform 0.5s ease-in-out',
                                transform: `translateX(-${(currentIndex * 100) / slidesToShow}%)`,
                                width: `${(upcomingBookings.length + 2) * 100 / slidesToShow}%`,
                            }}
                        >
                            {/* Clone the first and last upcomingBookings for infinite loop effect */}
                            <Box
                                sx={{
                                    flex: '0 0 auto',
                                    width: `calc(100% / ${slidesToShow})`,
                                    height: '300px',
                                    padding: '0 10px',
                                    boxSizing: 'border-box',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={"http://localhost:8080/api/v1/file/image/tour/"+upcomingBookings[upcomingBookings.length - 1].tour.imageCover} // Last image for infinite loop effect
                                    alt="last-image"
                                    sx={{ height: '70%', objectFit: 'cover' }}
                                />
                                <Typography variant="h5" sx={{ color: 'var(--color-grey-200)' }}>
                                    {upcomingBookings[upcomingBookings.length - 1].tour.name}
                                </Typography>
                                <Typography variant="h4" sx={{  color: 'var(--color-grey-200)' }}>
                                    {convertToValidDate(upcomingBookings[upcomingBookings.length - 1].startDate)}
                                </Typography>
                            </Box>
                            {upcomingBookings.map((booking, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        flex: '0 0 auto',
                                        width: `calc(100% / ${slidesToShow})`,
                                        height: '300px',
                                        padding: '0 10px',
                                        boxSizing: 'border-box',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={"http://localhost:8080/api/v1/file/image/tour/" + booking.tour.imageCover}
                                        alt={`slide-${index}`}
                                        sx={{ height: '70%', objectFit: 'cover' }}
                                    />
                                    <Typography variant="h5" sx={{ color: 'var(--color-grey-200)' }}>
                                        {booking.tour.name}
                                    </Typography>
                                    <Typography variant="h4" sx={{ color: 'var(--color-grey-200)' }}>
                                        {convertToValidDate(booking.startDate)}
                                    </Typography>
                                </Box>
                            ))}
                            <Box
                                sx={{
                                    flex: '0 0 auto',
                                    width: `calc(100% / ${slidesToShow})`,
                                    height: '300px',
                                    padding: '0 10px',
                                    boxSizing: 'border-box',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={`http://localhost:8080/api/v1/file/image/tour/${upcomingBookings[0].tour.imageCover}`} // First image for infinite loop effect
                                    alt="first-image"
                                    sx={{ height: '70%', objectFit: 'cover' }}
                                />
                                <Typography variant="h5" sx={{  color: 'var(--color-grey-200)' }}>
                                    {upcomingBookings[0].tour.name}
                                </Typography>
                                <Typography variant="h4" sx={{ color: 'var(--color-grey-200)' }}>
                                    {convertToValidDate(upcomingBookings[0].startDate)}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <IconButton
                        onClick={handleNextClick}
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            right: '10px',
                            transform: 'translateY(-50%)',
                            color: 'white',
                            zIndex: 1,
                        }}
                    >
                        <ArrowForwardIos />
                    </IconButton>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    {upcomingBookings.map((_, index) => (
                        <Button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            sx={{
                                width: '8px', // Smaller dot
                                height: '8px', // Smaller dot
                                borderRadius: '50%',
                                backgroundColor: index === currentIndex ? '#00CC33' : 'var(--color-grey-700)',
                                margin: '0 4px', // Adjusted margin
                                padding: 0,
                                minWidth: 'auto',
                                minHeight: 'auto',
                            }}
                        />
                    ))}
                </Box>
            </Container>
        </section>
    );
}
