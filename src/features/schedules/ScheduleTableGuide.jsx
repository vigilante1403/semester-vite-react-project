import { useSearchParams } from 'react-router-dom';
import Spinner from '../../ui/Spinner';
import { useGetAllSchedulesOfAGuide } from './useSchedules';
import Empty from '../../ui/Empty';
import { PAGE_SIZE } from '../../utils/constants';
import Menus from '../../ui/Menus';
import Table from '../../ui/Table';
import Pagination from '../../ui/Pagination';
import { useContext } from 'react';
import { AdminContext } from '../../ui/ProtectedRouteAdmin';
import ScheduleRowGuide from './ScheduleRowGuide';


function ScheduleTableGuide() {
  const { user } = useContext(AdminContext);
  const { schedules, isLoading } = useGetAllSchedulesOfAGuide({
    guideId: user.id,
  });
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;
  const geo = searchParams.get('geo') || 'all';
  const status = searchParams.get('status') || 'all';
  const sortBy = searchParams.get('sortBy')&&searchParams.get('sortBy')!==''?searchParams.get('sortBy') : 'startDate-asc';
  const [field, direction] = sortBy.split('-');
  let filteredSchedules = schedules;
  if (geo !== 'all') {
    if (geo === 'in-vietnam') {
      filteredSchedules = filteredSchedules.filter(
        (schedule) => schedule.countryName === 'Vietnam'
      );
    } else {
      filteredSchedules = filteredSchedules.filter(
        (schedule) => schedule.countryName !== 'Vietnam'
      );
    }
  }
  if (status !== 'all') {
    filteredSchedules = filteredSchedules.filter(
      (schedule) => schedule.tourStatus === status
    );
  }
  
  console.log(field)
  const modifier = direction === 'asc' ? 1 : -1;
  filteredSchedules = filteredSchedules.sort((a, b) => {
    if (field === 'startDate') {
      const dateA = new Date(a.from);
      console.log(a.from);
      const dateB = new Date(b.from);
      return modifier * (dateA - dateB);
    }

    if (field === 'name') {
      return modifier * a.tourName.localeCompare(b.tourName);
    }

    return modifier * a.tourName.localeCompare(b.tourName);
  });
  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));
  var startIndex = (currentPage - 1) * PAGE_SIZE;
  var endIndex = currentPage * PAGE_SIZE;
  let paginatedSchedules;
  paginatedSchedules = [...filteredSchedules].slice(startIndex, endIndex);
  if (!paginatedSchedules.length) return <Empty resourceName="schedules" />;
  return (
    <Menus>
      <Table columns="0.4fr 2.1fr 2fr 1.2fr 1fr ">
        <Table.Header role="row">
          <div>ID</div>
          <div>Tour</div>
          <div>Place</div>
          <div>Status</div>
          <div>Guest List</div>
        </Table.Header>
        <Table.Body
          data={paginatedSchedules}
          render={(schedule, index) => (
            <ScheduleRowGuide schedule={schedule} index={index} key={index} />
          )}
        />
        <Table.Footer>
          <Pagination count={filteredSchedules.length} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default ScheduleTableGuide;
