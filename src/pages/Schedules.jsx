import { useContext } from 'react';
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
      <Spacer space={2} />
      {user.role==='GUIDE'&&<Row type="center">
      <ScheduleTableOperations />
      </Row>}
      {user.role!=='GUIDE'&&<Row type="center">
      <ScheduleTableOperationsAdmin />
      </Row>}
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
