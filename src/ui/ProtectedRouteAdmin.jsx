import styled from "styled-components";
import { useAuthenticate } from "../features/authentication/useAuthenticate";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const FullPage=styled.div`
height: 100vh;
background-color: var(--color-grey-50);
display: flex;
align-items: center;
justify-content: center;
`
function ProtectedRouteAdmin({children}) {
    const navigate=useNavigate()
    /// 1 load the authentcated user
    const {isAuthenticated,isLoading}=useAuthenticate();
    /// 2 if there is no authen user, redirect to /login
    useEffect(function(){
        if(!isAuthenticated&&!isLoading) navigate('/admin/login')
    },[isAuthenticated, isLoading, navigate])
    /// 3 show a spinner while loading
    if(isLoading) return (<FullPage><Spinner/></FullPage>)
    /// 4 if user, render the app
    if(isAuthenticated) return children
}

export default ProtectedRouteAdmin