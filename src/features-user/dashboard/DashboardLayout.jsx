import styled from "styled-components";
import UpcomingTrips from "./UpcomingTrips";
import HistoryTrips from "./HistoryTrips";
import SuggestTours from "./SuggestTours";
import Wishlist from "./Wishlist";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto  auto;
  gap: 2.4rem;
  padding-top:2.6rem;
`;
function DashboardLayout() {
    return (
        <StyledDashboardLayout>
            <UpcomingTrips />
            <HistoryTrips />
            <SuggestTours />
            <Wishlist />
        </StyledDashboardLayout>
    )
}

export default DashboardLayout
