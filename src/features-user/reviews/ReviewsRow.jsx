import styled from 'styled-components';

import Tag from '../../ui/Tag';
import Table from '../../ui/Table';
import Modal from '../../ui/Modal';

import { convertToReadableDateTimeFromISOTimestamp } from '../../utils/helpers';

import Menus from '../../ui/Menus';
import { HiEye, HiPencil, HiTrash } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

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
            <Menus.Button icon={<HiEye />} onClick={() => {}}>
              See details
            </Menus.Button>

            <Modal.Open opens={`edit-${reviewId}`}>
              <Menus.Button icon={<HiPencil />}>Edit review</Menus.Button>
            </Modal.Open>
            <Modal.Open opens={`delete-${reviewId}`}>
              <Menus.Button icon={<HiTrash />}>Delete review</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default ReviewsRow;
function Star({ full, color, size }) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: 'block',
    //   cursor: 'pointer',
  };

  return (
    <span role="button" style={starStyle}>
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
