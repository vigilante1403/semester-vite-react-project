/* eslint-disable react/prop-types */
import styled from 'styled-components';
import Table from '../../ui/Table';
import Modal from '../../ui/Modal';
import BillModal from './BillModal';
import Button from '../../ui/Button';

const UserEmail = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const BookingName = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const PaidAt = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-grey-500);
  font-family: 'Sono';
`;

function BillRow({ bill }) {
  const { userEmail, booking, paidAt, id } = bill;

  return (
    <Modal>
      <Modal.Open opens={`bill-${id}`}>
      <div style={{ cursor:'pointer' }}>
        <Table.Row>
          <UserEmail>{userEmail}</UserEmail>
          <BookingName>{booking.tour.name}</BookingName>
          <PaidAt>
            {paidAt ? new Date(paidAt).toLocaleDateString() : 'N/A'}
          </PaidAt>
        </Table.Row>
        </div>
      </Modal.Open>
      <Modal.Window name={`bill-${id}`}>
        <BillModal selectedPayment={bill} />
      </Modal.Window>
    </Modal>
  );
}

export default BillRow;
