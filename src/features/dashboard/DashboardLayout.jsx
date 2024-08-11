import styled from "styled-components";

import Spinner from "../../ui/Spinner";



import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import { useTours } from "../tours/useTours";
// import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
//   const {bookings,isLoading}=useRecentBookings()
//   const {numDays,stays,confirmedStays,isLoading:isLoadingStays}=useRecentStays()
  const {tours,isLoading:isLoadingTour}=useTours()
//   if(isLoading||isLoadingStays||isLoadingCabin) return <Spinner />
if(isLoadingTour) return <Spinner />
  return (
    <StyledDashboardLayout>
      {/* <Stats bookings={tours} numDays={10} numCabins={tours.length} confirmStays={confirmedStays} /> */}
      {/* <TodayActivity /> */}
      <DurationChart confirmedStays={tours} />
      <SalesChart bookings={tours} numDays={7} />
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
