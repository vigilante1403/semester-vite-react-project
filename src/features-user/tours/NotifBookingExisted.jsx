import { Typography } from "@mui/material";
import { format } from "date-fns";
import styled from "styled-components";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
const StyledNotifBooking=styled.div`
min-width: 40vw;
`
const StyledTypo=styled(Typography)`

`
const StyledBooking=styled.div`
display:flex;
flex-direction: column;
padding: 2rem;
border:1px solid var(--color-grey-500);
`
const StyledButtonGroup=styled.div`
display: flex;
justify-content: flex-end;
column-gap: 2rem;
`
function NotifBookingExisted({onSetAgreement,bookings,onOpen}) {
    const navigate=useNavigate()
    const booking=bookings[0];
    const handleAgree=()=>{
        onSetAgreement(prev=>true);
        onOpen(prev=>`book-tour-${booking.tour.id}`)
    }
    console.log(bookings);
    return (
        <StyledNotifBooking>
            <StyledTypo fontSize={24}>You have {bookings.length} upcoming-booking</StyledTypo>
            <StyledBooking>
                <StyledTypo fontSize={18}>{booking.tour.name}</StyledTypo>
                <StyledTypo fontSize={16}>Tickets: {booking.numJoin}</StyledTypo>
                <StyledTypo fontSize={16} fontStyle={"italic"}>Start on: {format(new Date(booking.startDate.replace('ICT', '+0700')), 'MMM dd yyyy')}</StyledTypo>
                
            </StyledBooking>
            <StyledTypo onClick={()=>navigate('/user/bookings')} fontSize={12} color={"CaptionText"} style={{ cursor:'pointer' }}>View Details...</StyledTypo>
            <StyledButtonGroup>
                <Button variation="secondary" onClick={()=>navigate('/user/bookings')}>View my bookings</Button>
                <Button variation="primary" onClick={()=>handleAgree()}>Ok I know</Button>
            </StyledButtonGroup>
        </StyledNotifBooking>
    )
}

export default NotifBookingExisted
