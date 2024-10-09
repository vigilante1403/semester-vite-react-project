import React, { useContext, useState } from 'react';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';
import Spinner from '../../ui/Spinner';
import Pagination from '../../ui/Pagination';
import { PAGE_SIZE } from '../../utils/constants';
import { useSearchParams } from 'react-router-dom';
import ReviewsRow from './ReviewsRow';
import { ReviewContext } from './Reviews';

function ReviewsTable() {
  const {filteredReviews:reviews}=useContext(ReviewContext)
  const [searchParams] = useSearchParams();
  
  if (!reviews) return <Empty resourceName='reviews' />;


  
  let filteredReviews = reviews;

 

  // Xử lý phân trang
  const currentPage = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = currentPage * PAGE_SIZE;
  const paginatedReviews = filteredReviews.slice(startIndex, endIndex);

  if (!paginatedReviews.length) return <Empty resourceName='reviews' />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div></div>
          <div>Tour</div>
          <div>Rating</div>
          <div>Content</div>
          <div>Status</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={paginatedReviews}
          render={(review) => <ReviewsRow review={review} key={review.id}/>}
        />
        <Table.Footer>
          <Pagination count={filteredReviews.length} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default ReviewsTable;
