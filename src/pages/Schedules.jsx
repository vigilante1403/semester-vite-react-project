import { useContext } from 'react';
import AddSchedule from '../features/schedules/AddSchedule';

import Heading from '../ui/Heading';
import Row from '../ui/Row';
import Searchbar from '../ui/Searchbar';
import { AdminContext } from '../ui/ProtectedRouteAdmin';
import ScheduleTableAuthorized from '../features/schedules/ScheduleTableAuthorized';
import ScheduleTableGuide from '../features/schedules/ScheduleTableGuide';

function Schedules() {
  const { user } = useContext(AdminContext);
  return (
    <>
      <Row type="horizontal">
        {user.role === 'GUIDE' && <Heading as="h1">My schedules</Heading>}
        {(user.role === 'LEADGUIDE' || user.role === 'ADMIN') && (
          <Heading as="h1">All schedules</Heading>
        )}
      </Row>
      <Row>
        <Searchbar placeholder={'Search schedule by id'} />
        {(user.role === 'LEADGUIDE' || user.role === 'ADMIN') && (
          <ScheduleTableAuthorized />
        )}
        {user.role==='GUIDE'&&<ScheduleTableGuide/>}
        {user.role === 'ADMIN' && <AddSchedule />}
      </Row>
    </>
  );
}

export default Schedules;
