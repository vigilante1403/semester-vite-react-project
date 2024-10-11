import { HiEye, HiTrash } from 'react-icons/hi2';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import Table from '../../ui/Table';
import { formatCurrency } from '../../utils/helpers';
import styled from 'styled-components';
import { useContext } from 'react';
import { AdminContext } from '../../ui/ProtectedRouteAdmin';
import BillModal from '../dashboard/BillModal';
const Bill = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;
const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;
function BillRow({ bill }) {
  const valueAuthenticated = useContext(AdminContext);
  const { id, userEmail, bookingId, paidAt, booking } = bill;
  var isAdmin;
  var canEdit;
  var canDelete;
  if (valueAuthenticated != null) {
    isAdmin = valueAuthenticated.user.authorities.some(
      (role) => role.authority === 'ADMIN'
    );
    canEdit = isAdmin;
    canDelete = isAdmin;
  }
  return (
    <Table.Row>
      <Img
        src={
          'https://png.pngtree.com/element_our/png/20181226/invoice-vector-icon-png_277443.jpg'
        }
      />
      <Bill>{id.substring(0, 7)}...</Bill>
      <span>{userEmail.substring(0, 7)}...</span>
      <Price>{formatCurrency(booking.priceFinal)}</Price>
      <span>{booking.id.substring(0, 7)}...</span>
      <span>{paidAt}</span>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />
            <Menus.List id={id}>
            <Modal.Open opens={`bill-${id}`}>
              <Menus.Button onClick={() => {}} icon={<HiEye />}>
                See details
              </Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>
          <Modal.Window name={`bill-${id}`}>
            <BillModal selectedPayment={bill} />
          </Modal.Window>
       
        </Modal>
      </div>
    </Table.Row>
  );
}

export default BillRow;
