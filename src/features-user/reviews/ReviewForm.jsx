import styled from 'styled-components';
import Menus from '../../ui/Menus';
import { HiEye, HiPencil, HiTrash } from 'react-icons/hi2';
import Button from '../../ui/Button';
import { Avatar, TextareaAutosize, Typography } from '@mui/material';
import Star from '../../ui/Star';
import { useContext, useState } from 'react';
import { UserContext } from '../../ui/userLayout/ProtectedRouteUser';
import Tag from '../../ui/Tag';
import { convertToReadableDateTimeFromISOTimestamp, formatDateToCalendar } from '../../utils/helpers';
import StarRating from './StarRating';
import FormRow from '../../ui/FormRow';
import { format } from 'date-fns';
import { useWriteNewReview } from './useReviews';
import toast from 'react-hot-toast';
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

const TourHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledText = styled(Typography)`
font-size: ${(props)=>props.fontSize??12};
color:${(props)=>props.color};
display: inline-block;
`
function ReviewForm({ color = '#fcc419', size = 18, booking,onClose,review=null }) {
    const [rating,setRating]=useState(review?review.rating:0)
    const [content,setContent]=useState('')
    const {writeReview,isWriting}=useWriteNewReview();
    const clearAll = ()=>{
        setRating(0)
        setContent('')
    }
    const handleWriteReview = ()=>{
        if(rating===0){
            toast.error('Cannot leave empty star')
            return;
        }
        console.log(content)
        writeReview({tourId:booking.tour.id,userId:booking.user.id,rating:rating,review:content},{
            onSettled:()=>{
                onClose();
            }
        })
    }
  return (
    <StyledReviewFormBox>
      <TourAndDateTookPlace>
        <TourInfo><Typography color={'CaptionText'} fontWeight={700} fontSize={24}>{booking.tour.name}</Typography></TourInfo>
        <Typography color={'GrayText'} fontSize={16}>
        {formatDateToCalendar(booking.startDate,'dd/MM/yyyy')}
        </Typography>
      </TourAndDateTookPlace>
      <Stacked>
        <p>How many stars would you rate this tour?</p>
        <StarRating onSetRating={setRating} defaultRating={rating}  />
        <TourHeader>
        <StyledText fontSize={12} color={'Highlight'} fontWeight={500}>Review{' '}<StyledText color={'InfoText'} fontSize={12}>(Limit 100 characters)</StyledText>:</StyledText>
        </TourHeader>
        <TextareaAutosize onChange={(e)=>setContent(e.target.value)} defaultValue={''} />
        <FormRow>
        {/* type is an HTML attribute! */}
        
        <Button variation="secondary" type="reset" onClick={clearAll}>
          Clear all
        </Button>
        <Button type="submit" onClick={handleWriteReview}>
          Send Review
        </Button>
      </FormRow>
      </Stacked>
    </StyledReviewFormBox>
  );
}

export default ReviewForm;
