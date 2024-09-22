import React, { createContext, useContext, useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { UserContext } from '../../ui/userLayout/ProtectedRouteUser';
import { useReviewsOfUser } from './useReviews';
import Spinner from '../../ui/Spinner';
import ReviewsTable from './ReviewsTable';
import Searchbar from '../../ui/Searchbar';
import { useBookingsOfUser } from '../bookings/useBookings';
import BookingTable from '../../features/bookings/BookingTable';
import { format } from 'date-fns';
import { isBeforeOrAfter } from '../../utils/helpers';
import { useSearchParams } from 'react-router-dom';
import { getAllReviewsOfSpecificUser } from '../../services/apiReviews';


const customString = [
  (booking) => booking.paid === false && booking.status === true,
  (booking) => booking.paid === true && booking.status === true,
  (booking) => {
    const dateStr = format(
      new Date(booking.startDate.replace('ICT', '+0700')),
      'yyyy-MM-dd'
    ).toString();
    const valid = isBeforeOrAfter(dateStr) === 'equal';

    return valid && booking.status === true && booking.paid === true
      ? booking
      : null;
  },
  (booking) => {
    const dateStr = format(
      new Date(booking.startDate.replace('ICT', '+0700')),
      'yyyy-MM-dd'
    ).toString();
    const valid = isBeforeOrAfter(dateStr) === 'before';

    return valid && booking.status === true && booking.paid === true
      ? booking
      : null;
  },
  (booking) => booking.status === false,
];
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography sx={{ fontSize: '1.5rem' }}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export const ReviewContext = createContext();
const Reviews = ({onSetKey}) => {
  const { user, } = useContext(UserContext);
 
  const { reviews, isLoading,refetch } = useReviewsOfUser(user.id);
  let [filteredReviews,setFilteredReviews]=useState([])
  const { bookings, isLoading: isLoading2 } = useBookingsOfUser(user.id);
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(0);
  const [select, setSelect] = useState('review');
  const [searchTour, setSearchTour] = useState(searchParams.get('tour') ?? '');

  const handleReload=()=>{
    onSetKey()
    // setFilteredReviews(prev=>[])
    

  }

 
  const handleChange = (event, newValue) => {
    setValue(newValue);
    refetch()
  };
  if (isLoading || isLoading2) return <Spinner />;
  if (!reviews) return <Spinner />;

  
  if (searchParams.get('tour') !== 'all' && searchParams.get('tour') !== '' && searchParams.get('tour')!==null) {
    filteredReviews = [];
    var tempReviews = reviews;

    filteredReviews = tempReviews.filter((review) => {
      const name = review.tourName.toLowerCase();
      
      return name.startsWith(searchTour) ? name : null;
    });
    
  } else {
    
    // filteredReviews = [];
    
    // filteredReviews = reviews;
    if(filteredReviews.length===0){
      
      filteredReviews=reviews
    }
    // console.log('filter reviews',filteredReviews)
  }
  const handleSearch = (data) => {
    if(data.trim()===''){
      searchParams.delete('tour')
      setSearchParams(searchParams)
      filteredReviews=reviews
      return;

    }
    const newData = data.toLowerCase();
    setSearchTour(newData);
    searchParams.set('tour', newData);
    setSearchParams(searchParams);
  };
  let reviewsToursId;
  if (reviews !== undefined) {
    reviewsToursId = reviews.map((review) => {
      return review.tourId;
    });
   
  }

  let filteredBooking = [];
  if (bookings !== undefined) {
    filteredBooking = bookings.filter((booking) => {
      
      const isExist =
        reviewsToursId.filter((id) => id === booking.tour.id).length > 0;
      return !isExist ? booking : null;
    });
   
  }
  return (
    <ReviewContext.Provider value={{ filteredReviews,handleReload }}>
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'var(--color-grey-0)',
        color: 'var(--color-grey-800)',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginBottom: '2rem',
          paddingTop: '2rem',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '3rem',
        }}
      >
        My Reviews
      </Typography>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="booking tabs"
        sx={{
          borderBottom: '0.1rem solid var(--color-grey-300)',
          '& .MuiTabs-flexContainer': {
            justifyContent: 'center',
          },
          '& .MuiTab-root': {
            fontSize: '1.5rem',
          },
        }}
      >
        <Tab
          label="Reviewed Tours"
          custom={null}
          {...a11yProps(0)}
          sx={{
            color: 'var(--color-grey-800)',
            fontWeight: 'bold',
            width: '100%',
          }}
          onClick={() => setSelect('review')}
        />
        <Tab
          label="Waiting For Reviews"
          {...a11yProps(1)}
          sx={{
            color: 'var(--color-grey-800)',
            fontWeight: 'bold',
            width: '100%',
          }}
          onClick={() => setSelect((prev) => customString[1])}
        />
      </Tabs>
      <Searchbar
        placeholder={'Search review by tour name'}
        text={searchTour}
        onChangeText={handleSearch}
      />
      <TabPanel value={value} index={value}>
        {filteredReviews &&
          filteredReviews.length > 0 &&
          select === 'review' && <ReviewsTable  />}
        {(!filteredReviews || filteredReviews.length === 0) &&
          select === 'review' && <p>No review to show</p>}
        {select !== 'review' && (
          <BookingTable require={filteredBooking} select={select} review />
        )}
      </TabPanel>
    </Box>
    </ReviewContext.Provider>
  );
};

export default Reviews;
