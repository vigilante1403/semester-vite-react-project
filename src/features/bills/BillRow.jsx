import { HiEye, HiTrash } from "react-icons/hi2";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table"
import { formatCurrency } from "../../utils/helpers";
import styled from "styled-components";
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
function BillRow({bill}) {
    const {
        id,
       userEmail,
       bookingId,
       paidAt,booking
      } = bill;
    return (
        <Table.Row>
      <Img
        src={'https://png.pngtree.com/element_our/png/20181226/invoice-vector-icon-png_277443.jpg'}
      />
      <Bill>{id.substring(0,7)}...</Bill>
      <span>{userEmail.substring(0,7)}...</span>
      <Price>{formatCurrency(booking.priceFinal)}</Price>
      <span>{(booking.id).substring(0,7)}...</span>
      <span>{paidAt}</span>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />
            <Menus.List id={id}>
             

              <Menus.Button
                onClick={() => {}}
                icon={<HiEye />}
              >
                See details
              </Menus.Button>
              
                <Modal.Open opens={`delete-${id}`}>
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
           
            </Menus.List>
          </Menus.Menu>
          <Modal.Window name={`edit-${id}`}>
            
          </Modal.Window>
          <Modal.Window name={`delete-${id}`}>
            
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
    )
}

export default BillRow
