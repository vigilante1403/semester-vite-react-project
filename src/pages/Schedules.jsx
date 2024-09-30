import AddSchedule from "../features/schedules/AddSchedule"
import ScheduleTable from "../features/schedules/ScheduleTable"
import Heading from "../ui/Heading"
import Row from "../ui/Row"
import Searchbar from "../ui/Searchbar"

function Schedules() {
    return (
        <><Row type="horizontal">
            <Heading as="h1">All schedules</Heading>

        </Row><Row>
                <Searchbar placeholder={"Search bill by id"}  />
                <ScheduleTable />
                <AddSchedule/>

            </Row></>
    )
}

export default Schedules
