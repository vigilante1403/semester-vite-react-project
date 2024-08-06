import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, Container, Grid, Rating } from '@mui/material';
import TourShowing from '../../features-user/tours/TourShowing';

const tours = [
  {
    id: 1,
    title: 'Tour to the Mountains',
    description: 'Enjoy a beautiful tour to the mountains.',
    image: 'https://picsum.photos/id/237/600/400',
    price: '$200',
    startDate: '2023-08-10',
    rating: 4.5
  },
  {
    id: 2,
    title: 'Beach Getaway',
    description: 'Relax on the sandy beaches.',
    image: 'https://picsum.photos/id/238/600/400',
    price: '$150',
    startDate: '2023-09-01',
    rating: 4.0
  },
  {
    id: 3,
    title: 'City Exploration',
    description: 'Discover the wonders of the city.',
    image: 'https://picsum.photos/id/239/600/400',
    price: '$100',
    startDate: '2023-10-05',
    rating: 4.2
  },
  {
    id: 4,
    title: 'Forest Adventure',
    description: 'Explore the deep forests.',
    image: 'https://picsum.photos/id/240/600/400',
    price: '$180',
    startDate: '2023-11-15',
    rating: 4.8
  },
  {
    id: 5,
    title: 'Desert Safari',
    description: 'Experience the thrill of the desert.',
    image: 'https://picsum.photos/id/241/600/400',
    price: '$220',
    startDate: '2023-12-20',
    rating: 4.7
  }
];

const TourPage = () => {

  return (
    <TourShowing tours={tours}/>
  );
};

export default TourPage;