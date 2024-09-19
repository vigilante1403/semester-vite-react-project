import Heading from '../ui/Heading';

import Profile from '../features/authentication/Profile';

import { useContext } from 'react';

import { AdminContext } from '../ui/ProtectedRouteAdmin';

function Users() {
  const { user } = useContext(AdminContext);

  return (
    <>
      <Heading as="h1">My info</Heading>
      <Profile user={user} />
    </>
  );
}

export default Users;
