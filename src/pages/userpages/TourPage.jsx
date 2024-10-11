import React, { useState } from 'react';
import {
  Box,
  Grid,
  useMediaQuery,
  useTheme,
  TextField,
  Button,
  InputAdornment,
  Container,
} from '@mui/material';
import TourShowing from '../../features-user/tours/TourShowing';
import { useTours } from '../../features/tours/useTours';
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';
import { useBookingsTotal } from '../../features/bookings/useBookings';
import { useSearchParams } from 'react-router-dom';
import PaginationCustom from '../../ui/userLayout/PaginationCustom';
import { PAGE_SIZES } from '../../utils/constants';
import SearchIcon from '@mui/icons-material/Search';
import Slider from 'react-slick';
import { Typography } from '@mui/material';
import OurPartner from '../../ui/userLayout/OurPartner';
import { useAuthenticate } from '../../features-user/security/useAuthenticate';
import { UserContext } from '../../ui/userLayout/ProtectedRouteUser';
const TourPage = () => {
  const { user, isAuthenticated, isLoading:isLoadingUser } = useAuthenticate()
  const theme = useTheme();
  const isExtraSmall = useMediaQuery(theme.breakpoints.down('xs'));
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'));
  const isMedium = useMediaQuery(theme.breakpoints.up('md'));
  const isSmall = useMediaQuery(theme.breakpoints.up('sm'));

  const PAGE_SIZE = isLarge
    ? PAGE_SIZES.lg
    : isMedium
    ? PAGE_SIZES.md
    : isSmall
    ? PAGE_SIZES.sm
    : isExtraSmall
    ? PAGE_SIZES.xs
    : PAGE_SIZES.xs;

  const [searchParams] = useSearchParams();
  const { tours, isLoading } = useTours();
  // const { bookings, isLoading: isBookingLoading } = useBookingsTotal();

  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState('name');

  if (isLoading || isLoadingUser) return <Spinner />;
  if (!tours) return <Empty resourceName="tours" />;
  const handleDefault = () => {
    setSearchTerm('');
    setMinPrice('');
    setMaxPrice('');
    setSortOrder('name');
  };
  let filteredTours;
  filteredTours = tours.filter((tour) => {
    const price = tour.price;
    const matchesSearch = tour.name
      ? tour.name.toLowerCase().includes(searchTerm.toLowerCase())
      : false;
    const matchesMinPrice = minPrice ? price >= Number(minPrice) : true;
    const matchesMaxPrice = maxPrice ? price <= Number(maxPrice) : true;
    const active = tour.status==='active'
    return matchesSearch && matchesMinPrice && matchesMaxPrice&&active;
  });

  let sortedTours = filteredTours.sort((a, b) => {
    if (sortOrder === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === 'date') {
      return new Date(a.startDate) - new Date(b.startDate);
    } else if (sortOrder === 'low') {
      return a.price - b.price;
    } else if (sortOrder === 'high') {
      return b.price - a.price;
    }
    return 0;
  });
  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = currentPage * PAGE_SIZE;
  const paginatedTours = [...sortedTours].slice(startIndex, endIndex);
  // if (!paginatedTours.length) return <Empty resourceName="tours" />;

  return (
    <Box padding={5}>
      <Grid container spacing={2}>
        {/* Phần Filter */}
        <Grid item xs={12} md={2}>
          <Box
            sx={{
              padding: 2,
              border: '1px solid gray',
              borderRadius: 2,
              backgroundColor: 'inherit',
            }}
          >
            <Box sx={{ marginBottom: 2 }}>
              <h3 style={{ fontSize: '2.3rem' }}>Filter</h3>

              <TextField
                label="Lowest"
                type="number"
                fullWidth
                sx={{ margin: 1 }}
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                InputProps={{
                  sx: { fontSize: '1.5rem' },
                }}
                InputLabelProps={{
                  sx: { fontSize: '1.5rem', color: 'inherit' },
                }}
              />
              <TextField
                label="Highest"
                type="number"
                fullWidth
                sx={{ margin: 1 }}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                InputProps={{
                  sx: { fontSize: '1.5rem' },
                }}
                InputLabelProps={{
                  sx: { fontSize: '1.5rem', color: 'inherit' },
                }}
              />
            </Box>
            <Box>
              <h3 style={{ fontSize: '2.3rem' }}>Sort</h3>

              <Button
                variant="outlined"
                fullWidth
                sx={{ margin: 1, fontSize: '1.2rem' }}
                onClick={() => setSortOrder('name')}
              >
                By Name
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{ margin: 1, fontSize: '1.2rem' }}
                onClick={() => setSortOrder('date')}
              >
                By Date
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{ margin: 1, fontSize: '1.2rem' }}
                onClick={() => setSortOrder('low')}
              >
                Lowest First
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{ margin: 1, fontSize: '1.2rem' }}
                onClick={() => setSortOrder('high')}
              >
                Highest First
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{ margin: 1, fontSize: '1.2rem' }}
                onClick={handleDefault}
              >
                Default
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={10}>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Tìm kiếm"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                sx: { fontSize: '2rem', color: 'inherit' },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ cursor: 'pointer' }}>
                    <SearchIcon />
                  </InputAdornment>
                ),
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value),
              }}
            />
          </Box>

          <Box
            sx={{
              height: '450px',
              overflowY: 'auto',
              border: '1px solid gray',
              borderRadius: 2,
              padding: 2,
            }}
            > <UserContext.Provider value={{ isAuthenticated,user,isLoading }}>
             {paginatedTours && paginatedTours.length > 0 ? <TourShowing tours={paginatedTours}  /> : <Empty resourceName={'tour'} />}
          </UserContext.Provider>
          </Box>

          <Box
            sx={{
              marginTop: '1rem',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <PaginationCustom count={sortedTours.length} pageSize={PAGE_SIZE} />
          </Box>
        </Grid>
      </Grid>
      <OurPartner />
    </Box>
  );
};

export default TourPage;
