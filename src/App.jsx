import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppLayout from './ui/AppLayout';
import GlobalStyles from './styles/GlobalStyles';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AdminLayout from './ui/AdminLayout';
import Dashboard from './pages/Dashboard';
import Tours from './pages/Tours';
import Users from './pages/Users';
import Bookings from './pages/Bookings';
import Accounts from './pages/Accounts';
import Checkin from './pages/Checkin';
import BookingDetail from './features/bookings/BookingDetail';
import GeocodeComponent from './pages/GeocodeComponent';
import { DarkModeProvider } from './context/DarkModeContext';
import HomePage from './pages/userpages/HomePage';
import TourPage from './pages/userpages/TourPage';
import ContactPage from './pages/userpages/ContactPage';
import UserLayout from './ui/userLayout/UserLayout';
import TourDetail from './features/tours/TourDetails';
import AccountDetail from './features/authentication/AccountDetail'
import ProtectedRouteAdmin from './ui/ProtectedRouteAdmin';
import AuthenticatedUserLayout from './ui/userLayout/AuthenticatedUserLayout';
import ProtectedRouteUser from './ui/userLayout/ProtectedRouteUser'
import MyDashboard from './pages/userpages/MyDashboard';
import MyReviews from './pages/userpages/MyReviews'
import MyBookings from './pages/userpages/MyBookings'
import MyStatistics from './pages/userpages/MyStatistics'
import MySettings from './pages/userpages/MySettings'
import AboutMe from './pages/userpages/AboutMe'
import Verification from './pages/userpages/Verification'
import VerifySuccess from './pages/userpages/VerifySuccess';
import TourDetailPage from './pages/userpages/TourDetailPage';
import ResetPasswordPage from './pages/userpages/ResetPasswordPage';
import ResetPasswordSuccess from './pages/userpages/ResetpasswordSuccess';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <DarkModeProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<Navigate replace to="home" />} />
                <Route path="" element={<UserLayout />}>
                {/* for all */}
                  <Route index element={<Navigate replace to="home" />} />
                  <Route path="home" element={<HomePage />} />
                  <Route path="tours" element={<TourPage />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="signup/signUpVerificationRequired" element={<Verification/>} />
                  <Route path="/verifyAccount/:email/:token" element={<VerifySuccess/>} />
                  {/* user part */}
                  <Route path="/tours/tour-detail/:id" element={<TourDetailPage/>} />
                  <Route path="*" element={<PageNotFound />} />
                </Route>
                <Route path="user" element={<ProtectedRouteUser><AuthenticatedUserLayout/></ProtectedRouteUser>}>
                    <Route index element={<Navigate replace to="dashboard"/>} />
                    <Route path="dashboard" element={<MyDashboard/>} />
                    <Route path="me" element={<AboutMe/>} />
                    <Route path="bookings" element={<MyBookings/>} />
                    <Route path="reviews" element={<MyReviews/>} />
                    <Route path="statistics" element={<MyStatistics/>} />
                    <Route path="settings" element={<MySettings/>} />
                    <Route path="*" element={<PageNotFound />} />
                  </Route>
              {/* for admin */}
                <Route path="admin" element={<ProtectedRouteAdmin><AdminLayout /></ProtectedRouteAdmin>}>
                  <Route index element={<Navigate replace to="dashboard" />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="tours" element={<Tours />} />
                  <Route path='tours/:id' element={<TourDetail/>} />
                  <Route path="geo" element={<GeocodeComponent />} />
                  <Route path="accounts" element={<Accounts />} />
                  <Route path="accounts/:id" element={<AccountDetail/>} />
                  <Route path="users" element={<Users />} />
                  <Route path="bookings" element={<Bookings />} />
                  <Route
                    path="bookings/:bookingId"
                    element={<BookingDetail />}
                  />
                  <Route path="checkins/:bookingId" element={<Checkin />} />
                  <Route path="*" element={<PageNotFound />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
              </Route>
              <Route path="admin/login" element={<Login />} />
              <Route path="/reset-password/:email/:token" element={<ResetPasswordPage/>} />
              <Route path="/reset-password/success" element={<ResetPasswordSuccess/>} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </DarkModeProvider>
        <Toaster
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
          }}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
