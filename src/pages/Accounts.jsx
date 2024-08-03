import Row from '../ui/Row';
import Heading from '../ui/Heading'
import AccountTable from '../features/authentication/AccountTable';
import AddTour from '../features/tours/AddTour';
import AccountTableOperations from '../features/authentication/AccountTableOperations'
function Accounts() {
    return (
        <>
      <Row type="horizontal">
        <Heading as="h1">All accounts</Heading>
        <AccountTableOperations/>
      </Row>
      <Row>
       <AccountTable/>
        
      </Row>
    </>
    )
}

export default Accounts
