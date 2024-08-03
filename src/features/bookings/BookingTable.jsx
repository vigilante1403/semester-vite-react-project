
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from '../../ui/Empty'

import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Tour</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

      
        <Table.Footer>
          <Pagination  count={10} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
