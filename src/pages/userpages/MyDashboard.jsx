import { useContext } from 'react';
import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import { UserContext } from '../../ui/userLayout/ProtectedRouteUser';
import Spinner from '../../ui/Spinner';
import DashboardLayout from '../../features-user/dashboard/DashboardLayout';
function MyDashboard() {
  const { user } = useContext(UserContext);
  if (!user) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Welcome, {user.name}</Heading>
      </Row>
      <DashboardLayout />
    </>
  );
}

export default MyDashboard;
