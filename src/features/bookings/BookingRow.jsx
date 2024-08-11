import styled from 'styled-components';
import { format, isToday } from 'date-fns';

import Tag from '../../ui/Tag';
import Table from '../../ui/Table';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';

import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';
import CreateBookingForm from '../bookings/CreateBookingForm'
import Menus from '../../ui/Menus';
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiPencil,
  HiTrash,
} from 'react-icons/hi2';
import {  useNavigate } from 'react-router-dom';
import { useDeleteBooking } from './useDeleteBooking';

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
    user: { name: guestName, email },
    tour: { name: tourName },
  },
}) {
  const booking = {
    id: bookingId,
    startDate,
    priceOrigin,
    priceDiscount,
    priceFinal,
    user: { name: guestName, email },
    tour: { name: tourName },
  }
  const paidValue = paid?'paid':'unpaid'
  const statusToTagName = {
    unpaid: 'blue',
    paid: 'green',
    // 'checked-out': 'silver',
  };
  const navigate = useNavigate();
  // const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  console.log(booking.startDate)
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
          &rarr;  1 day travel
        </span>
        <span>
            
          {format(new Date(startDate.replace('ICT', '+0700')), 'MMM dd yyyy')} &mdash;{' '}
          {format(new Date(startDate.replace('ICT', '+0700')), 'MMM dd yyyy')}
        </span>
      </Stacked>

      <Tag type={statusToTagName[paidValue]}>{paidValue}</Tag>

      <Amount>{formatCurrency(priceFinal)}</Amount>
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
            {paidValue === 'unpaid' && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/admin/checkins/${bookingId}`)}
              >
                Paid bill
              </Menus.Button>
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
            <Modal.Open opens={`edit-${bookingId}`}>
              <Menus.Button icon={<HiPencil />}>Edit booking</Menus.Button>
            </Modal.Open>
            <Modal.Open opens={`delete-${bookingId}`}>
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Modal.Open>
            
            
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name={`delete-${bookingId}`}>
              <ConfirmDelete
                onConfirm={() => {deleteBooking(bookingId)}}
                disabled={isDeleting}
                resourceName={bookingId}
              />
            </Modal.Window>
            <Modal.Window name={`edit-${bookingId}`}>
              <CreateBookingForm editBooking={booking} />
            </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;