import { Typography } from "@mui/material";
import Spinner from "../../ui/Spinner"
import {  useGetDetailSchedule } from "./useSchedules"
import styled from "styled-components"
import {Stacked} from '../../ui/Stacked'
import { format } from "date-fns";
import Table from "../../ui/Table";
import LocationRow from "./LocationRow";
import Pagination from "../../ui/Pagination";
import GuestRow from "./GuestRow";
import { HiOutlineCalendar, HiOutlineUserGroup } from "react-icons/hi2";
const StyledScheduleDetail = styled.div`
  min-width: 70vw;
`;
const Spacer = styled.div`
  height: ${(props)=>props.space}rem;
`;
const Typo = styled(Typography)`
color:var(--color-grey-700);
font-size: ${(props)=>props.fontSize}rem;
`;
function ShowDetailSchedule({scheduleId=null}) {
    const {schedule,isLoading}=useGetDetailSchedule({scheduleId:scheduleId})
    if(isLoading) return <Spinner />
    console.log(Object.values([schedule.locations][0]) )
    return (
        <StyledScheduleDetail>
        <Stacked>
            <Typo fontSize={24}>{schedule.tourName}{' '}&mdash;{' '}{Object.keys(schedule.locations).length} day trip</Typo>
            <Typo fontSize={12} color={"GrayText"} fontStyle={"revert-layer"}>{format(new Date(schedule.from), 'MMM dd yyyy')}{' '}&mdash;{' '}{format(new Date(schedule.to), 'MMM dd yyyy')}</Typo>
            <Spacer space={1} />
            <Typo fontSize={18}>Guide: {schedule.guideName}</Typo>
            
        </Stacked>
        <Spacer space={2} />
        <Typo fontSize={18}><HiOutlineCalendar/> Schedule</Typo>
        <Spacer space={2} />
        <Table columns="auto auto auto auto">
                <Table.Header role="row">
                    <div>Day</div>
                    <div>Activities</div>
                    <div>Address</div>
                    <div>Exact coordinates</div>
                </Table.Header>
                <Table.Body data={Object.values([schedule.locations][0])}
                render={(location,index)=><LocationRow location={location} key={index} />}
                 />
                <Table.Footer>
                    <Pagination count={Object.values([schedule.locations][0]).length} />
                </Table.Footer>
                
            </Table>

            <Spacer space={2} />
            <Typo fontSize={18}><HiOutlineUserGroup/> Guest List</Typo>
            <Spacer space={2} />
            <Table columns="0.4fr 0.5fr 0.5fr 1.4fr 0.5fr">
                <Table.Header role="row">
                    <div></div>
                    <div>Guest</div>
                    <div>Tickets</div>
                    <div>Email</div>
                    <div>UID</div>
                </Table.Header>
                <Table.Body data={Object.values([schedule.guestList][0])}
                render={(guest,index)=><GuestRow index={index} guest={guest} key={index} />}
                 />
                <Table.Footer>
                    <Pagination count={Object.values([schedule.guestList][0]).length} />
                </Table.Footer>
                
            </Table>
        </StyledScheduleDetail>
    )
}

export default ShowDetailSchedule
