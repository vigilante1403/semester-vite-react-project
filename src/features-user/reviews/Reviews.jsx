import React, { useContext, useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { UserContext } from '../../ui/userLayout/ProtectedRouteUser';
import { useReviewsOfUser } from './useReviews';
import Spinner from '../../ui/Spinner';
import ReviewsTable from './ReviewsTable';
import Searchbar from '../../ui/Searchbar';

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

const Reviews = () => {
  const { user } = useContext(UserContext);
  const { reviews, isLoading } = useReviewsOfUser(user.id);

  const [value, setValue] = useState(0);
  const [select, setSelect] = useState('all');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  if (isLoading) return <Spinner />;

  return (
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
        />
        <Tab
          label="Waiting For Reviews"
          {...a11yProps(1)}
          sx={{
            color: 'var(--color-grey-800)',
            fontWeight: 'bold',
            width: '100%',
          }}
        />
      </Tabs>
      <Searchbar placeholder={'Search review by tour name'} />
      <TabPanel value={value} index={value}>
        {reviews && reviews.length > 0 && <ReviewsTable require={reviews} />}
        {(!reviews || reviews.length === 0) && <p>No review to show</p>}
      </TabPanel>
    </Box>
  );
};

export default Reviews;
