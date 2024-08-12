import React from 'react';
import { Box, Container, Grid, useMediaQuery, useTheme } from '@mui/material';
import TourShowing from '../../features-user/tours/TourShowing';
import { useTours } from '../../features/tours/useTours';
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';
import { useBookingsTotal } from '../../features/bookings/useBookings';
import { useSearchParams } from 'react-router-dom';
import PaginationCustom from '../../ui/userLayout/PaginationCustom';
import { PAGE_SIZES } from '../../utils/constants';

const TourPage = () => {
  const theme = useTheme();
  const isExtraSmall = useMediaQuery(theme.breakpoints.down('xs'));
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'));
  const isMedium = useMediaQuery(theme.breakpoints.up('md'));
  const isSmall = useMediaQuery(theme.breakpoints.up('sm'));

  const PAGE_SIZE = isLarge ? PAGE_SIZES.lg :
                     isMedium ? PAGE_SIZES.md :
                     isSmall ? PAGE_SIZES.sm :
                     isExtraSmall ? PAGE_SIZES.xs :
                     PAGE_SIZES.xs; 

  const [searchParams] = useSearchParams();
  const { tours, isLoading } = useTours();
  const { bookings, isLoading: isBookingLoading } = useBookingsTotal();

  if (isLoading || isBookingLoading) return <Spinner />;
  if (!tours) return <Empty resourceName="tours" />;

  const currentPage = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = currentPage * PAGE_SIZE;
  const paginatedTours = tours.slice(startIndex, endIndex);

  if (!paginatedTours.length) return <Empty resourceName="tours" />;

  return (
    <Container>
      <TourShowing tours={paginatedTours} bookings={bookings} />
      <Box sx={{ marginTop: '4rem', marginBottom: '4rem', display: 'flex', justifyContent: 'center' }}>
        <PaginationCustom count={tours.length} pageSize={PAGE_SIZE} />
      </Box>
    </Container>
  );
};

export default TourPage;