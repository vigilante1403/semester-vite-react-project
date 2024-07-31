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
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="login" />} />
            {/* phan cho admin se co filter role va authentication sau */}
            <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard/>}  />
            <Route path="tours" />
            <Route path="users" />
            <Route path="bookings" />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
    </BrowserRouter><Toaster
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
