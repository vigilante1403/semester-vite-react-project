import styled from "styled-components";
import { Flag } from '../../ui/Flag';
import { formatCurrency } from "../../utils/helpers";
import DataItem from "../../ui/DataItem";
import { HiStar } from "react-icons/hi2";
import { format } from "date-fns";
const StyledBookingDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
    display: flex;
    flex-direction: column;
    align-items: center;
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
const Box = styled.div`
display: flex;
padding:0.7rem;
justify-content: space-between;
color: var(--color-grey-500);
align-items: center;
max-width: 40vw;
min-width: 20vw;
flex-direction: column;
`;

function ReviewsData({reviews}) {
    return (
        <StyledBookingDataBox>
            {reviews.map(review=>(
            <Box><DataItem>{format(review.createdAt,"dd/MM/yyyy")}</DataItem><DataItem icon={<HiStar/>} label="Rating">{review.rating}</DataItem><DataItem>Content: {review.review}</DataItem></Box>
            ))}
        </StyledBookingDataBox>
    )
}

export default ReviewsData