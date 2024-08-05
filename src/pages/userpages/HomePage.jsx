import React, { useEffect, useRef, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Menu as MenuIcon, ArrowBackIos, ArrowForwardIos,AccountCircle  } from '@mui/icons-material';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    CssBaseline,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Box,
    Slider
  } from '@mui/material';
  import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { color } from 'framer-motion';


const theme = createTheme({
  palette: {
    primary: {
      main: '#00CC33',
    },
  },
});
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
      <ImageSlider  images={images} />
      <IntroductionSection />
      <ToursSection />
     
    </>
  );
}

function Header() {
    const [drawerOpen, setDrawerOpen] = useState(false);
  
    const toggleDrawer = (open) => () => {
      setDrawerOpen(open);
    };
  
    return (
        <>
          <AppBar position="static" sx={{ boxShadow: '0px 3px 6px rgba(0,0,0,0.1)' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ flexGrow: 1, fontSize: '2rem', fontWeight: 'bold', textAlign: 'left' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#00CC33' }}>Tour Booking</Link>
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
            <Button color="inherit" sx={{ fontSize: '2rem', marginRight: 2 }}>
              <Link to="/home" style={{ textDecoration: 'none', color: '#00CC33' }}>Home</Link>
            </Button>
            <Button color="inherit" sx={{ fontSize: '2rem', marginRight: 2 }}>
              <Link to="/tours" style={{ textDecoration: 'none', color: '#00CC33' }}>Tours</Link>
            </Button>
            <Button color="inherit" sx={{ fontSize: '2rem', marginRight: 2 }}>
              <Link to="/contact" style={{ textDecoration: 'none', color: '#00CC33' }}>Contact</Link>
            </Button>
            <Button color="inherit" sx={{ fontSize: '2rem', marginRight: 2 }}>
              <Link to="/about" style={{ textDecoration: 'none', color: '#00CC33' }}>About</Link>
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <Button color="inherit" sx={{ fontSize: '2rem', marginRight: 2, display: 'flex', alignItems: 'center' }}>
              <AccountCircle sx={{ marginRight: 1 }} />
              Login
            </Button>
            <Button variant="outlined" sx={{ fontSize: '2rem', marginRight: 2 }}>
              Sign Up
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
          <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <List>
                <ListItem button>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Tours" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Contact" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="About" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Login" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Sign Up" />
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </>
      );
  }

  function HeroSection() {
    return (
      <section
        style={{
          padding: '50px 0',
          textAlign: 'center',
          background: 'url(https://attractionsofworld.com/wp-content/uploads/2024/01/2-20-1024x534.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'var(--color-grey-900)',

        }}
      >
        <Container>
          <Typography variant="h2" gutterBottom>
            Discover Your Next Adventure
          </Typography>
          <Typography variant="h6" paragraph>
            Join us on an unforgettable journey to the most beautiful places in the world.
          </Typography>
          <Button variant="contained">
           <Typography variant="" color="var(--color-grey-900)">Book now</Typography>
          </Button>
        </Container>
      </section>
    );
  }

  function ImageSlider({images}) {
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
  }, []);

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
                display: 'flex',
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
    <section style={{ boxShadow:'2px 2px 2px 4px var(--color-grey-400)',padding: '50px 0', textAlign: 'center',backgroundColor:'var(--color-grey-200)' }}>
      <Container>
        <Typography variant="h2" gutterBottom>
          Welcome to Our Tour Booking Page
        </Typography>
        <Typography variant="body" paragraph>
          We offer a wide variety of tours to suit every taste and interest.
          Whether you're looking for an adventure, a cultural experience, or a
          relaxing getaway, we have the perfect tour for you. Whether you're looking for an adventure, a cultural experience, or a
          relaxing getaway, we have the perfect tour for you.Whether you're looking for an adventure, a cultural experience, or a
          relaxing getaway, we have the perfect tour for you.
        </Typography>
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
    <section style={{ padding: '50px 0' }}>
      <Container>
        <Typography variant="h3" gutterBottom style={{ textAlign: 'center' }}>
          Popular Tours
        </Typography>
        <Grid container spacing={4}>
          {tours.map((tour, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={tour.imageUrl}
                  alt={tour.title}
                />
                <CardContent sx={{backgroundColor:'var(--color-grey-900)', color:"var(--color-grey-200)"}}>
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

function Footer() {
  return (
    <footer
      style={{ padding: '20px 0', textAlign: 'center', background: '#f5f5f5' }}
    >
      <Container>
        <Typography variant="body1">
          © 2024 Tour Booking. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
}