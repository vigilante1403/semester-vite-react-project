import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {ErrorBoundary} from 'react-error-boundary'
import ErrorFallback from './ui/ErrorFallback.jsx'
import axios from 'axios';
import toast from 'react-hot-toast'

axios.defaults.baseURL='http://localhost:8080/api/v1';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(request=>{
  return request;
},error=>{
  toast.error(error);
  return Promise.reject(error);
})
axios.interceptors.response.use(response=>{
  return response
},error=>{
  // toast.error(error.response.data.message);
  return Promise.reject(error)
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <ErrorBoundary FallbackComponent={ErrorFallback} onReset={()=>window.location.replace("/")}>
    <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
