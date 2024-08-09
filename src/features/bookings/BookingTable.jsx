
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from '../../ui/Empty'

import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import { useBookingsTotal } from "./useBookings";
import BookingRow from "./BookingRow";

function BookingTable() {
  const {bookings,isLoading}=useBookingsTotal()
  if(isLoading) return <Spinner />
  if(!bookings) return <Empty resourceName='bookings' />
  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Tour</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>
          <Table.Body data={bookings} render={(booking)=><BookingRow booking={booking} />} />
      
        <Table.Footer>
          <Pagination  count={bookings.length} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
