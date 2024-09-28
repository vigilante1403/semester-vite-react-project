import { createContext, useState } from "react";

export const LoginContext=createContext(null);
function LoginContextProvider({children}) {
    const [openLoginSignup, setOpenLoginSignup] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const handleLoginSignupOpen = (login) => {
        setIsLogin(login);
        setIsForgotPassword(false);
        setOpenLoginSignup(true);
      };
    
      const handleLoginSignupClose = () => {
        setOpenLoginSignup(false);
    
      };
    return (
        <LoginContext.Provider value={{drawerOpen,isLogin,isForgotPassword, setOpenLoginSignup,setDrawerOpen,setIsLogin,setIsForgotPassword, openLoginSignup,handleLoginSignupOpen,handleLoginSignupClose }}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider
