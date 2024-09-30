import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { useGetAllSchedulesOfAGuide } from "./useSchedules"
import Empty from "../../ui/Empty";
import { PAGE_SIZE } from "../../utils/constants";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import Pagination from "../../ui/Pagination";
import { useContext } from "react";
import { AdminContext } from "../../ui/ProtectedRouteAdmin";
import ScheduleRowGuide from "./ScheduleRowGuide";

function ScheduleTableGuide() {
    const {user}=useContext(AdminContext)
    const {schedules,isLoading}=useGetAllSchedulesOfAGuide({guideId:user.id})
    const [searchParams] = useSearchParams();
    if(isLoading) return <Spinner />
    const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));
  var startIndex = (currentPage - 1) * PAGE_SIZE;
  var endIndex = currentPage * PAGE_SIZE;
  let paginatedSchedules;
  paginatedSchedules = [...schedules].slice(startIndex, endIndex);
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
          render={(schedule,index) => <ScheduleRowGuide schedule={schedule} index={index} key={index} />}
        />
        <Table.Footer>
            <Pagination count={schedules.length} />
        </Table.Footer>
      </Table>
    </Menus>
    )
}

export default ScheduleTableGuide
