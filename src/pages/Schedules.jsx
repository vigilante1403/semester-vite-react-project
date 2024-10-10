import { createContext, useContext, useState } from 'react';
import AddSchedule from '../features/schedules/AddSchedule';

import Heading from '../ui/Heading';
import Row from '../ui/Row';
import Searchbar from '../ui/Searchbar';
import { AdminContext } from '../ui/ProtectedRouteAdmin';
import ScheduleTableAuthorized from '../features/schedules/ScheduleTableAuthorized';
import ScheduleTableGuide from '../features/schedules/ScheduleTableGuide';
import ScheduleTableOperations from '../features/schedules/ScheduleTableOperations';
import Spacer from '../ui/Spacer';
import ScheduleTableOperationsAdmin from '../features/schedules/ScheduleTableOperationsAdmin';
import {
  useGetAllSchedules,
  useGetAllSchedulesOfAGuide,
} from '../features/schedules/useSchedules';
import { useSearchParams } from 'react-router-dom';
import Spinner from '../ui/Spinner';
import Empty from '../ui/Empty';
export const ScheduleContext=createContext()
function Schedules() {
  const { user } = useContext(AdminContext);
  const { schedules: schedules1, isLoading: isLoading1 } = useGetAllSchedules({
    authorized: user.role !== 'GUIDE' && user.role !== 'USER' ? true : false,
  });
  const {
    schedules: schedules2,
    isLoading: isLoading2,
  } = useGetAllSchedulesOfAGuide({
    guideId: user.role === 'GUIDE' ? user.id : null,
  });
  let [filteredSchedules, setFilteredSchedules] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchSchedule, setSearchSchedule] = useState(
    searchParams.get('schedule') ?? ''
  );
  const [showSchedules, setShowSchedules] = useState(true);
  const handleReload = () => {
    // Unmount and remount the component by toggling the state
    setShowSchedules(false);
    setTimeout(() => setShowSchedules(true), 0); // Re-mount after a delay
  };
  if (user.role!=='GUIDE'&&user.role!=='USER'&&isLoading1) return <Spinner />;
  if (user.role==='GUIDE'&&isLoading2) return <Spinner />;
  if ( user.role !== 'GUIDE' && user.role !== 'USER'&&!schedules1)
    return <Empty resourceName={'schedule'} />;
  if ( user.role === 'GUIDE'&&!schedules2 )
    return <Empty resourceName={'schedule'} />;
  if (
    searchParams.get('schedule') !== 'all' &&
    searchParams.get('schedule') !== '' &&
    searchParams.get('schedule') !== null
  ) {
    filteredSchedules = [];
    var tempSchedules = user.role==='GUIDE'?schedules2:schedules1;
    filteredSchedules = tempSchedules.filter((sc) => {
      const scheduleId = sc.id.toLowerCase();

      return scheduleId.startsWith(searchSchedule) ? sc : null;
    });
  } else {
    if (filteredSchedules.length === 0) {
      filteredSchedules = user.role==='GUIDE'?schedules2:schedules1;
    }
  }
  console.log(filteredSchedules)
  const handleSearch = (data) => {
    if (data.trim() === '') {
      searchParams.delete('schedule');
      setSearchSchedule('');
      setSearchParams(searchParams);
      filteredSchedules = user.role==='GUIDE'?schedules2:schedules1
      return;
    }
    const newData = data.toLowerCase();
    setSearchSchedule(newData);
    searchParams.set('schedule', newData);
    searchParams.set('page',1)
    setSearchParams(searchParams);
  };
  return (
    <ScheduleContext.Provider value={{ filteredSchedules,handleReload }}>
      <Row type="horizontal">
        {user.role === 'GUIDE' && <Heading as="h1">My schedules</Heading>}
        {(user.role === 'LEADGUIDE' || user.role === 'ADMIN') && (
          <Heading as="h1">All schedules</Heading>
        )}
      </Row>
      <Spacer space={2} />
      {user.role === 'GUIDE' && (
        <Row type="center">
          <ScheduleTableOperations />
        </Row>
      )}
      {user.role !== 'GUIDE' && (
        <Row type="center">
          <ScheduleTableOperationsAdmin />
        </Row>
      )}
      <Row>
        <Searchbar placeholder={'Search schedule by id'} text={searchSchedule} onChangeText={handleSearch} />
        {(user.role === 'LEADGUIDE' || user.role === 'ADMIN') && (
          <ScheduleTableAuthorized />
        )}
        {user.role === 'GUIDE' && <ScheduleTableGuide />}
        {user.role === 'ADMIN' && <AddSchedule />}
      </Row>
    </ScheduleContext.Provider>
  );
}

export default Schedules;
