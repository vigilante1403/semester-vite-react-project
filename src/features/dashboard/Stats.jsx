import { HiBriefcase, HiOutlineBanknotes, HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({bookings,confirmStays,numDays,numCabins}) {
    /// 1
    const numBookings = bookings.length;
    // 2
    const sales = bookings.reduce((acc,cur)=>acc+cur.totalPrice,0)
    /// 3
    const checkins = confirmStays.length
    /// 4 number of check in nights/ available nights (num days * num cabins)
    const occupation = confirmStays.reduce((acc,cur)=>acc+cur.numNights,0)/(numDays*numCabins)
    return (
        <>
            <Stat title='Bookings' color='blue' icon={<HiBriefcase/>} value={numBookings} />
            <Stat title='Sales' color='green' icon={<HiOutlineBanknotes/>} value={formatCurrency(sales)} />
            <Stat title='Check ins' color='indigo' icon={<HiOutlineCalendarDays/>} value={checkins} />
            <Stat title='Occupancy rate' color='yellow' icon={<HiOutlineChartBar/>} value={Math.round(occupation*100)+'%'} />
        </>
    )
}

export default Stats