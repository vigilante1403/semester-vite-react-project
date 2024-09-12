import styled from "styled-components";
import { format, isToday, parse } from "date-fns";
// import { utcToZonedTime } from 'date-fns-tz';
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import DataItem from "../../ui/DataItem";
// import { Flag } from "../../ui/Flag";

import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import BookingQRCode from "../../utils/qrCode";
import Button from "../../ui/Button";

const StyledBookingDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.paid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.paid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

// A purely presentational component
function BookingDataBox({ booking }) {
  const {
    id: bookingId,
    startDate,
    priceOrigin,
    priceDiscount,
    priceFinal,
    user: { name: guestName, email },
    tour: { name: tourName },
    numJoin,
    paid
  } = booking;


// const outputFormat = 'yyyy-MM-dd HH:mm:ss';
// const formattedDate = format(new Date(startDate.replace('ICT', '+0700')), outputFormat);

// console.log(formattedDate);
// console.log(startDate)
  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {tourName} 
          </p>
        </div>

        <p>
          {format(new Date(startDate.replace('ICT', '+0700')), "yyyy-MM-dd HH:mm")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          )
        </p>
      </Header>

      <Section>
        <Guest>
        
          <p>
            {guestName}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <p>Number people join: {numJoin}</p>
          <span>&bull;</span>
         
        </Guest>


      

      
        <Price paid={paid}>
        <DataItem icon={<HiOutlineCurrencyDollar />} label={`Origin price`}>
            {formatCurrency(priceOrigin)}

           
          </DataItem>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Discount price`}>
            {formatCurrency(priceDiscount)}

           
          </DataItem>
         
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(priceFinal)}

           
          </DataItem>
          <p>{paid ? "Paid" : "Will pay at property"}</p>
        </Price>
        
      </Section>

      <Footer>
      <Modal>
      <Modal.Open opens="qr-code">
        <Button disabled={!paid}>Get QR code</Button>
      </Modal.Open>
      <Modal.Window name="qr-code">
      <BookingQRCode booking={booking} />
      </Modal.Window>
      </Modal>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;