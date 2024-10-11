import { useQuery } from "@tanstack/react-query";
import { getAllBills, getBillsFromDate } from "../../services/apiBill"
import { useSearchParams } from "react-router-dom";
import { format, subDays } from "date-fns";

export function useBills(){
    const {data:bills,isLoading}=useQuery({
        queryKey:['bills'],
        retry:false,
        queryFn:getAllBills
    })
    return {bills,isLoading};
}
export function useRecentBills(){
    const [searchParams]=useSearchParams()
    const numDays = !searchParams.get('last')?7:Number(searchParams.get('last'))
    const queryDate = format(subDays(new Date(),numDays).toISOString(),'yyyy-MM-dd')  // need iSostring
    
    function extractMonthAndDate(dateString) {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'short' }); // For full month name, use 'short' for abbreviation
        var dateShowing = date.getDate();
        if(dateShowing>=1&&dateShowing<10){
            dateShowing="0"+dateShowing
        }
        const day = dateShowing;

        return `${month} ${day}`;
      }
    let {data:bills,isLoading}=useQuery({
        queryFn: ()=>getBillsFromDate({date:queryDate}),
        queryKey:['bills',`last-${numDays}`]
    })
    
    return {bills,isLoading}
}