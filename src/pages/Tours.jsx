import Row from '../ui/Row';
import Heading from '../ui/Heading'
import TourTable from '../features/tours/TourTable';
import AddTour from '../features/tours/AddTour';
import TourTableOperations from '../features/tours/TourTableOperations';
import Searchbar from '../ui/Searchbar';
function Tours() {
    return (
        <>
      <Row type="horizontal">
        <Heading as="h1">All tours</Heading>
        <TourTableOperations/>
      </Row>
      <Row>
      <Searchbar placeholder={"Search tours by Tour name"} />
       <TourTable/>
       <AddTour/>
        
      </Row>
    </>
    )
}

export default Tours
