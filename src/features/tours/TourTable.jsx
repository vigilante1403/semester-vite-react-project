import styled from 'styled-components';
import Spinner from '../../ui/Spinner';

import Table from '../../ui/Table';

import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty';
import { useTours } from './useTours';
import TourRow from './TourRow';
// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;
function TourTable() {
  const [searchParams] = useSearchParams();
  const searchDiscountValue = searchParams.get('discount') || 'all';
  const { tours, isLoading } = useTours();
  if (isLoading) return <Spinner />;
  /// filter
  let filteredTours;
  if (searchDiscountValue !== 'all') {
    if (searchDiscountValue === 'no-discount') {
      filteredTours = tours.filter((tour) => tour.priceDiscount === 0);
    } else if (searchDiscountValue === 'with-discount') {
      filteredTours = tours.filter((tour) => tour.priceDiscount > 0);
    }
  } else {
    filteredTours = tours;
  }
  const sortBy = searchParams.get('sortBy') || 'name-asc';
  const [field, direction] = sortBy.split('-');
  console.log(field,direction)
  const modifier = direction === 'asc' ? 1 : -1;
  
 let sortedTours = filteredTours.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );
  if(field==='name'){
    
    sortedTours = filteredTours.sort(
      (a, b) => modifier * a[field].localeCompare(b[field])
    );
  }
  if (!sortedTours.length) return <Empty resourceName="tours" />;
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Tour</div>
          <div>Max Group Size</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedTours}
          render={(tour) => <TourRow tour={tour} key={tour.id} />}
        />
      </Table>
    </Menus>
  );
}

export default TourTable;
