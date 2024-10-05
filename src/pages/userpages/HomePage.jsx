import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { ArrowBackIos, ArrowForwardIos,Close as CloseIcon } from '@mui/icons-material';
import {

  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CssBaseline,
  IconButton,
  Box,
  Modal
} from '@mui/material';

import OurPartner from '../../ui/userLayout/OurPartner';

const images = [
  'https://cdn.wallpapersafari.com/49/46/RafD82.jpg',
  'https://royalstockphoto.s3.amazonaws.com/wp-content/uploads/2014/03/12185906/A306-Magical-Sunset-at-Green-Cay-Wetlands-Preserve-Delray-Beach-Florida-original.jpg',
  'https://captainkimo.com/wp-content/uploads/2014/01/Sunset-at-Swamp-Palm-Beach-Gardens-Wetlands.jpg',
  'https://th.bing.com/th/id/R.bfd17a95cc65c95e2d30e31d7c9ec560?rik=VutVLwdVnlmFiA&pid=ImgRaw&r=0',
  'https://s1.1zoom.me/prev/490/489039.jpg',
];

export default function HomePage() {
  return (
    <>
      <CssBaseline />

      <HeroSection />
      <ImageSlider images={images} />
      <IntroductionSection />
      <ToursSection />
      <IntroSection />
      <ImageGallery />
      <OurPartner/>
      <Box margin={5}></Box>
    </>
  );
}

function HeroSection() {
  return (
    <section
      style={{
        display: 'flex',
        justifyContent: 'center', // Đặt nội dung giữa theo chiều ngang
        alignItems: 'center', // Đặt nội dung giữa theo chiều dọc
        padding: '0', // Xóa khoảng padding
        height: '100vh', // Chiều cao toàn màn hình
        textAlign: 'center',
        background: 'url(https://png.pngtree.com/background/20210711/original/pngtree-spring-spring-tour-green-blue-sky-white-clouds-poster-banner-background-picture-image_1106016.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'var(--color-grey-900)',
      }}
    >
      <Container>
        <Typography variant="h1" gutterBottom>
          Discover Your Next Adventure
        </Typography>
        <Typography variant="h4" paragraph>
          Join us on an unforgettable journey to the most beautiful places in the world.
        </Typography>
        <Button variant="contained">
          <Typography color="var(--color-grey-900)">Book now</Typography>
        </Button>
      </Container>
    </section>
  );
}

function ImageSlider({ images }) {
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
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section style={{ position: 'relative', textAlign: 'center', padding: '50px 0' }}>
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
                width: `${(images.length + 2) * 100 / slidesToShow}%`,

              }}
            >
              {/* Clone the first and last images for infinite loop effect */}
              <Box
                sx={{
                  flex: '0 0 auto',
                  width: `calc(100% / ${slidesToShow})`,
                  height: '300px',
                  padding: '0 10px',
                  boxSizing: 'border-box',
                }}
              >
                <CardMedia
                  component="img"
                  image={images[images.length - 1]} // Last image for infinite loop effect
                  alt="last-image"
                  sx={{ height: '100%', objectFit: 'cover' }}
                />
              </Box>
              {images.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    flex: '0 0 auto',
                    width: `calc(100% / ${slidesToShow})`,
                    height: '300px',
                    padding: '0 10px',
                    boxSizing: 'border-box',
                  }}
                >
                  <CardMedia
                    component="img"
                    image={image}
                    alt={`slide-${index}`}
                    sx={{ height: '100%', objectFit: 'cover' }}
                  />
                </Box>
              ))}
              <Box
                sx={{
                  flex: '0 0 auto',
                  width: `calc(100% / ${slidesToShow})`,
                  height: '300px',
                  padding: '0 10px',
                  boxSizing: 'border-box',
                }}
              >
                <CardMedia
                  component="img"
                  image={images[0]} // First image for infinite loop effect
                  alt="first-image"
                  sx={{ height: '100%', objectFit: 'cover' }}
                />
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
          {images.map((_, index) => (
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

function IntroductionSection() {
  return (
    <section style={{ height: '600px', boxShadow: '2px 2px 2px 4px var(--color-grey-400)', padding: '50px 0', backgroundColor: 'var(--color-grey-200)' }}>
      <Container>
        <Box display={'flex'} justifyContent={'space-between'} padding={'30px'}>
          <Box width={'50%'} sx={{ margin: '20px' }}>
            <Typography variant="h1" gutterBottom>
              Our Unforgettable Tours
            </Typography>
            <Typography variant="h4" paragraph textAlign={'left'}>
              We have a variety of tours to offer you, from the historic landmarks to the tranquil beaches.
              Whether you're looking for an adventure, a cultural experience, or a relaxing getaway, we have the perfect tour for you.


            </Typography>
          </Box>
          <Box sx={{ width: '50%', height: '400px', backgroundImage: 'url("https://www.ubi-interactive.com/wp-content/uploads/2023/04/Can-a-puppy-eat-sweet-potatoes-830x554.jpg")', objectFit: 'cover', backgroundSize: 'cover' }}>

          </Box>
        </Box>

      </Container>
    </section>
  );
}

function IntroSection() {
  return (
    <section style={{ height: '700px', boxShadow: '2px 2px 2px 4px var(--color-grey-400)', padding: '50px 0', backgroundColor: 'var(--color-grey-200)' }}>
      <Container>

        <Box width={'80%'} sx={{ margin: '20px', paddingTop: '50px' }}>
          <Typography variant="h1" gutterBottom>
            Connecting You to Exciting Destinations Vina Travel
          </Typography>
          <Typography variant="h4" paragraph textAlign={'left'}>
            Since its inception in Ho Chi Minh City, our travel agency has been dedicated to enriching the lives of our clients through meticulously curated domestic and international tours.
            We believe that travel is the ultimate learning experience, offering unique insights into diverse cultures, histories, and landscapes.
            By prioritizing educational value in our itineraries, we ensure that each journey broadens perspectives while providing unforgettable memories.
            Our knowledgeable team, with their extensive expertise in global destinations, is committed to guiding you through every stage of your adventure, making sure your travels are as enlightening as they are enjoyable.

          </Typography>
        </Box>


      </Container>
    </section>
  );
}

function ToursSection() {
  const tours = [
    {
      title: 'Paris City Tour',
      description: 'Experience the City of Light with our guided tour.',
      imageUrl: 'https://cdn.wallpapersafari.com/49/46/RafD82.jpg',
    },
    {
      title: 'Safari Adventure',
      description: 'Explore the wild and see exotic animals up close.',
      imageUrl: 'https://cdn.wallpapersafari.com/49/46/RafD82.jpg',
    },
    {
      title: 'Beach Getaway',
      description: 'Relax on the world’s most beautiful beaches.',
      imageUrl: 'https://cdn.wallpapersafari.com/49/46/RafD82.jpg',
    },
  ];

  return (
    <section style={{ padding: '50px 0', boxShadow: '2px 2px 2px 4px var(--color-grey-400)' }}>
      <Container>
        <Typography variant="h2" gutterBottom style={{ textAlign: 'center' }}>
          Popular Tours
        </Typography>
        <Grid container spacing={3}>
          {tours.map((tour, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="450"
                  image={tour.imageUrl}
                  alt={tour.title}
                />
                <CardContent sx={{ backgroundColor: 'var(--color-grey-900)', color: "var(--color-grey-200)" }}>
                  <Typography variant="h5" component="div">
                    {tour.title}
                  </Typography>
                  <Typography variant="body2" color="inherit">
                    {tour.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ marginTop: '10px' }}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
}

const ImageGallery = () => {
  const travelImages = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1',
    'https://images.unsplash.com/photo-1544716278-e513176f20b5',
    'https://images.unsplash.com/photo-1473625247510-8ceb1760943f',
    'https://images.unsplash.com/photo-1519824145371-296894a0daa9',
    'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
    'https://images.unsplash.com/photo-1468413253725-0d5181091126',
    'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
  ];
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const handleOpen = (index) => {
    setCurrentImage(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleScroll = (direction) => {
    const newIndex = currentImage + direction;
    if (newIndex >= 0 && newIndex < travelImages.length) {
      setCurrentImage(newIndex);
    }
  };

  return (
    <div>
      <Box sx={{ padding: ' 20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', boxShadow: '2px 2px 2px 4px var(--color-grey-400)' }}>
        {travelImages.map((img, index) => (
          <Box
            key={index}
            component="img"
            src={img}
            alt={`travel ${index + 1}`}
            sx={{
              width: '100%',
              cursor: 'pointer',
              borderRadius: '8px',
              objectFit: 'cover',
            }}
            onClick={() => handleOpen(index)}
          />
        ))}
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'relative',
            width: '80%',
            margin: 'auto',
            marginTop: '5%',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <IconButton onClick={handleClose} sx={{ position: 'absolute', top: '16px', right: '16px' }}>
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src={travelImages[currentImage]}
            alt={`travel ${currentImage + 1}`}
            sx={{
              width: '100%',
              maxHeight: '500px',
              objectFit: 'cover',
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
            {travelImages.map((img, index) => (
              <Box
                key={index}
                component="img"
                src={img}
                alt={`thumbnail ${index + 1}`}
                sx={{
                  width: '80px',
                  height: '60px',
                  objectFit: 'cover',
                  cursor: 'pointer',
                  margin: '0 8px',
                  borderRadius: '4px',
                  border: index === currentImage ? '2px solid #1976d2' : '2px solid transparent',
                }}
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '16px' }}>
            <Box
              component="button"
              onClick={() => handleScroll(-1)}
              disabled={currentImage === 0}
              sx={{
                padding: '8px 16px',
                cursor: 'pointer',
                backgroundColor: 'transparent',
                border: 'none',
              }}
            >
              Previous
            </Box>
            <Box
              component="button"
              onClick={() => handleScroll(1)}
              disabled={currentImage === travelImages.length - 1}
              sx={{
                padding: '8px 16px',
                cursor: 'pointer',
                backgroundColor: 'transparent',
                border: 'none',
              }}
            >
              Next
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};





