import Row from '../ui/Row';
import Heading from '../ui/Heading'
import AccountTable from '../features/authentication/AccountTable';
import AccountTableOperations from '../features/authentication/AccountTableOperations'
import AddUser from '../features/authentication/AddUser';
import Searchbar from '../ui/Searchbar';
function Accounts() {
    return (
        <>
      <Row type="horizontal">
        <Heading as="h1">All accounts</Heading>
        <AccountTableOperations/>
      </Row>
      <Row>
      <Searchbar placeholder="Search users by email or user name"/>
       <AccountTable/>
        <AddUser/>
      </Row>
    </>
    )
}

export default Accounts