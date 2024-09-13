import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const MyBookings = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", backgroundColor: 'var(--color-grey-0)', color: 'var(--color-grey-800)' }}>
      <Typography 
        variant="h5" 
        sx={{ 
          marginBottom: '2rem', 
          paddingTop: '2rem', 
          textAlign: 'center', 
          fontWeight: 'bold',
          fontSize: '3rem' 
        }}
      >
        My Bookings
      </Typography>
      <Tabs 
        value={value} 
        onChange={handleChange} 
        aria-label="booking tabs"
        sx={{ 
          borderBottom: '0.1rem solid var(--color-grey-300)', 
          '& .MuiTabs-flexContainer': {
            justifyContent: 'space-between', 
          },
          '& .MuiTab-root': {
            fontSize: '1.25rem',
          },
        }}
      >
        <Tab label="All Bookings" {...a11yProps(0)} sx={{ color: 'var(--color-grey-800)', fontWeight: 'bold' }} />
        <Tab label="Waiting Payment" {...a11yProps(1)} sx={{ color: 'var(--color-grey-800)', fontWeight: 'bold' }} />
        <Tab label="Processing" {...a11yProps(2)} sx={{ color: 'var(--color-grey-800)', fontWeight: 'bold' }} />
        <Tab label="Traveling" {...a11yProps(3)} sx={{ color: 'var(--color-grey-800)', fontWeight: 'bold' }} />
        <Tab label="Completed Bookings" {...a11yProps(4)} sx={{ color: 'var(--color-grey-800)', fontWeight: 'bold' }} />
        <Tab label="Cancelled Bookings" {...a11yProps(5)} sx={{ color: 'var(--color-grey-800)', fontWeight: 'bold' }} />
      </Tabs>
      <Box sx={{ p: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search bookings by Booking name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'var(--color-grey-800)' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'var(--color-grey-100)',
            },
            '& .MuiInputBase-input': {
              color: 'var(--color-grey-800)',
            },
            '& .MuiInputLabel-root': {
              color: 'var(--color-grey-800)',
            },
          }}
        />
      </Box>
      <TabPanel value={value} index={0}>
        No bookings available
      </TabPanel>
      <TabPanel value={value} index={1}>
        No bookings waiting for payment
      </TabPanel>
      <TabPanel value={value} index={2}>
        No bookings in processing
      </TabPanel>
      <TabPanel value={value} index={3}>
        No bookings in traveling
      </TabPanel>
      <TabPanel value={value} index={4}>
        No bookings completed
      </TabPanel>
      <TabPanel value={value} index={5}>
        No bookings cancelled
      </TabPanel>
    </Box>
  );
};

export default MyBookings;