import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Sign} from "./pages/Sign.jsx"
import {Signin} from "./pages/Signin.jsx"
import {ErrorPage} from "./pages/ErrorPage.jsx"
import { ProtectedRoutes, UnProtectedRoutes } from './components/ProtectedRoutes.jsx'
import { Navbar } from './components/Navbar.jsx'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

const router = createBrowserRouter([
  {
    path : '/',
    element : <>
      <Navbar />
      <ProtectedRoutes>
      <App />
      </ProtectedRoutes>
    </>
  },
  {
    path : "/signup",
    element : <UnProtectedRoutes>
      <Sign />
    </UnProtectedRoutes>
  },
  {
    path : "/signin",
    element : <>
      <Navbar />
      <UnProtectedRoutes>
      <Signin />
      </UnProtectedRoutes>
    </>
  },
  {
    path : "*",
    element : <ErrorPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <>  
      <RouterProvider router={router}/>
    </>
  // </React.StrictMode>,
)
