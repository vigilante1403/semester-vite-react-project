import { Typography } from "@mui/material";
import TourDetail from "../../features-user/tours/TourDetail";
import { useTour } from "../../features/tours/useTour";
import Spinner from "../../ui/Spinner";
import { useTours } from "../../features/tours/useTours";
import { useEffect } from "react";

export default function TourDetailPage() {
   const { tour, isLoading } = useTour();
   const { tours, isLoading: isLoading2 } = useTours();
   if (isLoading || isLoading2) return <Spinner />

   const otherTours = tours.filter(t => t.id !== tour.id);
   return (
      <>
         <TourDetail tour={tour} otherTours={otherTours}></TourDetail>
      </>
   )
}