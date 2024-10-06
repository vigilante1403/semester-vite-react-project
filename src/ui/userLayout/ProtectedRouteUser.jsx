import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { useAuthenticate } from "../../features-user/security/useAuthenticate";
import Spinner from "../Spinner";
import toast from "react-hot-toast";
import Modal from "../Modal";
import TokenExpired from "../TokenExpired";
import { useLogout } from "../../features/authentication/useLogout";
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
     const {logout}=useLogout()
    // /// 2 if there is no authen user, redirect to /login
    // useEffect(function(){
    //     if(!isAuthenticated&&!isLoading) navigate('/')
    //         // toast.error('Please login to access your dashboard')
    // },[isAuthenticated, isLoading, navigate])
    /// 3 show a spinner while loading
    // if(isLoading) return (<FullPage><Spinner/></FullPage>)
    /// 4 if user, render the app

    useEffect(function(){
        // if(!isAuthenticated) window.location.reload()
        if(isAuthenticated) {
            console.log('running')
            var date = Date.now();
            var date2 = user.tokenExpiresInMs;
            console.log(date2)
            var duration = date2-date;
            console.log(duration)
            if(duration>0){
                setTimeout(()=>logout(),duration)
            }else{
                logout();
            }
        }
       
    },[isAuthenticated])
    if(isLoading) return <FullPage><Spinner/></FullPage>
    if(isAuthenticated) return( <UserContext.Provider 
    value={{ isAuthenticated,user,isLoading }}
    >{children}</UserContext.Provider>) ;
    if(!isAuthenticated) return (
        <Modal>
            <Modal.AutoOpen name={'token-expired'} />
            <Modal.Window name={'token-expired'}>
                <TokenExpired />
            </Modal.Window>
        </Modal>
    )
   
}

export default ProtectedRouteUser