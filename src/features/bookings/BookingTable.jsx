import React from 'react';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';
import Spinner from '../../ui/Spinner';
import Pagination from '../../ui/Pagination';
import { useBookingsTotal } from './useBookings';
import BookingRow from './BookingRow';
import { PAGE_SIZE } from '../../utils/constants';
import { useSearchParams } from 'react-router-dom';

function BookingTable({require=null,select=null}) {
  const [searchParams] = useSearchParams();
  var { bookings, isLoading } = useBookingsTotal();

  if (isLoading) return <Spinner />;
  if (!bookings) return <Empty resourceName='bookings' />;
  
  // Xử lý lọc theo trạng thái
  const filterStatus = searchParams.get('status') || 'all';
  if(require) bookings=require
  
  if(select&&select!=='all'){
    bookings=bookings.filter(select)
  }
  let filteredBookings = bookings;

  if (filterStatus !== 'all') {
    filteredBookings = filteredBookings.filter((booking) => {
      // Xác định trạng thái từ booking
      const isPaid = booking.paid === true;
      return filterStatus === 'paid' ? isPaid : !isPaid;
    });
  }

  // Xử lý phân trang
  const currentPage = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = currentPage * PAGE_SIZE;
  const  paginatedBookings = filteredBookings.slice(startIndex, endIndex);

  if (!paginatedBookings.length) return <Empty resourceName='bookings' />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Tour</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Amount</div>
          <div>Status</div>
          
          <div></div>
        </Table.Header>
        <Table.Body
          data={paginatedBookings}
          render={(booking) => <BookingRow booking={booking} key={booking.id} require={select} />}
        />
        <Table.Footer>
          <Pagination count={filteredBookings.length} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;