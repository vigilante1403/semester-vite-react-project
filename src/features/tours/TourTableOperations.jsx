import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
function TourTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: 'all', label: 'All' },
          {
            value: 'no-discount',
            label: 'No discount',
          },
          { value: 'with-discount', label: 'With discount' },
        ]}
      />
      <SortBy
        options={[
          { value: 'name-asc', label: 'Sort by name (A-Z)' },
          {
            value: 'name-desc',
            label: 'Sort by name (Z-A)',
          },
          { value: 'price-asc', label: 'Sort by price (low first)' },
          { value: 'price-desc', label: 'Sort by price (high first)' },
          {
            value: 'maxGroupSize-asc',
            label: 'Sort by max group size (low first)',
          },
          {
            value: 'maxGroupSize-desc',
            label: 'Sort by max group size (high first)',
          },
        ]}
      />
    </TableOperations>
  );
}

export default TourTableOperations;
