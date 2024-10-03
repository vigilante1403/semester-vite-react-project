import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { useGetAllSchedules } from "./useSchedules"
import Empty from "../../ui/Empty";
import { PAGE_SIZE } from "../../utils/constants";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import ScheduleRow from "./ScheduleRow";
import Pagination from "../../ui/Pagination";


function ScheduleTableAuthorized() {
    
    const {schedules,isLoading}=useGetAllSchedules();
    const [searchParams] = useSearchParams();
    if(isLoading) return <Spinner />
    const geo = searchParams.get('geo')||'all'
    const status = searchParams.get('status')||'all'
  const sortBy = searchParams.get('sortBy')&&searchParams.get('sortBy')!==''?searchParams.get('sortBy') : 'startDate-asc';
  const [field, direction] = sortBy.split('-');  
  let filteredSchedules =schedules
    if(geo!=='all'){
      if(geo==='in-vietnam'){
        filteredSchedules=filteredSchedules.filter(schedule=>schedule.countryName==='Vietnam')
      }else{
        filteredSchedules=filteredSchedules.filter(schedule=>schedule.countryName!=='Vietnam')
      }
    }
    if(status!=='all'){
      filteredSchedules=filteredSchedules.filter(schedule=>schedule.tourStatus===status);
    }
    const modifier = direction === 'asc' ? 1 : -1;
  filteredSchedules = filteredSchedules.sort((a, b) => {
    if (field === 'startDate') {
      const dateA = new Date(a.from);
      console.log(a.from);
      const dateB = new Date(b.from);
      return modifier * (dateA - dateB);
    }

    if (field === 'name') {
      return modifier * a.guideName.localeCompare(b.guideName);
    }

    return modifier * a.guideName.localeCompare(b.guideName);
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
      <Table columns="auto 0.8fr 2.1fr 2fr 1.2fr auto 1fr">
        <Table.Header role="row">
          <div>ID</div>
          <div>Guide name</div>
          <div>email</div>
          <div>Tour</div>
          <div>Place</div>
          <div>Guest</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={paginatedSchedules}
          render={(schedule,index) => <ScheduleRow schedule={schedule} index={index} key={index} />}
        />
        <Table.Footer>
            <Pagination count={filteredSchedules.length} />
        </Table.Footer>
      </Table>
    </Menus>
    )
}

export default ScheduleTableAuthorized
