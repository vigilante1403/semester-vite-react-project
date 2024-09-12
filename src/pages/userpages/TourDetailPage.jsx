import { Typography } from "@mui/material";
import TourDetail from "../../features-user/tours/TourDetail";
import { useTour } from "../../features/tours/useTour";
import Spinner from "../../ui/Spinner";

export default function TourDetailPage() {
    const { tour,isLoading} = useTour();
    if(isLoading) return <Spinner/>
    console.log(tour)
 return(
    <>
       <TourDetail tour={tour}></TourDetail>
    </>
 )
}