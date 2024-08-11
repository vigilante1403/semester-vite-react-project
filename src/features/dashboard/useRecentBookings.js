import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import {format} from 'date-fns'
import {getBookingsByDate} from '../../services/apiBookings'

export function useRecentBookings(){
    const [searchParams]=useSearchParams();
    const numDays = !searchParams.get('last')?7:Number(searchParams.get('last'))
    const queryDate = format(subDays(new Date(),numDays).toISOString(),'yyyy-MM-dd')  // need iSostring
    const formData = new FormData()
    formData.append('from',queryDate)
    function extractMonthAndDate(dateString) {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'short' }); // For full month name, use 'short' for abbreviation
        const day = date.getDate();
        return `${month} ${day}`;
      }
    let {data:bookings,isLoading}=useQuery({
        queryFn: ()=>getBookingsByDate(formData),
        queryKey:['bookings',`last-${numDays}`]
    })
    if(bookings){
        bookings=bookings.map((booking) => ({
            label: extractMonthAndDate(booking.createdAt.split('T')[0]),
            date: new Date(booking.createdAt),
            priceOrigin: booking.priceOrigin,
            priceFinal: booking.priceFinal,
          }))
    }
    return {bookings,isLoading}
}