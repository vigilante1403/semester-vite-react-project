import styled from 'styled-components';
import { format, isToday } from 'date-fns';

import Tag from '../../ui/Tag';
import Table from '../../ui/Table';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';

import { formatCurrency, isBeforeOrAfter } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';
import CreateBookingForm from '../bookings/CreateBookingForm';
import Menus from '../../ui/Menus';
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiPencil,
  HiTrash,
} from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { useDeleteBooking } from './useDeleteBooking';
import { useCancelBookingById } from './useBookings';

import CheckoutButton from '../../features-user/tours/CheckoutButton';
import { AdminContext } from '../../ui/ProtectedRouteAdmin';
import { useContext } from 'react';


const Tour = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    // created_at,
    startDate,
    // endDate,
    // numNights,
    // numGuests,
    priceOrigin,
    priceDiscount,
    priceFinal,
    paid,
    numJoin,
    user: { name: guestName, email, id: userid },
    tour: { name: tourName, id: tourId,summary },
    status,
    sessionId,creationTime
  },
  require = null,
}) {
  var valueAuthenticated=useContext(AdminContext)
  const booking = {
    id: bookingId,
    startDate,
    priceOrigin,
    priceDiscount,
    priceFinal,
    paid,
    user: { name: guestName, email, id: userid },
    tour: { name: tourName, id: tourId,summary },
    numJoin,
    status,
    sessionId,creationTime
  };

  var isAdmin;
  var isLeadGuide;
  var canEdit;
  var canDelete;
  if(valueAuthenticated!=null){
  
   
    isAdmin = valueAuthenticated.user.authorities.some(role => role.authority === 'ADMIN')
    isLeadGuide = valueAuthenticated.user.authorities.some(role => role.authority === 'LEADGUIDE')
    canEdit = isAdmin||isLeadGuide
    canDelete = isAdmin
   
  }
  
  const tour = {
    id:tourId,
    price:priceOrigin,
    priceDiscount:priceDiscount,
    name:tourName,
    summary
    
  }
  const paidValue = paid ? 'paid' : 'unpaid';
  const statusToTagName = {
    unpaid: 'blue',
    paid: 'green',
  };

  const activeStatus = {
    active: 'yellow',
    inactive: 'grey',
  };
  const dateStr = format(
    new Date(startDate.replace('ICT', '+0700')),
    'yyyy-MM-dd'
  ).toString();

  const valid =
    isBeforeOrAfter(dateStr) === 'after' ||
    isBeforeOrAfter(dateStr) === 'equal';
  const navigate = useNavigate();

  const { deleteBooking, isDeleting } = useDeleteBooking();
  const { cancelBooking, isCanceling } = useCancelBookingById();
  console.log(booking)
  
  return (
    <Table.Row>
      <Tour>{tourName}</Tour>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}{' '}
          &rarr; 1 day travel
        </span>
        <span>
          {format(new Date(startDate.replace('ICT', '+0700')), 'MMM dd yyyy')}{' '}
          &mdash;{' '}
          {format(new Date(startDate.replace('ICT', '+0700')), 'MMM dd yyyy')}
        </span>
      </Stacked>
      <Amount>
        {formatCurrency(priceFinal)}&nbsp;&nbsp;
        <Tag type={statusToTagName[paidValue]}>{paidValue}</Tag>
      </Amount>
      <Tag type={activeStatus[status ? 'active' : 'inactive']}>
        {status ? 'Active' : 'Inactive'}
      </Tag>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId}></Menus.Toggle>
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/admin/bookings/${bookingId}`)}
            >
              See details
            </Menus.Button>
            {paidValue === 'unpaid' && !require && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/admin/checkins/${bookingId}`)}
              >
                Paid bill
              </Menus.Button>
            )}
            {paidValue === 'unpaid' && require && (
              <CheckoutButton tour={tour} bill={booking} payAfter={true} />
            )}
            {paidValue === 'paid' && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                // disable={isCheckingOut}
                // onClick={() => {
                //   checkout(bookingId);
                // }}
              >
                Get ticket
              </Menus.Button>
            )}
            {valid && status === true && (
              <Modal.Open opens={`cancel-booking-${bookingId}`}>
                <Menus.Button icon={<HiArrowDownOnSquare />}>
                  Cancel booking
                </Menus.Button>
              </Modal.Open>
            )}
            {(canEdit || require == null) && (
              <>
                <Modal.Open opens={`edit-${bookingId}`}>
                  <Menus.Button icon={<HiPencil />}>Edit booking</Menus.Button>
                </Modal.Open>
                {canDelete && (
                  <Modal.Open opens={`delete-${bookingId}`}>
                    <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
                  </Modal.Open>
                )}
              </>
            )}
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name={`delete-${bookingId}`}>
          <ConfirmDelete
            onConfirm={() => {
              deleteBooking(bookingId);
            }}
            disabled={isDeleting}
            resourceName={bookingId}
          />
        </Modal.Window>
        <Modal.Window name={`edit-${bookingId}`}>
          <CreateBookingForm editBooking={booking} />
        </Modal.Window>
        <Modal.Window name={`cancel-booking-${bookingId}`}>
          <ConfirmDelete
            onConfirm={() => {
              cancelBooking({ bookingId: bookingId });
            }}
            disabled={isCanceling}
            resourceName="booking"
            action="cancel"
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
