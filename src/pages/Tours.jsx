import Row from '../ui/Row';
import Heading from '../ui/Heading'
import TourTable from '../features/tours/TourTable';
import AddTour from '../features/tours/AddTour';
import TourTableOperations from '../features/tours/TourTableOperations';
function Tours() {
    return (
        <>
      <Row type="horizontal">
        <Heading as="h1">All tours</Heading>
        <TourTableOperations/>
      </Row>
      <Row>
       <TourTable/>
       <AddTour/>
        
      </Row>
    </>
    )
}

export default Tours
