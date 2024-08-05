import {Route,BrowserRouter,Routes,Navigate} from "react-router-dom"
import { Toaster } from 'react-hot-toast'
import AppLayout from "./ui/AppLayout"
import GlobalStyles from "./styles/GlobalStyles"
import Login from "./pages/Login"
import PageNotFound from "./pages/PageNotFound"
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import AdminLayout from "./ui/AdminLayout"
import Dashboard from "./pages/Dashboard"
import Tours from "./pages/Tours"
import Users from "./pages/Users"
import Bookings from "./pages/Bookings"
import Accounts from "./pages/Accounts"
import { DarkModeProvider } from "./context/DarkModeContext"
import HomePage from './pages/userpages/HomePage';
import TourPage from './pages/userpages/TourPage';
import ContactPage from './pages/userpages/ContactPage';
import UserLayout from './ui/userLayout/UserLayout';

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:0
    }
  }
})

function App() {
  return(
    <><QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <DarkModeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="home" />} />
                <Route path="" element={<UserLayout />}>
                <Route index element={<Navigate replace to="home" />} />
                <Route path="home" element={<HomePage />} />
                {/* <Route path="login" element={<Login />} /> */}

                <Route path="tours" element={<TourPage />} />
                <Route path="contact" element={<ContactPage />} />
                  </Route> 
            {/* phan cho admin se co filter role va authentication sau */}
            <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard/>}  />
            <Route path="tours" element={<Tours/>} />
            <Route path="accounts" element={<Accounts/>} />
            <Route path="users" element={<Users/>} />
            <Route path="bookings" element={<Bookings/>} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
    </BrowserRouter>
    </DarkModeProvider><Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'var(--color-grey-0)',
            color: 'var(--color-grey-700)',
          },
        }} /></QueryClientProvider></>
  )
}

export default App
