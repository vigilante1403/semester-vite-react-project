import Heading from '../ui/Heading';

import Profile from '../features/authentication/Profile';

import { useContext } from 'react';

import { AdminContext } from '../ui/ProtectedRouteAdmin';
import { UserContext } from '../ui/userLayout/ProtectedRouteUser';

function Users() {
  var user;
  const valueAuthenticated1 = useContext(AdminContext);
  const valueAuthenticated2=useContext(UserContext)
  if(valueAuthenticated1){
    user = valueAuthenticated1.user
  }else if(valueAuthenticated2){
    user=valueAuthenticated2.user
  }

  return (
    <>
      <Heading as="h1" style={{ display:'flex',justifyContent:'center' }}>My info</Heading>
      <Profile user={user} />
    </>
  );
}

export default Users;
