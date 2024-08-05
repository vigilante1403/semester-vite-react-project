import { Box, Card, CardContent, CardMedia, Typography, Button, Container, Grid, Rating } from '@mui/material';
function Tour({tour}) {
    return (
        <Grid item xs={12} sm={6} md={4} key={tour.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={tour.image}
                alt={tour.title}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ fontSize: '1.5rem' }}>
                  {tour.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom sx={{ fontSize: '1rem' }}>
                  {tour.description}
                </Typography>
                <Typography variant="body1" color="textPrimary" gutterBottom sx={{ fontSize: '1.25rem' }}>
                  Price: {tour.price}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom sx={{ fontSize: '1rem' }}>
                  Start Date: {tour.startDate}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Rating name="read-only" value={tour.rating} readOnly />
                  <Typography variant="body2" color="textSecondary" sx={{ ml: 1, fontSize: '1rem' }}>
                    ({tour.rating})
                  </Typography>
                </Box>
                <Button variant="contained" color="primary" sx={{ marginTop: '10px', fontSize: '1rem' }}>
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
    )
}

export default Tour
