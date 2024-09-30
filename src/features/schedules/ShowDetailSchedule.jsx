import Spinner from "../../ui/Spinner"
import { useGetAllSchedulesOfAGuide, useGetDetailSchedule } from "./useSchedules"

function ShowDetailSchedule({scheduleId=null}) {
    const {schedules,isLoading}=useGetDetailSchedule({scheduleId:scheduleId})
    if(isLoading) return <Spinner />

    return (
        <div>
            schedule
        </div>
    )
}

export default ShowDetailSchedule
