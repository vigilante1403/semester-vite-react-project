import styled from 'styled-components';
import Heading from '../../ui/Heading';
import { ResponsiveContainer } from 'recharts';
import Table from '../../ui/Table';
import { useBills } from './useBills';
import BillRow from './BillRow';
import Pagination from '../../ui/Pagination';
import PaginationCustom from '../../ui/userLayout/PaginationCustom';
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';
import { useSearchParams } from 'react-router-dom';
import Row from '../../ui/Row';
import Menus from '../../ui/Menus';

const BillBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

 
`;
const StyledBody = styled.section`
  margin: 0.4rem 0;
  min-height: 20vh;
`
export default function BillDataBox() {
  const { bills, isLoading } = useBills();
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;
  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));
  const startIndex = (currentPage - 1) * 3;
  const endIndex = currentPage * 3;
  const paginatedBills = bills.slice(startIndex, endIndex);

  if (!bills.length) return <Empty resourceName="bills" />;
  return (
    <BillBox>
      <Heading as="h2">Bill History</Heading>
      <ResponsiveContainer width="100%" height={'auto'}>
      <Row>
     
     <Table columns="2.5fr 1fr 0.8fr">
          <Table.Header>
            <div>email</div>
            <div>booking</div>
            <div>paid at</div>
          </Table.Header>
         
          <StyledBody>
             {paginatedBills.map((bill) => (
                  <BillRow bill={bill} key={bill.id} />
                ))}
          </StyledBody>
         
          <Table.Footer>
            <PaginationCustom count={bills.length} pageSize={3} />
          </Table.Footer>
        </Table>
     
      </Row>
     
      </ResponsiveContainer>
    </BillBox>
  );
}