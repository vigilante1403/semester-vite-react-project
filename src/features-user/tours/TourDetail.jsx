import React, { useState } from "react";
import { Box, Typography, Grid, Avatar, Card, CardContent, Rating, Dialog, IconButton } from "@mui/material";
// import { styled } from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';
import MapComponent from "../../features/tours/Map";
import { useAuthenticate } from "../security/useAuthenticate";
import Spinner from "../../ui/Spinner";
import CheckoutButton from "./CheckoutButton";

const TourDetail = ({ tour }) => {
  console.log(tour);
  const { user, isAuthenticated, isLoading } = useAuthenticate();



  // Fake images if tour.images is null
  const fakeImages = [
    'https://th.bing.com/th/id/OIP.GrkhMGYIyTYnMv0efg2KMAAAAA?rs=1&pid=ImgDetMain',
    'https://th.bing.com/th/id/OIP.N7oB3aMsm5uCofvk-WTV0gHaFP?rs=1&pid=ImgDetMain',
    'https://th.bing.com/th/id/OIP.GrkhMGYIyTYnMv0efg2KMAAAAA?rs=1&pid=ImgDetMain',
    'https://via.placeholder.com/300x200?text=Image+4',
    'https://via.placeholder.com/300x200?text=Image+5'
  ];

  const images = tour.images && tour.image !== null ? tour.images : fakeImages;

  // State to manage the modal
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleClickOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage('');
  };
  // if (isLoading) {
  //   return <Spinner />
  // }
  return (
    <Box>
      {/* Tour Name Section */}
      <Box
        sx={{
          backgroundImage: `url('http://localhost:8080/api/v1/file/image/tour/${tour.imageCover}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: 'fixed',
          height: '40vh',
          color: "white",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(to bottom right, rgba(0, 65, 214, 0.8), rgba(0, 173, 255, 0.4))",
            opacity: 0.7,
          },
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            position: "relative",
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
            sx={{ color: 'black', textAlign: "center" }}
          >
            {tour.name}
          </Typography>
        </Box>
      </Box>

      {/* Tour Description and User Review Section */}
      <Box sx={{ padding: '20px', backgroundColor: 'var(--color-grey-200)' }}>
        <Grid container spacing={3}>
          {/* Phần mô tả tour và thông tin hướng dẫn viên */}
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                Description
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: '20px' }}>
                {tour.description}
              </Typography>
            </Box>
            <Box sx={{ marginTop: '30px', borderTop: '1px solid #ccc', paddingTop: '20px' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                Guides
              </Typography>
              {tour.guides.map((guide) => (
                <Box key={guide.id} display="flex" alignItems="center" marginTop="10px">
                  <Avatar src={`http://localhost:8080/api/v1/file/image/user/${guide.photo}`} />
                  <Box sx={{ marginLeft: '10px' }}>
                    <Typography variant="body1">{guide.fullName}</Typography>
                    <Typography variant="body2">Role: {guide.role}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Phần đánh giá của người dùng */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
              Reviews
            </Typography>
            <Box sx={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }}>
              {tour.reviews && tour.reviews.length > 0 ? (
                tour.reviews.map((review, index) => (
                  <Card key={index} sx={{ marginBottom: '10px', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <CardContent>
                      <Box display="flex" alignItems="center">
                        <Avatar src={review.userPhoto || ''} alt="User Photo" sx={{ width: 40, height: 40, marginRight: '10px' }} />
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {review.userName || 'User Name'}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'gray' }}>
                            {review.createdAt || 'Date'}
                          </Typography>
                        </Box>
                      </Box>
                      <Rating name="read-only" value={review.rating || 0} readOnly sx={{ marginTop: '10px' }} />
                      <Typography variant="body2" sx={{ marginTop: '10px' }}>
                        {review.review || 'This is the review content.'}
                      </Typography>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Typography variant="body2" sx={{ color: 'gray' }}>No reviews yet.</Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Tour Images Section */}
      <Box sx={{ padding: '20px' }}>
        <Typography variant="h6" sx={{ marginBottom: '20px' }}>Images</Typography>
        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            gap: '10px', // Adjust the gap between images
          }}
        >
          {images.map((image, index) => (
            <Box
              key={index}
              sx={{
                flex: '0 0 auto',
                width: { xs: '100%', sm: 'calc(33.333% - 10px)' },
                height: 'auto',
              }}
            >
              <Box
                component="img"
                src={  tour.images && tour.image !== null ? `http://localhost:8080/api/v1/file/image/tour/${image}`: image}
                alt={`Tour Image ${index + 1}`}
                sx={{
                  width: '30vw',
                  height: '40vh',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  objectFit: 'cover',
                  cursor: 'pointer',
                }}
                onClick={() => handleClickOpen(image)}
              />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Modal for Full Screen Image */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '80vh',
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 2,
              color: 'white',
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src={ tour.images && tour.image !== null ? `http://localhost:8080/api/v1/file/image/tour/${selectedImage}` : selectedImage}
            alt="Selected Tour"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </Box>
      </Dialog>
      {tour.locations.length>0&&<MapComponent locations={tour.locations} />}
      <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Left Side: Overlapping Tour Images */}
        <Box sx={{bottom: '60px', position: 'relative', width: '50%', display: 'flex', justifyContent: 'flex-start' }}>
          {images.slice(0, 3).map((image, index) => (
            <Box
              key={index}
              component="img"
              src={ tour.images && tour.image !== null ? `http://localhost:8080/api/v1/file/image/tour/${image}` : image}
              alt={''}
              sx={{
                position: 'absolute',
                left: `${index * 30}px`,
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                border: '1px solid white',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                objectFit: 'cover',
                cursor: 'pointer',
              }}
              onClick={() => handleClickOpen(image)} // Open modal on click
            />
          ))}
        </Box>

        {/* Right Side: Welcome Message and Login Button */}
        <Box sx={{ width: '50%', textAlign: 'center' }}>
          <Typography variant="h6" sx={{ marginBottom: '20px' }}>
            Welcome to Vina travel. Thank you for trying to produce my page!
          </Typography>
          {/* <Box
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
            onClick={() => console.log("Login to booking clicked")}
          >
            {!isAuthenticated ? "Login to booking" : "Booking now"}
          </Box> */}
          {isAuthenticated ? <CheckoutButton tour={tour}/> : <Box
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
            onClick={() => console.log("Login to booking clicked")}
          >
            {"Login to booking"}
          </Box>}
        </Box>
      </Box>

    </Box>
  );
};

export default TourDetail;