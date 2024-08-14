import styled from "styled-components";
import { format, isToday } from "date-fns";
import {
  HiBookOpen,
  HiBriefcase,
  HiCurrencyDollar,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
  HiOutlinePhoto,
  HiPaintBrush,
  HiPencil,
  HiPhoto,
  HiRectangleStack,
  HiUserGroup,
  HiUsers,
} from "react-icons/hi2";

import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";

import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import ReviewsData from "./ReviewsData";

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
  display:grid;
  grid-template-columns: repeat(2,1fr);
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
    props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

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
`
const Guide = styled.div`
  padding: 1rem;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  
`
const Img = styled.img`
  display:${(props)=>props.circle?"inline-block":"block"};
  width: 6.4rem;
  aspect-ratio: ${(props)=>props.circle?"1/1":"3/2"};
  border-radius: ${(props)=>props.circle?"50%":"0"};
  object-fit: ${(props)=>props.circle?"fill":"cover"};
  object-position: ${(props)=>props.circle?"unset":"center"};
  transform: scale(0.6) ;
`;
// A purely presentational component
function TourDataBox({ tour }) {
  const {
    id,
    name,
    slug,
    maxGroupSize,
    price,
    priceDiscount,
    imageCover,
    images,
    guides,
    description,
    startDates,
    summary,
    countryFlag,
    countryNameCommon,
    countryNameOfficial,
    reviews
  } = tour;

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {startDates.length} day trip <span>{name}</span>
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
          {countryFlag && <Flag src={countryFlag} alt={`Flag of ${countryNameCommon}`} />}
          <p>
            {/* {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""} */}
          </p>
          <span>&bull;</span>
          <p>{startDates.length}-day trip</p>
          <span>&bull;</span>
          <p>Country Name: {countryNameCommon}</p>
        </Guest>
          <DataItem icon={<HiBriefcase />} label="Tour name"><p>{name}</p></DataItem>
          <DataItem icon={<HiUsers />} label="Max Group Size"><p>{maxGroupSize} persons</p></DataItem>
          <DataItem icon={<HiCurrencyDollar />} label="Initial price"><p>{formatCurrency(price)}</p></DataItem>
          <DataItem icon={<HiCurrencyDollar />} label="Now discount price"><p>{formatCurrency(priceDiscount)}</p></DataItem>
          {imageCover&&<DataItem icon={<HiPhoto />} label="Image Cover"><Img
        src={'http://localhost:8080/api/v1/file/image/tour/' + imageCover || ''}
      /></DataItem>}
      {!imageCover&&<DataItem icon={<HiBriefcase />} label="Image Cover"><p>Currently no image cover to show</p></DataItem>}
         {images && <DataItem icon={<HiBriefcase />} label="Images">{ images.map((image)=><Img
        src={'http://localhost:8080/api/v1/file/image/tour/' + image || ''}
      />)}</DataItem>}
      {!images&&<DataItem icon={<HiBriefcase />} label="Images"><p>Currently no images to show</p></DataItem>}
        <DataItem icon={<HiPencil/>} label="Description"><p>{description}</p></DataItem>
        <DataItem icon={<HiPaintBrush/>} label="Summary"><p>{summary}</p></DataItem>
        <DataItem icon={<HiRectangleStack/>} label="Start dates">{startDates && startDates.length>0&& startDates.map((start)=>(<div>{start}</div>))}</DataItem>
        <DataItem label="Guides" icon={<HiUserGroup/>}>
          <Guides>{guides && guides.length>0 && guides.map(guide=>(<Guide><Img
        src={'/default-user.jpg'} circle={true}
      /><span>{guide.fullName}</span></Guide>))}</Guides>
        </DataItem>
        <DataItem icon={<HiBookOpen/>} label="Reviews">{reviews&&reviews.length>0&&<Modal><Modal.Open opens="reviews">
        <Button>Click view reviews</Button>
        </Modal.Open>
        <Modal.Window><ReviewsData reviews={reviews} /></Modal.Window>
        </Modal>}{(!reviews||reviews.length===0) && <p>No review to show</p>}</DataItem>
      </Section>

      <Footer>
        <p>Started at {format(new Date(startDates[0]), "EEE, MMM dd yyyy, p")}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default TourDataBox;