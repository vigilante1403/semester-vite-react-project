import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
function BillTableOperations() {
  return (
    <TableOperations>
      
      <SortBy
        options={[
          { value: 'amount-asc', label: 'Sort by amount paid (low-high)' },
          {
            value: 'amount-desc',
            label: 'Sort by amount paid (high-low)',
          },
          {
            value: 'paid-asc',
            label: 'Sort by early paid (ealier first)',
          },
          {
            value: 'paid-desc',
            label: 'Sort by recent paid (recent first)',
          },
        ]}
      />
    </TableOperations>
  );
}

export default BillTableOperations;
