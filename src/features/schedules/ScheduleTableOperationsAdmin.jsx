import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
function ScheduleTableOperationsAdmin() {
  return (
    <TableOperations style1='center'>
      <Filter
        filterField="geo"
        options={[
          { value: 'all', label: 'All' },
          {
            value: 'in-vietnam',
            label: 'In VietNam',
          },
          { value: 'abroad', label: 'Abroad' },
        ]}
      />
      <Filter
        filterField="status"
        options={[
          { value: 'all', label: 'All' },
          {
            value: 'ongoing',
            label: 'On Going',
          },
          { value: 'upcoming', label: 'Up Coming' },
          {value:'canceled',label:'Canceled'},
          {value:'completed',label:'Completed'}
        ]}
      />
      <SortBy
        options={[
          { value: 'name-asc', label: 'Sort by guide name (A-Z)' },
          {
            value: 'name-desc',
            label: 'Sort by guide name (Z-A)',
          },
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
        ]}
      />
    </TableOperations>
  );
}

export default ScheduleTableOperationsAdmin;
