import React, { useContext, useState } from "react";
import { Box, Tabs, Tab, Typography, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useBookingsOfUser } from "./useBookings";
import Spinner from "../../ui/Spinner";
import BookingTable from '../../features/bookings/BookingTable'
import { UserContext } from "../../ui/userLayout/ProtectedRouteUser";
import {format} from 'date-fns'
import { isBeforeOrAfter } from "../../utils/helpers";
import Searchbar from "../../ui/Searchbar";
import { useSearchParams } from "react-router-dom";

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
const customString = [
  booking=>booking.paid===false&&booking.status===true,
  booking=>{
    const dateStr = format(new Date(booking.startDate.replace('ICT', '+0700')), 'yyyy-MM-dd').toString()
    const valid = isBeforeOrAfter(dateStr) === 'after'
    
    return valid&&booking.status===true&&booking.paid===true?booking:null
  },
  booking=>{
    const dateStr = format(new Date(booking.startDate.replace('ICT', '+0700')), 'yyyy-MM-dd').toString()
    const valid = isBeforeOrAfter(dateStr) === 'equal'
    
    return valid&&booking.status===true&&booking.paid===true?booking:null
  },
  booking=>{
    const dateStr = format(new Date(booking.startDate.replace('ICT', '+0700')), 'yyyy-MM-dd').toString()
    const valid = isBeforeOrAfter(dateStr) === 'before'
    
    return valid&&booking.status===true&&booking.paid===true?booking:null
  },
  booking=>booking.status===false


]
const MyBookings = () => {
  
  
  const {user}=useContext(UserContext)

  const {bookings,isLoading}=useBookingsOfUser(user.id)
  const [value, setValue] = useState(0);
  const [select,setSelect]=useState('all');
  const [searchParams,setSearchParams]= useSearchParams();
  const [searchTour,setSearchTour]=useState(searchParams.get('tour') ?? '');

   

  const handleSearch = (data) => {
    if(data.trim()===''){
      searchParams.delete('tour')
      setSearchTour('');
      setSearchParams(searchParams)
     
      return;

    }
    const newData = data.toLowerCase();
    setSearchTour(newData);
    searchParams.set('tour', newData);
    setSearchParams(searchParams);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  if(isLoading) return <Spinner />
  
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
        <Tab label="All Bookings" onClick={()=>setSelect(prev=>'all')}  custom={null} {...a11yProps(0)} sx={{ color: 'var(--color-grey-800)', fontWeight: 'bold' }} />
        <Tab label="Waiting Payment" onClick={()=>setSelect(prev=>customString[0])} {...a11yProps(1)} sx={{ color: 'var(--color-grey-800)', fontWeight: 'bold' }} />
        <Tab label="Processing" onClick={()=>setSelect(prev=>customString[1])} {...a11yProps(2)} sx={{ color: 'var(--color-grey-800)', fontWeight: 'bold' }} />
        <Tab label="Traveling" onClick={()=>setSelect(prev=>customString[2])} custom={4} {...a11yProps(3)} sx={{ color: 'var(--color-grey-800)', fontWeight: 'bold' }} />
        <Tab label="Completed Bookings" onClick={()=>setSelect(prev=>customString[3])} custom={5} {...a11yProps(4)} sx={{ color: 'var(--color-grey-800)', fontWeight: 'bold' }} />
        <Tab label="Cancelled Bookings" onClick={()=>setSelect(prev=>customString[4])} custom={6} {...a11yProps(5)} sx={{ color: 'var(--color-grey-800)', fontWeight: 'bold' }} />
      </Tabs>
      <Searchbar placeholder={"Search bookings by Booking name"}  text={searchTour} onChangeText={handleSearch}/>
      <TabPanel value={value} index={value} >
        {bookings&&bookings.length>0&&<BookingTable searchTour={searchTour} require={bookings} select={select}  />}
        {(!bookings||bookings.length===0)&& <p>No booking to show</p>}
      </TabPanel>
      
    </Box>
  );
};

export default MyBookings;