import Row from '../ui/Row';
import Heading from '../ui/Heading'
import AccountTable from '../features/authentication/AccountTable';
import AccountTableOperations from '../features/authentication/AccountTableOperations'
import AddUser from '../features/authentication/AddUser';
import Searchbar from '../ui/Searchbar';
import { createContext, useState } from 'react';
import { useUsers } from '../features/authentication/useUsers';
import { useSearchParams } from 'react-router-dom';
import Spinner from '../ui/Spinner';

export const AccountContext = createContext();

function Accounts() {

  const { users, isLoading,refetch } = useUsers();
  let [filteredUsers,setFilteredUsers]= useState([]);
  const [searchParams,setSearchParams]= useSearchParams();
  const [searchUser,setSearchUser]=useState(searchParams.get('user') ?? '');
  const [showUsers, setShowUsers] = useState(true);

  const handleReload = () => {
    // Unmount and remount the component by toggling the state
    setShowUsers(false);
    setTimeout(() => setShowUsers(true), 1000); // Re-mount after a delay
  };
  if (isLoading ) return <Spinner />;
  if (!users) return <Spinner />;

  if (searchParams.get('user') !== 'all' && searchParams.get('user') !== '' && searchParams.get('user')!==null) {
    filteredUsers = [];
    var tempusers = users;

    filteredUsers = tempusers.filter((user) => {
      const email = user.email.toLowerCase();
      console.log(user);
      
      return email.startsWith(searchUser) ? email : null;
    });
    
  } else {
    
    // filteredUsers = [];
    
    // filteredUsers = users;
    if(filteredUsers.length===0){
      
      filteredUsers=users
    }
    // console.log('filter users',filteredUsers)
  }

  const handleSearch = (data) => {
    if(data.trim()===''){
      searchParams.delete('user')
      setSearchUser('');
      setSearchParams(searchParams)
      filteredUsers=users;
      return;

    }
    const newData = data.toLowerCase();
    setSearchUser(newData);
    searchParams.set('user', newData);
    setSearchParams(searchParams);
  };
    return (

        <AccountContext.Provider value={{filteredUsers, handleReload}}>
      <Row type="horizontal">
        <Heading as="h1">All accounts</Heading>
        <AccountTableOperations/>
      </Row>
      <Row>
      <Searchbar placeholder="Search users by email or user name"  onChangeText={handleSearch} text={searchUser}/>
       <AccountTable/>
        <AddUser/>
      </Row>
    </AccountContext.Provider>
    )
}

export default Accounts