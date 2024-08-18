import styled from "styled-components";
// import BookingDataBox from "../../features/bookings/BookingDataBox";
import {useCheckin} from "./useCheckin"


import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { useBookingById,  } from "../bookings/useBookings";
import BookingDataBox from "../bookings/BookingDataBox";
import Modal from "../../ui/Modal";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid,setConfirmPaid]=useState(false);
  const {booking,isLoading} = useBookingById();
  useEffect(()=>{
    setConfirmPaid(booking?.paid||false)
  },[booking])
  console.log(confirmPaid)
  const moveBack = useMoveBack();
  const {checkin,isCheckingIn}=useCheckin();
 
 
  if(isLoading) return <Spinner />
  const {id,tour,user,date}=booking
 
  function handleCheckin() {
    if(!confirmPaid) return;
    
      checkin(
        //formData
      )
    
   
  }
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox disabled={confirmPaid||isCheckingIn} checked={confirmPaid} onChange={()=>setConfirmPaid(confirm=>!confirm)}>I confirm that {user.name} has paid the total amount of you privacy </Checkbox>
      </Box>

      <ButtonGroup>
      <Modal>
      <Modal.Open opens={`edit-${booking.id}`}>
      <Button disabled={!confirmPaid||isCheckingIn}>Check in booking #{id}</Button>
            </Modal.Open>
      <Modal.Window name={`edit-${bookingId}`}>
          <CreateBookingForm editBooking={booking} />
        </Modal.Window>
      
      </Modal>
        {/* <Button disabled={!confirmPaid||isCheckingIn} onClick={handleCheckin}>Check in booking #{id}</Button> */}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
