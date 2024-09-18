import Heading from '../ui/Heading'
import SignupForm from '../features/authentication/SignupForm'
import Profile from '../features/authentication/Profile'
import { useFindUserByEmail } from '../features/authentication/useGetUser';
import { useEffect,useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { findUserByEmail} from '../services/apiUsers';
import axios from 'axios';
function Users() {
  const {userFindByEmail, isFinding} = useFindUserByEmail();
  const [user,setUser] = useState(null);
  useEffect(()=>{
    if(user ==null) {
    const cookieFind = Cookies.get('token-vtravel-lib0-authw') || null;
    const token = Cookies.get('token-vtravel-lib0-authw');
    console.log(token);
    // const payload = jwt.decode(token)
    const jwt = jwtDecode(token)
    console.log(jwt.sub);
    
    // const t = findUserByEmail(jwt.sub);
    // console.log(t);
    findUserByEmail(jwt.sub);
  }
  }, [userFindByEmail,user]);

  const findUserByEmail = async (email) => {
    await axios.get(`/users/email/${email}`).then((response) =>{setUser(response.data); console.log(response.data);
    });
   
  };
    return (
      
        <>
      <Heading as="h1">My info</Heading>
      <Profile />
    </>
    )
}

export default Users
