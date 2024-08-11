import styled from 'styled-components';
import { useState } from 'react';
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';
import Stats from '../../ui/Stats';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import { useTours } from '../tours/useTours';
import { useSearchParams } from 'react-router-dom';
import { useRecentBookings } from './useRecentBookings';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  const [dataSale, setDataSale] = useState([]);
  const { tours, isLoading: isLoadingTour } = useTours();
  const [searchParams] = useSearchParams();
  const numDays = Number(searchParams.get('last')) || 7;
  const { bookings, isLoading } = useRecentBookings();

 
  if (isLoadingTour || isLoading) return <Spinner />;
  if (!tours || !bookings) return <Empty resourceName="tours" />;
  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmStays={[...bookings].filter(booking=>booking.paid)} />
      {/* <TodayActivity /> */}
      <DurationChart confirmedStays={tours} />
      <SalesChart
        bookings={bookings}
        numDays={numDays}
      />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
