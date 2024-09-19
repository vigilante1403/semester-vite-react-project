import Row from '../ui/Row';
import Heading from '../ui/Heading'
import BookingTable from '../features/bookings/BookingTable';

import BookingTableOperations from '../features/bookings/BookingTableOperations';
import AddBooking from '../features/bookings/AddBooking';
import Searchbar from '../ui/Searchbar';
function Bookings() {
    return (
        <>
        <Row type="horizontal">
          <Heading as="h1">All bookings</Heading>
          <BookingTableOperations/>
        </Row>
        <Row>
        <Searchbar placeholder={"Search bookings by Booking name"} />
         <BookingTable/>
         <AddBooking/>
          
        </Row>
      </>
    )
}

export default Bookings
