import Heading from '../ui/Heading'

import Profile from '../features/authentication/Profile'

import { useContext } from 'react';

import { AdminContext } from '../ui/ProtectedRouteAdmin';
import { HasRole } from '../utils/helpers';
function Users() {


  const { user } = useContext(AdminContext);

  const role = HasRole('USER');
  console.log(user);
  
  return (

    <>
      <Heading as="h1">My info</Heading>
      <Profile user={user} />
    </>
  )
}

export default Users