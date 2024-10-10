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
import CreateBookingForm from "../bookings/CreateBookingForm";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid,setConfirmPaid]=useState(false);
  const {booking,isLoading} = useBookingById({bookIdIni:null});
  useEffect(()=>{
    setConfirmPaid(booking?.paid||false)
  },[booking])
  console.log(confirmPaid)
  const moveBack = useMoveBack();
  const {checkin,isCheckingIn}=useCheckin();
 
 
  if(isLoading) return <Spinner />
  const {id,tour,user,date,paid}=booking
 console.log(booking)
 
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {isCheckingIn&&<Box>
        <Checkbox disabled={confirmPaid||isCheckingIn} checked={confirmPaid} onChange={()=>setConfirmPaid(confirm=>!confirm)}>I confirm that {user.name} has paid the total amount of you privacy </Checkbox>
      </Box>}

      <ButtonGroup>
      <Modal>
      {isCheckingIn&&<Modal.Open opens={`edit-${booking.id}`}>
      <Button disabled={!confirmPaid||isCheckingIn} >Paid by cash booking #{id}</Button>
            </Modal.Open>}
      <Modal.Window name={`edit-${booking.id}`}>
          <CreateBookingForm editBooking={booking} fixedStart={booking.startDate} fixed={true} />
        </Modal.Window>
      
      </Modal>
     
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;