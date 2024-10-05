import Slider from 'react-slick';
import { Box, Container, Typography } from '@mui/material';

const partners = [
    { src: 'https://themeslay.com/preview/items/HTML-Websites/TravelAgency/assets/images/partners/airArabia.png', alt: 'Air India' },
    { src: 'https://themeslay.com/preview/items/HTML-Websites/TravelAgency/assets/images/partners/Akasaair.png', alt: 'Akasa Air' },
    { src: 'https://themeslay.com/preview/items/HTML-Websites/TravelAgency/assets/images/partners/Emirates.png', alt: 'Emirates' },
    { src: 'https://themeslay.com/preview/items/HTML-Websites/TravelAgency/assets/images/partners/flyDubai.png', alt: 'Fly Dubai' },
    { src: 'https://themeslay.com/preview/items/HTML-Websites/TravelAgency/assets/images/partners/indiaGo.png', alt: 'IndiGo' },
    { src: 'https://themeslay.com/preview/items/HTML-Websites/TravelAgency/assets/images/partners/OmanAir.png', alt: 'Oman Air' },
    { src: 'https://themeslay.com/preview/items/HTML-Websites/TravelAgency/assets/images/partners/SaudiAirlines.png', alt: 'Saudi Airlines' },
    { src: 'https://themeslay.com/preview/items/HTML-Websites/TravelAgency/assets/images/partners/travelport.png', alt: 'Travelport' },
    { src: 'https://themeslay.com/preview/items/HTML-Websites/TravelAgency/assets/images/partners/amadeus.png', alt: 'Amadeus' },
    { src: 'https://themeslay.com/preview/items/HTML-Websites/TravelAgency/assets/images/partners/goAir.png', alt: 'Go Air' },
    { src: 'https://themeslay.com/preview/items/HTML-Websites/TravelAgency/assets/images/partners/vistara.png', alt: 'Vistara' },
    { src: 'https://themeslay.com/preview/items/HTML-Websites/TravelAgency/assets/images/partners/airasia.png', alt: 'Air Asia' },
    { src: 'https://themeslay.com/preview/items/HTML-Websites/TravelAgency/assets/images/partners/airIndia.png', alt: 'Air Arabia' },
  ];


  const OurPartner = () => {
    const settings = {
      arrows:false,
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true, // Enable autoplay
      autoplaySpeed: 3000, // Auto slide every 3 seconds
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
  
    return (
      <section sx={{ py: 5, backgroundColor: 'inherit' }}>
        <Container>
          <Box sx={{ my: 5, textAlign: 'center' }}>
            <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 3, color: 'inherit' }}>
              Our <span sx={{ color: 'primary.main' }}>Partners</span>
            </Typography>
            <Typography variant='h5' sx={{ color: 'inherit' }}>
              Our Partners is our main contractor, it will work with your business plan <br /> to develop
              custom offers & deals for you.
            </Typography>
          </Box>
          <Box sx={{ mt: 5 }}>
            <Slider {...settings} id="carouselPartner">
              {partners.map((partner, index) => (
                <div key={index} className="item">
                  <img
                    src={partner.src}
                    alt={partner.alt}
                    style={{ width: '70%', height: '70px', objectFit: 'contain' }} // Fixed size for logos
                  />
                </div>
              ))}
            </Slider>
          </Box>
        </Container>
      </section>
    );
  };
  export default OurPartner;