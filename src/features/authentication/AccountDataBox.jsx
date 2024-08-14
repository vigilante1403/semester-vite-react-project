import styled from 'styled-components';
import { format, isToday } from 'date-fns';
import {
  HiBookOpen,
  HiBriefcase,
  HiCurrencyDollar,
  HiIdentification,
  HiInboxStack,
  HiKey,
  HiMiniPaperAirplane,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
  HiOutlinePhoto,
  HiPaintBrush,
  HiPaperClip,
  HiPencil,
  HiPhoto,
  HiRectangleStack,
  HiUser,
  HiUserGroup,
  HiUsers,
} from 'react-icons/hi2';

import DataItem from '../../ui/DataItem';
import { Flag } from '../../ui/Flag';

import { formatDistanceFromNow, formatCurrency } from '../../utils/helpers';
import Menus from '../../ui/Menus';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import ReviewsData from './ReviewsData';
import ToursData from './ToursData';
import BookingsData from './BookingsData';

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
    font-family: 'Sono';
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
    props.isPaid ? 'var(--color-green-100)' : 'var(--color-yellow-100)'};
  color: ${(props) =>
    props.isPaid ? 'var(--color-green-700)' : 'var(--color-yellow-700)'};

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
const Guides = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
`;
const Guide = styled.div`
  padding: 1rem;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
`;
const Img = styled.img`
  display: ${(props) => (props.circle ? 'inline-block' : 'block')};
  width: 6.4rem;
  aspect-ratio: ${(props) => (props.circle ? '1/1' : '3/2')};
  border-radius: ${(props) => (props.circle ? '50%' : '0')};
  object-fit: ${(props) => (props.circle ? 'fill' : 'cover')};
  object-position: ${(props) => (props.circle ? 'unset' : 'center')};
  transform: scale(0.6);
`;
// A purely presentational component
function AccountDataBox({ user }) {
  const {
    id,
    displayName,
    email,
    photo,
    fullName,
    nationality,
    nationalID,
    countryFlag,
    role,
    createdAt,
    lastLoginDate,
    isActive,
    isNotLocked,
    joinedTours,
    reviews,
    bookings,
  } = user;

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            Created at date: {format(createdAt.split("T")[0],"dd/MM/yyyy")} <span> Display Name: {displayName}</span>
          </p>
        </div>

        <p>
          {/* {format(new Date(startDates[0].replace('ICT', '+0700')), "yyyy-MM-dd HH:mm")} (
          {isToday(new Date(startDates[0]))
            ? "Today"
            : formatDistanceFromNow(startDates[0])}
          ) */}
          {/* ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")} */}
        </p>
      </Header>

      <Section>
        <Guest>
          {countryFlag && (
            <Flag src={countryFlag} alt={`Flag of user ${fullName} country`} />
          )}
          <p>
            {/* {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""} */}
          </p>
          <span>&bull;</span>
          <p><Img circle={true} src={'http://localhost:8080/api/v1/file/image/user/' + photo || ''} /></p>
          <span>&bull;</span>
          <p>Nationality: {nationality}</p>
        </Guest>
        <DataItem icon={<HiUser />} label="Full name">
          <p>{fullName}</p>
        </DataItem>
        <DataItem icon={<HiMiniPaperAirplane />} label="Email">
          <p>{email}</p>
        </DataItem>
        <DataItem icon={<HiPaperClip />} label="National ID">
          <p>{nationalID}</p>
        </DataItem>
        <DataItem icon={<HiKey />} label="Role">
          <p>{role}</p>
        </DataItem>
        {lastLoginDate && lastLoginDate!=null && (
          <DataItem icon={<HiIdentification />} label="Last login date">
            <p>{lastLoginDate}</p>
          </DataItem>
        )}
        {(!lastLoginDate||lastLoginDate==null) && (
          <DataItem icon={<HiBriefcase />} label="Last login date">
            <p>Currently no last login date to show</p>
          </DataItem>
        )}
        <DataItem icon={<HiInboxStack />} label="Active">
          <p>{isActive?'ENABLED':'DISABLED'}</p>
        </DataItem>
        <DataItem icon={<HiPaintBrush />} label="Account non locked">
        <p>{isNotLocked?'TRUE':'FALSE'}</p>
        </DataItem>
        <DataItem icon={<HiBookOpen />} label="Reviews">
          {reviews && reviews.length > 0 && (
            <Modal>
              <Modal.Open opens="reviews">
                <Button>Click view reviews</Button>
              </Modal.Open>
              <Modal.Window><ReviewsData reviews={reviews} /></Modal.Window>
            </Modal>
          )}
          {(!reviews || reviews.length === 0) && <p>No review to show</p>}
        </DataItem>
        <DataItem icon={<HiBookOpen />} label="Joined Tours">
          {joinedTours && joinedTours.length > 0 && (
            <Modal>
              <Modal.Open opens="joinedTours">
                <Button>Click view joined Tours</Button>
              </Modal.Open>
              <Modal.Window><ToursData tours={joinedTours} /></Modal.Window>
            </Modal>
          )}
          {(!joinedTours || joinedTours.length === 0) && <p>This user hasn't joined any tour</p>}
        </DataItem>
        <DataItem icon={<HiBookOpen />} label="Bookings">
          {bookings && bookings.length > 0 && (
            <Modal>
              <Modal.Open opens="bookings">
                <Button>Click view bookings</Button>
              </Modal.Open>
              <Modal.Window><BookingsData bookings={bookings} /></Modal.Window>
            </Modal>
          )}
          {(!bookings || bookings.length === 0) && <p>This user hasn't made any booking</p>}
        </DataItem>
      </Section>

      <Footer>
        <p>
          Information up to date {format(new Date(), 'MMM dd yyyy')}
        </p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default AccountDataBox;
