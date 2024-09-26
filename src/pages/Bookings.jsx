import Row from '../ui/Row';
import Heading from '../ui/Heading'
import BookingTable from '../features/bookings/BookingTable';

import BookingTableOperations from '../features/bookings/BookingTableOperations';
import AddBooking from '../features/bookings/AddBooking';
import Searchbar from '../ui/Searchbar';
import { createContext, useState } from 'react';
import { useBookingsTotal } from '../features/bookings/useBookings';
import { useSearchParams } from 'react-router-dom';
import Spinner from '../ui/Spinner';

export const BookingContext=createContext();

function Bookings() {
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
  
  return (
        <>
        <Row type="horizontal">
          <Heading as="h1">All bookings</Heading>
          <BookingTableOperations/>
        </Row>
        <Row>
        <Searchbar placeholder={"Search bookings by Booking name"} text={searchTour} onChangeText={handleSearch}/>
         <BookingTable searchTour={searchTour}/>
         <AddBooking/>
          
        </Row>
      </>
    )
}

export default Bookings
