import { useSearchParams } from 'react-router-dom';
import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import { useBills } from '../dashboard/useBills';
import BillRow from './BillRow';
import Empty from '../../ui/Empty';
import { PAGE_SIZE } from '../../utils/constants';
import Pagination from '../../ui/Pagination';
import { useContext } from 'react';
import { BillContext } from '../../pages/Bills';
function BillTable() {

  const [searchParams] = useSearchParams();
  const {filteredBills:bills}=useContext(BillContext)

 
  const sortBy = searchParams.get('sortBy') || 'amount-asc';
  const [field, direction] = sortBy.split('-');
  console.log(field, direction);
  const modifier = direction === 'asc' ? 1 : -1;
  let sortedBills = bills;
  if(field==='amount'){
    sortedBills=bills.sort((a,b)=>modifier*(a['booking']['priceFinal']-b['booking']['priceFinal']))
  }
  // let sortedBills = bills.sort(
  //   (a, b) => (a[field] - b[field]) * modifier
  // );

  if (field === 'paid') {
    sortedBills = bills.sort(
      (a, b) => modifier * (new Date(a['paidAt'])-new Date(b['paidAt']))
    );
  }
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
            <Pagination count={bills.length} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BillTable;
