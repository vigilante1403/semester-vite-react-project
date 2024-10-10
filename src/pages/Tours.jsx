import Row from '../ui/Row';
import Heading from '../ui/Heading'
import TourTable from '../features/tours/TourTable';
import AddTour from '../features/tours/AddTour';
import TourTableOperations from '../features/tours/TourTableOperations';
import Searchbar from '../ui/Searchbar';
import { useTours } from '../features/tours/useTours';
import { createContext, useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Spinner from '../ui/Spinner';
import Empty from '../ui/Empty';
export const TourContext=createContext();
function Tours() {
  const { tours, isLoading } = useTours();
  let [filteredTours,setFilteredTours]= useState([]);
  const [searchParams,setSearchParams]= useSearchParams();
  const [searchTour,setSearchTour]=useState(searchParams.get('tour') ?? '');
  const [showTours, setShowTours] = useState(true);
  
  const handleReload = () => {
    // Unmount and remount the component by toggling the state
    setShowTours(false);
    setTimeout(() => setShowTours(true), 0); // Re-mount after a delay
  };
  if (isLoading ) return <Spinner />;
  if (!tours) return <Empty resourceName={'tour'} />;
  if (searchParams.get('tour') !== 'all' && searchParams.get('tour') !== '' && searchParams.get('tour')!==null) {
    filteredTours = [];
    var temptours = tours;
    filteredTours = temptours.filter((tour) => {
      const name = tour.name.toLowerCase();
      console.log(tour);
      
      return name.startsWith(searchTour) ? tour : null;
    });
    
  } else {
    
    if(filteredTours.length===0){
      
      filteredTours=tours
    }
  }
  const handleSearch = (data) => {
    if(data.trim()===''){
      searchParams.delete('tour')
      setSearchTour('');
      setSearchParams(searchParams)
      filteredTours=tours;
      return;
    }
    const newData = data.toLowerCase();
    setSearchTour(newData);
    searchParams.set('tour', newData);
    searchParams.set('page',1)
    setSearchParams(searchParams);
  };
    return (
      <TourContext.Provider value={{filteredTours,handleReload}}>
      <Row type="horizontal">
        <Heading as="h1">All tours</Heading>
        <TourTableOperations/>
      </Row>
      <Row>
      <Searchbar placeholder={"Search tours by Tour name"} text={searchTour} onChangeText={handleSearch}/>
       <TourTable/>
       <AddTour/>
        
      </Row>
      </TourContext.Provider>
    )
}

export default Tours
