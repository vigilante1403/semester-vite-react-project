import styled from 'styled-components';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty';
import { useUsers } from './useUsers'; // Ensure this hook is implemented correctly
import AccountRow from './AccountRow';
import Pagination from '../../ui/Pagination';
import { PAGE_SIZE } from '../../utils/constants';

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 1fr 1fr;
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

function AccountTable() {
  const [searchParams] = useSearchParams();
  const searchRoleValue = searchParams.get('role') || 'all';
  const { users, isLoading } = useUsers();

  if (isLoading) return <Spinner />;
  if(!users) return <Empty resourceName="users"/>;

  // Filter by role
  let filteredUsers = users;
  if (searchRoleValue !== 'all') {
    filteredUsers = filteredUsers.filter((user) => user.role === searchRoleValue);
  }

  const sortBy = searchParams.get('sortBy') || 'name-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;

  let sortedUsers = filteredUsers.sort((a, b) => {
    
    if (field === 'name' || field === 'role') {
      return modifier * a[field].localeCompare(b[field]);
    }
    
    if (field === 'status') {
      // Convert boolean to numeric value for sorting
      let field ='enabled'
      const statusA = a[field] ? 1 : 0;
      const statusB = b[field] ? 1 : 0;
  
      return modifier * (statusA - statusB);
    }
    
    // Default case for other numerical fields
    return (a[field] - b[field]) * modifier;
  });


  const currentPage = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = currentPage * PAGE_SIZE;
  let paginatedUsers;
  paginatedUsers = [...sortedUsers].slice(startIndex, endIndex);
console.log(sortedUsers.length);
  if (!paginatedUsers.length) return <Empty resourceName="users" />;
  return (
    <Menus>
      <Table columns="0.6fr 2.5fr 1.5fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>User Email</div>
          <div>Name</div>
          <div>Role</div>
          <div>Activate</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={paginatedUsers}
          render={(user) => <AccountRow user={user} key={user.id} />}
        />
        <Table.Footer>
          <Pagination count={sortedUsers.length} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default AccountTable;