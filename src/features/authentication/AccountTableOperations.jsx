import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
function TourTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="role"
        options={[
          { value: 'all', label: 'All' },
          {
            value: 'USER',
            label: 'User Role',
          },
          { value: 'GUIDE', label: 'Guide Role' },
          { value: 'LEADGUIDE', label: 'LeadGuide Role' },
          { value: 'ADMIN', label: 'Admin Role' },
        ]}
      />
      <SortBy options={[{ value: 'name-asc', label: 'Sort by name (A-Z)' },{
        value:'name-desc',label:'Sort by name (Z-A)'
      },{value:'role-asc',label:'Sort by role'},
        {value:'status',label:'Sort by account status'},
   ]} />
    </TableOperations>
  );
}

export default TourTableOperations;
