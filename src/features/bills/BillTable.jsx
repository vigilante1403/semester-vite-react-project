import { useSearchParams } from 'react-router-dom';
import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import { useBills } from '../dashboard/useBills';
import BillRow from './BillRow';
import Empty from '../../ui/Empty';
import { PAGE_SIZE } from '../../utils/constants';
import Pagination from '../../ui/Pagination';
function BillTable() {
  const { bills, isLoading } = useBills();
  const [searchParams] = useSearchParams();


  if (isLoading) return <Spinner />;
 
  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));
  var startIndex = (currentPage - 1) * PAGE_SIZE;
  var endIndex = currentPage * PAGE_SIZE;
  let paginatedBills;
  paginatedBills = [...bills].slice(startIndex, endIndex);
  if (!paginatedBills.length) return <Empty resourceName="bills" />;
  return (
    <Menus>
      <Table columns="0.8fr 1fr 1fr 1fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Bill id</div>
          <div>By User</div>
          <div>Amount</div>
          <div>Booking</div>
          <div>Paid at</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={paginatedBills}
          render={(bill) => <BillRow bill={bill} key={bill.id} />}
        />
        <Table.Footer>
            <Pagination count={paginatedBills.length} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BillTable;
