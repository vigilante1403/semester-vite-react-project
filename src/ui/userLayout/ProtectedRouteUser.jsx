import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { createContext, useEffect } from "react";
import { useAuthenticate } from "../../features-user/security/useAuthenticate";
import Spinner from "../Spinner";
import toast from "react-hot-toast";
const FullPage=styled.div`
height: 100vh;
background-color: var(--color-grey-50);
display: flex;
align-items: center;
justify-content: center;
`
export const UserContext = createContext(null);
function ProtectedRouteUser({children}) {
    const navigate=useNavigate();
    // /// 1 load the authentcated user
     const {isAuthenticated,isLoading,user}=useAuthenticate();
    // /// 2 if there is no authen user, redirect to /login
    useEffect(function(){
        if(!isAuthenticated&&!isLoading) navigate('/')
            // toast.error('Please login to access your dashboard')
    },[isAuthenticated, isLoading, navigate])
    /// 3 show a spinner while loading
    if(isLoading) return (<FullPage><Spinner/></FullPage>)
    /// 4 if user, render the app
    if(isAuthenticated) return( <UserContext.Provider 
    value={{ isAuthenticated,user,isLoading }}
    >{children}</UserContext.Provider>) ;
   
}

export default ProtectedRouteUser