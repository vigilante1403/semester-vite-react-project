import React, { useContext } from 'react';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';
import Spinner from '../../ui/Spinner';
import Pagination from '../../ui/Pagination';
import { useBookingsTotal } from './useBookings';
import BookingRow from './BookingRow';
import { PAGE_SIZE } from '../../utils/constants';
import { useSearchParams } from 'react-router-dom';

function BookingTable({
  searchTour = null,
  require = null,
  select = null,
  review = false,
}) {
  const [searchParams] = useSearchParams();
  var { bookings, isLoading } = useBookingsTotal();

  if (isLoading) return <Spinner />;
  if (!bookings) return <Empty resourceName="bookings" />;

  // Xử lý lọc theo trạng thái
  const filterStatus = searchParams.get('status') || 'all';
  if (require) bookings = require;

  if (select && select !== 'all') {
    bookings = bookings.filter(select);
  }
  if (searchTour) {
    if (
      searchParams.get('tour') !== 'all' &&
      searchParams.get('tour') !== '' &&
      searchParams.get('tour') !== null
    ) {
      // var filteredBookings = [];
      var tempBookings = bookings;

      bookings = tempBookings.filter((booking) => {
        const name = booking.tour.name.toLowerCase();
        console.log(booking.tour);

        return name.startsWith(searchTour) ? name : null;
      });
    }
  }
  let filteredBookings = bookings;

  if (filterStatus !== 'all') {
    filteredBookings = filteredBookings.filter((booking) => {
      // Xác định trạng thái từ booking
      const isPaid = booking.paid === true;
      return filterStatus === 'paid' ? isPaid : !isPaid;
    });
  }
  function convertToValidDate(dateStr) {
    const months = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      May: '05',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sep: '09',
      Oct: '10',
      Nov: '11',
      Dec: '12',
    };

    // Tách chuỗi dựa trên khoảng trắng
    const parts = dateStr.split(' ');

    // Tạo chuỗi định dạng YYYY-MM-DD
    const day = parts[2];
    const month = months[parts[1]];
    const year = parts[5];

    return `${year}-${month}-${day}`;
  }
  const sortBy = searchParams.get('sortBy') || 'startDate-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  let sortedBookings = filteredBookings.sort((a, b) => {
    if (field === 'totalPrice') {
      return (a.priceFinal - b.priceFinal) * modifier;
    }
    // Sort by date for startDate
    if (field === 'startDate') {
      const dateA = new Date(convertToValidDate(a.startDate));
      const dateB = new Date(convertToValidDate(b.startDate));
      return modifier * (dateA - dateB);
    }

    if (field === 'name') {
      return modifier * a.tour.name.localeCompare(b.tour.name);
    }
    // Sort by totalPrice (numerical)
    console.log(a[field]);
    // Default case if field is not recognized (optional)
    return modifier * a.tour.name.localeCompare(b.tour.name);
  });
  // Xử lý phân trang
  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = currentPage * PAGE_SIZE;
  const paginatedBookings = filteredBookings.slice(startIndex, endIndex);

  if (!paginatedBookings.length) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Tour</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Amount</div>
          <div>{!review ? 'Status' : 'Action'}</div>

          <div></div>
        </Table.Header>
        <Table.Body
          data={paginatedBookings}
          render={(booking) => (
            <BookingRow
              review={review}
              booking={booking}
              key={booking.id}
              require={select}
            />
          )}
        />
        <Table.Footer>
        <Pagination count={sortedBookings.length} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
