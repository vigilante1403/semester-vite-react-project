import styled from "styled-components";
import { HiArrowUpOnSquare } from "react-icons/hi2";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from '../../ui/Spinner'

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate=useNavigate()
  const {booking,isLoading} = useBooking();
  const {checkout,isCheckingOut}=useCheckout()
  const {deleteBooking,isDeleting}=useDeleteBooking()
  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  if(isLoading||isDeleting||isCheckingOut) return <Spinner />
  if(!booking) return <Empty resourceName="booking"/>
  const {status,id}=booking;
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
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
        <ConfirmDelete onConfirm={()=>deleteBooking(id,{onSettled:navigate('/bookings')})} disabled={isDeleting} resourceName={id}/>
      </Modal.Window>
      
      </Modal>
      {status==='unconfirmed'&&<Button onClick={()=>navigate(`/checkins/${id}`)}>Check in</Button>}
      {status==='checked-in'&&<Button icon ={<HiArrowUpOnSquare/>} disable={isCheckingOut} onClick={()=>{checkout(id)}}>Check out</Button>}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
