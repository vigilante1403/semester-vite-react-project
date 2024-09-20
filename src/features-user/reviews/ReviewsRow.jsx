import styled from 'styled-components';

import Tag from '../../ui/Tag';
import Table from '../../ui/Table';
import Modal from '../../ui/Modal';

import { convertToReadableDateTimeFromISOTimestamp } from '../../utils/helpers';

import Menus from '../../ui/Menus';
import { HiEye, HiPencil, HiTrash } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import ReviewDetail from './ReviewDetail';
import Star from '../../ui/Star';

const Display = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
  display: inline;
  /* display: -moz-box;  */

  /* number-of lines */

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  /* -moz-line-clamp: 1;
  -moz-box-orient: vertical; */
  /* width: 200px;
  height: 100px; */
  /* flex-wrap: wrap; */
  /* -moz-text-overflow: ellipsis; */

  /* overflow-x: hidden; */
`;

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

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
`;
const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

function ReviewsRow({
  review: {
    id: reviewId,
    review: content,
    rating,
    userName,
    tourName,
    createdAt,
    updatedAt,
    tourId,
    shown,
    tourImageCover,
  },

  color = '#fcc419',
  size = 20,
}) {
  const review = {
    id: reviewId,
    content,
    rating,
    userName,
    tourName,
    createdAt,
    updatedAt,
    tourId,
    shown,
    tourImageCover,
  };

  const showValue = shown ? 'show' : 'not-show';
  const statusToTagName = {
    'not-show': 'indigo',
    show: 'yellow',
    // 'checked-out': 'silver',
  };

  const createdDateStr = convertToReadableDateTimeFromISOTimestamp(
    new Date(createdAt)
  );
  const updatedDateStr = convertToReadableDateTimeFromISOTimestamp(
    new Date(updatedAt)
  );
  const navigate = useNavigate();

  return (
    <Table.Row>
      <Img
        src={
          tourImageCover != null
            ? 'http://localhost:8080/api/v1/file/image/tour/' + tourImageCover
            : 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg'
        }
      />
      <Display>{tourName}</Display>

      <Stacked>
        <div style={{ display: 'flex' }}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              full={Math.floor(rating) >= i + 1}
              color={color}
              size={size}
            />
          ))}
          ({rating})
        </div>
        <span>{updatedAt != null ? updatedDateStr : createdDateStr}</span>
      </Stacked>

      <Display>{content}</Display>

      <Tag type={statusToTagName[showValue]}>
        {shown ? 'Public' : 'Anonymous'}
      </Tag>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={reviewId}></Menus.Toggle>
          <Menus.List id={reviewId}>
          <Modal.Open opens={`review-${reviewId}`}>
            <Menus.Button icon={<HiEye />}>
              See details
            </Menus.Button>
            </Modal.Open>
            <Modal.Open opens={`edit-${reviewId}`}>
              <Menus.Button icon={<HiPencil />}>Edit review</Menus.Button>
            </Modal.Open>
            <Modal.Open opens={`delete-${reviewId}`}>
              <Menus.Button icon={<HiTrash />}>Delete review</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name={`review-${reviewId}`}>
            <ReviewDetail review={review} />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default ReviewsRow;

