import styled from 'styled-components';
import Menus from '../../ui/Menus';
import { HiEye, HiPencil, HiTrash } from 'react-icons/hi2';
import Button from '../../ui/Button';
import { Avatar, Typography } from '@mui/material';
import Star from '../../ui/Star';
import { useContext } from 'react';
import { UserContext } from '../../ui/userLayout/ProtectedRouteUser';
import Tag from '../../ui/Tag';
import { convertToReadableDateTimeFromISOTimestamp } from '../../utils/helpers';
const StyledReviewFormBox = styled.div`
  min-width: 40vw;
`;
const TourAndDateTookPlace = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;
const TourInfo = styled.div`
  display: flex;
  column-gap: 2rem;
  justify-content: flex-start;
  width: 90%;
`;
// const Avatar = styled.img`
//   display: block;
//   height: 5rem;
//   width: 5rem;
//   aspect-ratio: 1;
//   object-fit: cover;
//   object-position: center;
//   border-radius: 50%;
//   outline: 2px solid var(--color-grey-100);
// `;
const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;
const Spacer = styled.div`
  height: ${(props) => props.space}rem;
`;
const ContentSpace = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`;
const Content = styled.div`
  /* padding:2rem; */
  max-width: 100%;
  word-break: break-all;
`;
const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const TourHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function ReviewForm({ color = '#fcc419', size = 18, booking }) {
  return (
    <StyledReviewFormBox>
      <TourAndDateTookPlace>
        <TourInfo>Tour ABC</TourInfo>
        <Typography color={'GrayText'} fontSize={12}>
          12/3/2024
        </Typography>
      </TourAndDateTookPlace>
      <Stacked>
        <p>How many stars would you give this tour?</p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} full={0} color={color} size={size} />
          ))}
        </div>
      </Stacked>
    </StyledReviewFormBox>
  );
}

export default ReviewForm;
