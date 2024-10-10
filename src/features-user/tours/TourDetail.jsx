// import React, { useContext, useState } from "react";
// import { Box, Typography, Grid, Avatar, Card, CardContent, Rating, Dialog, IconButton } from "@mui/material";
// import { styled } from "@mui/system";
// import CloseIcon from '@mui/icons-material/Close';
// import MapComponent from "../../features/tours/Map";
// import { useAuthenticate } from "../security/useAuthenticate";
// import Spinner from "../../ui/Spinner";
// import CheckoutButton from "./CheckoutButton";
// import Modal from "../../ui/Modal";
// import Button from "../../ui/Button";
// import StepConfirmBookingTour from "./StepConfirmBookingTour";
// import { LoginContext } from "../../context/LoginContext";

// const TourDetail = ({ tour }) => {
// const {handleLoginSignupOpen}=useContext(LoginContext)
// const { user, isAuthenticated, isLoading } = useAuthenticate();

// // Fake images if tour.images is null
// const fakeImages = [
//   'https://th.bing.com/th/id/OIP.GrkhMGYIyTYnMv0efg2KMAAAAA?rs=1&pid=ImgDetMain',
//   'https://th.bing.com/th/id/OIP.N7oB3aMsm5uCofvk-WTV0gHaFP?rs=1&pid=ImgDetMain',
//   'https://th.bing.com/th/id/OIP.GrkhMGYIyTYnMv0efg2KMAAAAA?rs=1&pid=ImgDetMain',
//   'https://via.placeholder.com/300x200?text=Image+4',
//   'https://via.placeholder.com/300x200?text=Image+5'
// ];

// const images = tour.images  ? tour.images : fakeImages;

// // State to manage the modal
// const [open, setOpen] = useState(false);
// const [selectedImage, setSelectedImage] = useState('');

// const handleClickOpen = (image) => {
//   setSelectedImage(image);
//   setOpen(true);
// };

// const handleClose = () => {
//   setOpen(false);
//   setSelectedImage('');
// };
// // if (isLoading) {
// //   return <Spinner />
// // }
// return (
//   <Box>
//     {/* Tour Name Section */}
//     <Box
//       sx={{
//         backgroundImage: `url('http://localhost:8080/api/v1/file/image/tour/${tour.imageCover}')`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundAttachment: 'fixed',
//         height: '40vh',
//         color: "white",
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         position: "relative",
//         "&::before": {
//           content: '""',
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           background: "linear-gradient(to bottom right, rgba(0, 65, 214, 0.8), rgba(0, 173, 255, 0.4))",
//           opacity: 0.7,
//         },
//         zIndex: 1,
//       }}
//     >
//       <Box
//         sx={{
//           position: "relative",
//           zIndex: 2,
//           backgroundColor: 'white',
//           padding: '10px 20px',
//           borderRadius: '8px',
//           boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         <Typography
//           variant="h3"
//           component="h1"
//           sx={{ color: 'black', textAlign: "center" }}
//         >
//           {tour.name}
//         </Typography>
//       </Box>
//     </Box>

//     {/* Tour Description and User Review Section */}
//     <Box sx={{ padding: '20px', backgroundColor: 'var(--color-grey-200)' }}>
//       <Grid container spacing={3}>
//         {/* Phần mô tả tour và thông tin hướng dẫn viên */}
//         <Grid item xs={12} md={6}>
//           <Box>
//             <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
//               Description
//             </Typography>
//             <Typography variant="body1" sx={{ marginBottom: '20px' }}>
//               {tour.description}
//             </Typography>
//           </Box>
//           <Box sx={{ marginTop: '30px', borderTop: '1px solid #ccc', paddingTop: '20px' }}>
//             <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
//               Guides
//             </Typography>
//             {tour.guides.map((guide) => (
//               <Box key={guide.id} display="flex" alignItems="center" marginTop="10px">
//                 <Avatar src={`http://localhost:8080/api/v1/file/image/user/${guide.photo}`} />
//                 <Box sx={{ marginLeft: '10px' }}>
//                   <Typography variant="body1">{guide.fullName}</Typography>
//                   <Typography variant="body2">Role: {guide.role}</Typography>
//                 </Box>
//               </Box>
//             ))}
//           </Box>
//         </Grid>

//         {/* Phần đánh giá của người dùng */}
//         <Grid item xs={12} md={6}>
//           <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
//             Reviews
//           </Typography>
//           <Box sx={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }}>
//             {tour.reviews && tour.reviews.length > 0 ? (
//               tour.reviews.map((review, index) => (
//                 <Card key={index} sx={{ marginBottom: '10px', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
//                   <CardContent>
//                     <Box display="flex" alignItems="center">
//                       <Avatar src={review.userPhoto || ''} alt="User Photo" sx={{ width: 40, height: 40, marginRight: '10px' }} />
//                       <Box>
//                         <Typography variant="body2" sx={{ fontWeight: 600 }}>
//                           {review.userName || 'User Name'}
//                         </Typography>
//                         <Typography variant="caption" sx={{ color: 'gray' }}>
//                           {review.createdAt || 'Date'}
//                         </Typography>
//                       </Box>
//                     </Box>
//                     <Rating name="read-only" value={review.rating || 0} readOnly sx={{ marginTop: '10px' }} />
//                     <Typography variant="body2" sx={{ marginTop: '10px' }}>
//                       {review.review || 'This is the review content.'}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               ))
//             ) : (
//               <Typography variant="body2" sx={{ color: 'gray' }}>No reviews yet.</Typography>
//             )}
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>

//     {/* Tour Images Section */}
//     <Box sx={{ padding: '20px' }}>
//       <Typography variant="h6" sx={{ marginBottom: '20px' }}>Images</Typography>
//       <Box
//         sx={{
//           display: 'flex',
//           overflowX: 'auto',
//           whiteSpace: 'nowrap',
//           gap: '10px', // Adjust the gap between images
//         }}
//       >
//         {images.map((image, index) => (
//           <Box
//             key={index}
//             sx={{
//               flex: '0 0 auto',
//               width: { xs: '100%', sm: 'calc(33.333% - 10px)' },
//               height: 'auto',
//             }}
//           >
//             <Box
//               component="img"
//               src={  tour.images ? `http://localhost:8080/api/v1/file/image/tour/${image}`: image}
//               alt={`Tour Image ${index + 1}`}
//               sx={{
//                 width: '30vw',
//                 height: '40vh',
//                 borderRadius: '8px',
//                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//                 objectFit: 'cover',
//                 cursor: 'pointer',
//               }}
//               onClick={() => handleClickOpen(image)}
//             />
//           </Box>
//         ))}
//       </Box>
//     </Box>

//     {/* Modal for Full Screen Image */}
//     <Dialog
//       open={open}
//       onClose={handleClose}
//       maxWidth="md"
//       fullWidth
//     >
//       <Box
//         sx={{
//           position: 'relative',
//           width: '100%',
//           height: '80vh',
//         }}
//       >
//         <IconButton
//           onClick={handleClose}
//           sx={{
//             position: 'absolute',
//             top: 10,
//             right: 10,
//             zIndex: 2,
//             color: 'white',
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//         <Box
//           component="img"
//           src={ tour.images  ? `http://localhost:8080/api/v1/file/image/tour/${selectedImage}` : selectedImage}
//           alt="Selected Tour"
//           sx={{
//             width: '100%',
//             height: '100%',
//             objectFit: 'contain',
//           }}
//         />
//       </Box>
//     </Dialog>
//     {tour.locations.length>0&&<MapComponent locations={tour.locations} />}
//     <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//       {/* Left Side: Overlapping Tour Images */}
//       <Box sx={{bottom: '60px', position: 'relative', width: '50%', display: 'flex', justifyContent: 'flex-start' }}>
//         {images.slice(0, 3).map((image, index) => (
//           <Box
//             key={index}
//             component="img"
//             src={ tour.images ? `http://localhost:8080/api/v1/file/image/tour/${image}` : image}
//             alt={''}
//             sx={{
//               position: 'absolute',
//               left: `${index * 30}px`,
//               width: '120px',
//               height: '120px',
//               borderRadius: '50%',
//               border: '1px solid white',
//               boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//               objectFit: 'cover',
//               cursor: 'pointer',
//             }}
//             onClick={() => handleClickOpen(image)} // Open modal on click
//           />
//         ))}
//       </Box>

//       {/* Right Side: Welcome Message and Login Button */}
//       <Box sx={{ width: '50%', textAlign: 'center' }}>
//         <Typography variant="h6" sx={{ marginBottom: '20px' }}>
//           Welcome to Vina travel. Thank you for trying to produce my page!
//         </Typography>
//         {/* <Box
//           component="button"
//           sx={{
//             padding: '10px 20px',
//             backgroundColor: 'black',
//             color: 'white',
//             borderRadius: '8px',
//             cursor: 'pointer',
//             textTransform: 'uppercase',
//             border: 'none',
//             '&:hover': {
//               backgroundColor: 'darkgray',
//             },
//           }}
//           onClick={() => console.log("Login to booking clicked")}
//         >
//           {!isAuthenticated ? "Login to booking" : "Booking now"}
//         </Box> */}
//         {isAuthenticated ? <Modal>
//           <Modal.Open opens={'book-tour'}>
//           <Button
//     variant="contained"
//     color="primary"
//     sx={{ marginTop: '1rem', fontSize: '1.2rem' }}

//   >Book now</Button>
//           </Modal.Open>
//           <Modal.Window name='book-tour'>
//             <StepConfirmBookingTour tour={tour} user={user} />
//           </Modal.Window>
//         </Modal> : <Box
//         // {isAuthenticated ? <CheckoutButton tour={tour}/> : <Box
//           component="button"
//           sx={{
//             padding: '10px 20px',
//             backgroundColor: 'black',
//             color: 'white',
//             borderRadius: '8px',
//             cursor: 'pointer',
//             textTransform: 'uppercase',
//             border: 'none',
//             '&:hover': {
//               backgroundColor: 'darkgray',
//             },
//           }}
//           onClick={() => handleLoginSignupOpen(true)}
//         >
//           {"Login to booking"}
//         </Box>}
//       </Box>
//     </Box>

//   </Box>
// );
// };
import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  Typography,
  Button,
  Box,
  CardContent,
  Avatar,
  Rating,
  ListItem,
} from '@mui/material';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css'; // Import CSS cho Calendar
import { isSameDay, isSameMonth, isSameYear } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MapComponent from '../../features/tours/Map';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import Button36, { Button75 } from './ButtonCustom';
import { LoginContext } from '../../context/LoginContext';
import { useAuthenticate } from '../security/useAuthenticate';
import Modal from '../../ui/Modal';
import StepConfirmBookingTour from './StepConfirmBookingTour';
import { formatDateArrayAscOrDesc } from '../../utils/helpers';
import { useGetAllUpcomingBookingsOfSameTour } from './useBookTour';
import NotifBookingExisted from './NotifBookingExisted';
import Spinner from '../../ui/Spinner';
const CalendarContainer = styled.div`
  /* ~~~ container styles ~~~ */
  max-width: 600px;
  min-width: 500px;
  min-height: 300px;
  margin: auto;
  margin-top: 20px;
  background-color: #d4f7d4;
  padding: 10px;
  border-radius: 3px;
  .react-calendar__navigation {
    display: flex;

    .react-calendar__navigation__label {
      font-weight: bold;
    }

    .react-calendar__navigation__arrow {
      flex-grow: 0.333;
    }
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
  }
  button {
    margin: 10px;
    background-color: #6f876f;
    border: 0;
    border-radius: 3px;
    color: white;
    padding: 5px 0;

    &:hover {
      background-color: #556b55;
    }

    &:active {
      background-color: #acc8e5;
    }
  }
  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%;

    .react-calendar__tile {
      max-width: initial !important;
      min-width: 60px !important;
      min-height: 60px !important;
    }
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.7;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #dfdfdf;
  }
  .react-calendar__tile--range {
    box-shadow: 0 0 6px 2px black;
    background-color: rgba(74, 81, 238, 0.8);
  }
  .react-calendar__tile.start-date {
    /* Custom style for start-date */
    background-color: rgba(238, 159, 74, 0.8); /* Vàng */
    color: #000; /* Màu chữ đen */
    border: 2px solid #ff6347; /* Đường viền đỏ */
  }
  .react-calendar__year-view__months,
  .react-calendar__decade-view__years,
  .react-calendar__century-view__decades {
    display: grid !important;
    grid-template-columns: 20% 20% 20% 20% 20%;

    &.react-calendar__year-view__months {
      grid-template-columns: 33.3% 33.3% 33.3%;
    }

    .react-calendar__tile {
      max-width: initial !important;
    }
  }
`;

const TourDetail = ({ tour, otherTours }) => {
  const dateArr = formatDateArrayAscOrDesc(tour.startDates, 1);
  console.log(dateArr);
  const [selectedDate, setSelectedDate] = useState(
    new Date(tour.startDates[0])
  );

  const [isDateLocked, setIsDateLocked] = useState(true);
  const [showMoreReviews, setShowMoreReviews] = useState(false); // State to toggle See More reviews
  const [fakeReviews, setFakeReviews] = useState([]);
  const { handleLoginSignupOpen } = useContext(LoginContext);
  const { user, isAuthenticated, isLoading } = useAuthenticate();
  const { bookings, isGetting } = useGetAllUpcomingBookingsOfSameTour({
    tourId: tour.id,
    userId: isAuthenticated ? user.id : null,
  });
  const navigate = useNavigate();
  const [isAgree, setIsAgree] = useState(false);
  const fetchAndSetTourLocations = async (tour) => {
    if (tour?.locations) {
      const locationAddresses = tour.locations.map(
        (location) => location.address
      );
      const newSubDescriptions = tour.locations.map((location) =>
        location.description.split(', ').map((desc) => desc.trim())
      );

      setSchedule(newSubDescriptions);
      setAddress(locationAddresses);
    } else {
      setAddress('');
      setSchedule(['']);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);

    setSelectedDate(new Date(tour.startDates[0]));

    const generatedFakeReviews = Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      userName: `User ${index + 1}`,
      userPhoto: '',
      createdAt: `2024-10-${(index % 31) + 1}`,
      rating: (index % 5) + 1,
      review: `This is review number ${
        index + 1
      }. The experience was amazing, and I would recommend this tour!`,
    }));

    setFakeReviews(generatedFakeReviews);
    fetchAndSetTourLocations(tour);
  }, [tour, tour.startDates]);
  const handleToggleShowMore = () => {
    setShowMoreReviews(!showMoreReviews);
  };
  const startDates = tour.startDates.map((date) => new Date(date));

  const isStartDate = (date) => {
    return startDates.some((startDate) => isSameDay(date, startDate));
  };
  const isStartMonth = (date) => {
    return startDates.some((startDate) => isSameMonth(date, startDate));
  };
  const isStartYear = (date) => {
    return startDates.some((startDate) => isSameYear(date, startDate));
  };
  const tileDisabled = ({ date, view }) => {
    switch (view) {
      case 'month':
        return !isStartDate(date);

      case 'year':
        return !isStartMonth(date);

      case 'decade':
        return !isStartYear(date);

      case 'century': {
        const startYears = startDates.map((startDate) =>
          startDate.getFullYear()
        );
        const startDecades = startYears.map(
          (year) => Math.floor(year / 10) * 10
        );
        return !startDecades.includes(Math.floor(date.getFullYear() / 10) * 10);
      }
      default:
        return false;
    }
  };
  const [selectedImage, setSelectedImage] = useState(
    tour.images !== null ? tour.images[0] : ''
  );

  const handleChangeImage = (image) => {
    setSelectedImage(image);
    console.log(image);
  };
  const handleDateChange = (date) => {
    if (isDateLocked && isSameDay(selectedDate, date)) {
      return;
    }
    setSelectedDate(date);
    setIsDateLocked(false);
  };

  const handleSelectAnotherDate = () => {
    setIsDateLocked(false);
    var currentDate = selectedDate;
    console.log(currentDate.toLocaleDateString('en-CA'));
    var index = Array.from(dateArr).indexOf(
      currentDate.toLocaleDateString('en-CA')
    );
    console.log(index);
    if (index + 1 < dateArr.length) {
      setSelectedDate(new Date(dateArr[index + 1]));
    } else {
      setSelectedDate(new Date(dateArr[0]));
    }
  };

  const handleSeeAllTours = () => {
    navigate('/tours');
  };
  const handleSeeTourDetail = (id) => {
    navigate(`/tours/tour-detail/${id}`);
  };

  const [schedule, setSchedule] = useState(['']);
  const [address, setAddress] = useState('');
  if(isAuthenticated&&isGetting) return <Spinner />
  return (
    <Container>
      <section>
        <Box
          sx={{
            backgroundImage: `url('http://localhost:8080/api/v1/file/image/tour/${tour.imageCover}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            height: '80vh',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background:
                'linear-gradient(to bottom right, rgba(0, 65, 214, 0.8), rgba(0, 173, 255, 0.4))',
              opacity: 0.7,
            },
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              zIndex: 2,
              backgroundColor: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{ color: 'black', textAlign: 'center' }}
            >
              {tour.name}
            </Typography>
          </Box>
        </Box>
      </section>

      <section style={{ marginTop: '80px' }}>
        <Typography variant="h3" gutterBottom>
          {'Travel Date'}
        </Typography>
        <hr />

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Box
            flex={1}
            display="flex"
            justifyContent="center"
            sx={{
              backgroundColor: 'gray',
              paddingBottom: '20px',
              margin: '20px',
              border: '1px solid grey',
            }}
          >
            <CalendarContainer>
              <Calendar
                sx={{ width: '500px', height: '200px' }}
                onChange={handleDateChange}
                value={selectedDate}
                tileDisabled={tileDisabled}
                tileClassName={({ date, view }) =>
                  view === 'month' && isStartDate(date) ? 'start-date' : null
                }
              />
            </CalendarContainer>
          </Box>

          <Box flex={1} ml={2} mt={5} sx={{ marginLeft: '50px' }}>
            <Typography variant="h3" gutterBottom>
              Information tour
            </Typography>
            <Typography variant="h4">
              <strong>Start Date:</strong>{' '}
              {selectedDate.toLocaleDateString('en-CA')}
            </Typography>
            <Typography variant="h4">
              <strong>Price:</strong> {tour.price - tour.priceDiscount} $
            </Typography>

            <Typography variant="h4" gutterBottom>
              <strong>Guides:</strong>
            </Typography>
            {tour.guides.map((guide) => (
              <Typography key={guide.id} variant="h5">
                {guide.fullName} - {guide.nationality}
              </Typography>
            ))}

            {/* {isDateLocked ? ( */}
            <Box sx={{ margin: '20px' }} display={'flex'}>
              {/* <Button variant="outlined" color="secondary" onClick={handleSelectAnotherDate} style={{ marginTop: '16px' }}>
                  Choose another
                </Button> */}
              {/* <Button variant="contained" color="primary" style={{ marginTop: '16px' }}>
                  Book now
                </Button> */}
              <Button75
                onClick={handleSelectAnotherDate}
                label={'Another Day'}
              />
              {isAuthenticated ? !isAgree&&bookings!==null&&bookings.length>0? (<Modal>
                <Modal.Open opens={"agreement"}>
                <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginTop: '1rem', fontSize: '1.2rem' }}
                    >
                      Book now
                    </Button>
                </Modal.Open>
                <Modal.Window name={"agreement"}>
                  <NotifBookingExisted onSetAgreement={setIsAgree} bookings={bookings} />
                </Modal.Window>
              </Modal>): (
                <Modal>
                  <Modal.Open opens={`book-tour-${tour.id}`}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginTop: '1rem', fontSize: '1.2rem' }}
                    >
                      Book now
                    </Button>
                    {/* <Button36 label={'Book now'}/> */}
                  </Modal.Open>
                  <Modal.Window name={`book-tour-${tour.id}`}>
                    <StepConfirmBookingTour tour={tour} user={user} />
                  </Modal.Window>
                </Modal>
              ) : (
                <Box
                  // {isAuthenticated ? <CheckoutButton tour={tour}/> : <Box
                  component="button"
                  sx={{
                    padding: '10px 20px',
                    backgroundColor: 'black',
                    color: 'white',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    border: 'none',
                    '&:hover': {
                      backgroundColor: 'darkgray',
                    },
                  }}
                  onClick={() => handleLoginSignupOpen(true)}
                >
                  {'Login to booking'}
                </Box>
              )}
              {/* <Button36 label={"Book now"} disabled={!isDateLocked} /> */}
            </Box>
            {/* ) : null} */}
          </Box>
        </Box>
      </section>

      <section>
        <Box padding={1} margin={1}>
          <Grid
            container
            justifyContent={'space-evenly'}
            spacing={4}
            padding={3}
          >
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              display="flex"
              flexDirection="column"
              sx={{ padding: '5px' }}
            >
              <Box
                display="flex"
                flexDirection="column"
                overflow={
                  tour.images && tour.images.length > 3 ? 'auto' : 'visible'
                }
                maxHeight="420px"
              >
                {tour.images && tour.images.length > 0 ? (
                  tour.images.map((image) => (
                    <ListItem
                      key={image}
                      sx={{
                        justifyContent: 'center',
                        cursor: 'pointer',
                        padding: '0',
                      }}
                    >
                      <img
                        src={`http://localhost:8080/api/v1/file/image/tour/${image}`}
                        alt={image}
                        height={'120px'}
                        width={'200px'}
                        onClick={() => handleChangeImage(image)}
                        style={{ margin: '10px', objectFit: 'cover' }}
                      />
                    </ListItem>
                  ))
                ) : (
                  <img
                    src="default-image-url.jpg"
                    alt="Default"
                    height={'100px'}
                    width={'200px'}
                    style={{ marginBottom: '10px', objectFit: 'cover' }}
                  />
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
              <img
                src={`http://localhost:8080/api/v1/file/image/tour/${selectedImage}`}
                alt={selectedImage}
                height={'420px'}
                style={{ width: '100%', objectFit: 'cover' }}
              />
            </Grid>
          </Grid>
        </Box>
      </section>
      <SimpleTreeView>
        {address &&
          address.map((address, index) => (
            <TreeItem
              itemId={index.toString()}
              label={
                <span style={{ fontSize: '2.2rem' }}>
                  Day {index + 1}: {address}
                </span>
              }
              key={index}
            >
              {schedule &&
                schedule[index].map((schedule, idx) => (
                  <TreeItem
                    itemId={`${index}-${idx}`}
                    label={
                      <span style={{ fontSize: '1.8rem' }}>{schedule}</span>
                    }
                    key={`${index}-${idx}`}
                    style={{ fontSize: '1.2rem' }}
                  />
                ))}
            </TreeItem>
          ))}
      </SimpleTreeView>
      <section style={{ marginTop: '80px' }}>
        <Typography variant="h2" gutterBottom>
          <strong>Another Tours</strong>
        </Typography>
        <hr></hr>
        <Grid container spacing={4} padding={3}>
          {otherTours.slice(0, 3).map((otherTour) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={otherTour.id}
              style={{ position: 'relative' }}
            >
              <Card
                style={{
                  backgroundImage: `url(http://localhost:8080/api/v1/file/image/tour/${otherTour.imageCover})`,
                  backgroundSize: 'cover',
                  height: '400px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '16px',
                  position: 'relative',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <Box
                  sx={{
                    backgroundColor: 'white',
                    height: '50%',
                    padding: '16px',
                    borderRadius: '8px',
                    opacity: 0.9,
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      'rgba(255, 255, 255, 0.95)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                  }}
                >
                  <Typography variant="h4" gutterBottom>
                    {otherTour.name}
                  </Typography>
                </Box>

                <Box
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    right: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <Typography
                    variant="h4"
                    style={{
                      marginLeft: '45px',
                      marginBottom: '5px',
                      marginRight: '8px',
                      color: 'red',
                    }}
                  >
                    {otherTour.price} $ {/* Tour price */}
                  </Typography>
                  <Button
                    onClick={() => handleSeeTourDetail(otherTour.id)}
                    variant="contained"
                    color="primary"
                    style={{ marginBottom: '5px', marginRight: '8px' }}
                  >
                    See detail
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box mt={2}>
          <Button variant="outlined" onClick={handleSeeAllTours}>
            See all
          </Button>
        </Box>
      </section>
      <section style={{ marginTop: '80px' }}>
        <Typography variant="h2" gutterBottom>
          Map
        </Typography>
        <hr></hr>
        <Box sx={{ margin: '50px' }}>
          {tour.locations.length > 0 && (
            <MapComponent
              styleDefault="mapbox://styles/vytruong1812/cm1c6ma7h02hc01o3azvg0h6e"
              locations={tour.locations}
            />
          )}
        </Box>
      </section>
      <section style={{ marginTop: '80px' }}>
        <Typography variant="h2">Reviews</Typography>
        <hr />
        <Box
          sx={{
            display: 'flex',
            overflowX: showMoreReviews ? 'scroll' : 'hidden',
            padding: '10px',
            gap: '10px',
            maxHeight: '800px',
            margin: '20px',
            backgroundColor: '#ADCB8B',
          }}
        >
          {fakeReviews && fakeReviews.length > 0 ? (
            fakeReviews
              .slice(0, showMoreReviews ? fakeReviews.length : 3)
              .map((review, index) => (
                <Card
                  key={index}
                  sx={{
                    minWidth: '300px',
                    height: '400px',
                    maxWidth: '358px',
                    backgroundColor: '#e0f7fa',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    margin: '10px 0px',
                    flexShrink: 0,
                    // padding:'10px'
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        src={review.userPhoto || ''}
                        alt="User Photo"
                        sx={{ width: 40, height: 40, marginRight: '10px' }}
                      />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {review.userName || 'User Name'}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'gray' }}>
                          {review.createdAt || 'Date'}
                        </Typography>
                      </Box>
                    </Box>
                    <Rating
                      name="read-only"
                      value={review.rating || 0}
                      readOnly
                      sx={{ marginTop: '10px' }}
                    />
                    <Typography variant="h4" sx={{ marginTop: '10px' }}>
                      {review.review || 'This is the review content.'}
                    </Typography>
                  </CardContent>
                </Card>
              ))
          ) : (
            <Typography variant="h4" sx={{ color: 'gray' }}>
              No reviews yet.
            </Typography>
          )}
        </Box>

        {/* Nút See More / See Less */}
        {fakeReviews.length > 3 && (
          <Box textAlign="center" mt={2}>
            <Button
              onClick={handleToggleShowMore}
              variant="outlined"
              color="primary"
            >
              {showMoreReviews ? 'See Less' : 'See More'}
            </Button>
          </Box>
        )}
      </section>
      {/* 
      <section style={{ marginTop: '80px' }}>
      
    
        <hr />

        <Grid container spacing={3}>
          
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Các Tour Quốc Tế
                </Typography>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  <li><Typography variant="h6">Tour Nhật Bản</Typography></li>
                  <li><Typography variant="h6">Tour Hàn Quốc</Typography></li>
                  <li><Typography variant="h6">Tour Pháp</Typography></li>
                  <li><Typography variant="h6">Tour Úc</Typography></li>
                  <li><Typography variant="h6">Tour Mỹ</Typography></li>
                  <li><Typography variant="h6">Tour Canada</Typography></li>
                 
                </ul>
              </CardContent>
            </Card>
          </Grid>

        
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Các Tour Nội Địa
                </Typography>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  <li><Typography variant="h6">Tour Hà Nội</Typography></li>
                  <li><Typography variant="h6">Tour TP Hồ Chí Minh</Typography></li>
                  <li><Typography variant="h6">Tour Đà Nẵng</Typography></li>
                  <li><Typography variant="h6">Tour Huế</Typography></li>
                  <li><Typography variant="h6">Tour Phú Quốc</Typography></li>
                 
                </ul>
              </CardContent>
            </Card>
          </Grid>

       
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Thông Tin Liên Hệ
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Hotline: +123 456 7890
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Email: support@example.com
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Địa chỉ: 123 Main St, City, State, ZIP
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Website: www.example.com
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </section> */}
    </Container>
  );
};
export default TourDetail;
