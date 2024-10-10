import styled from "styled-components";
import { HiArrowUpOnSquare } from "react-icons/hi2";

// import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from '../../ui/Spinner'

import { useMoveBack } from "../../hooks/useMoveBack";
// import { useBooking } from "./useBooking";
import { useNavigate } from "react-router-dom";
// import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";
import { useBookingById } from "./useBookings";
import BookingDataBox from "./BookingDataBox";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate=useNavigate()
  const {booking,isLoading} = useBookingById({bookIdIni:null});
  const {deleteBooking,isDeleting}=useDeleteBooking()
  const moveBack = useMoveBack();

  const statusToTagName = {
   
    "unpaid": "blue",
    "paid": "green",
  };
  if(isLoading||isDeleting) return <Spinner />
  if(!booking) return <Empty resourceName="booking"/>
  const {paid,id}=booking;
  const paidValue = paid?'paid':'unpaid';
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[paid]}>{paid}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
      <Modal>
      <Modal.Open opens='delete'>
      <Button variation='danger'>Delete</Button>
      </Modal.Open>
      <Modal.Window name='delete'>
        <ConfirmDelete onConfirm={()=>deleteBooking(id,{onSettled:navigate('/admin/bookings')})} disabled={isDeleting} resourceName={id}/>
      </Modal.Window>
      
      </Modal>
      {paidValue==='unpaid'&&<Button onClick={()=>navigate(`/admin/checkins/${id}`)}>Check in</Button>}
      {paidValue==='paid'&&<Button icon ={<HiArrowUpOnSquare/>} disable={true} onClick={()=>{}}>Check out</Button>}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;