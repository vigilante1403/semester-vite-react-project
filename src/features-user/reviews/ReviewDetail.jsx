import styled from 'styled-components';
import Menus from '../../ui/Menus';
import { HiEye, HiPencil, HiTrash } from 'react-icons/hi2';
import Button from '../../ui/Button';
import {
    Avatar,
    Typography,
    
  } from '@mui/material';
import Star from '../../ui/Star';
import { useContext } from 'react';
import { UserContext } from '../../ui/userLayout/ProtectedRouteUser';
import Tag from '../../ui/Tag';
import { convertToReadableDateTimeFromISOTimestamp } from '../../utils/helpers';
const StyledReviewDetailBox = styled.div`
  max-width: 40vw;
`;
const UserInfoAndDate = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;
const UserInfo = styled.div`
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
  height: ${(props)=>props.space}rem;
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
display:flex;
justify-content: flex-end;

`
const TourHeader = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`

function ReviewDetail({review,color='#fcc419',size=18}) {
    const {user}=useContext(UserContext)
    const showValue = review.shown ? 'show' : 'not-show';
  const statusToTagName = {
    'not-show': 'indigo',
    show: 'yellow',
    // 'checked-out': 'silver',
  };
  const createdDateStr = convertToReadableDateTimeFromISOTimestamp(
    new Date(review.createdAt)
  );
  const updatedDateStr = convertToReadableDateTimeFromISOTimestamp(
    new Date(review.updatedAt)
  );
  return (
    <StyledReviewDetailBox>
      <UserInfoAndDate>
        <UserInfo>
          <Avatar alt={user.fullName}
              src={
               `http://localhost:8080/api/v1/file/image/user/${user.photo}` ||
                'https://via.placeholder.com/150'
              }
              sx={{
                height: 4*16,
                width: 4*16,
                border: '2px solid white',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              }} />
          <Stacked>
            <p>{user.fullName}</p>
            <div style={{ display: 'flex',alignItems:'center' }}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              full={Math.floor(review.rating) >= i + 1}
              color={color}
              size={size}
            />
          ))}
          ({review.rating})
        </div>
        
          </Stacked>
        </UserInfo>
        <Typography color={'GrayText'} fontSize={12}>{review.updatedAt != null ? `${updatedDateStr.substr(0,10)}` : `${createdDateStr.substr(0,10)}`}</Typography>
      </UserInfoAndDate>
      <Spacer space={2.4} />
      <ContentSpace>
      <TourHeader>
      <Typography fontSize={20} fontWeight={700}>{review.tourName}</Typography>
      <Tag type={statusToTagName[showValue]}>
        {review.shown ? 'Public' : 'Anonymous'}
      </Tag>
      </TourHeader>
      
      <Spacer space={1.2} />
        <Content>{review.content}</Content>
        
      </ContentSpace>
        
    </StyledReviewDetailBox>
  );
}

export default ReviewDetail;
