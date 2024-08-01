import { useState, useEffect, Suspense, useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navbar } from './components/Navbar'
import { Dashboard } from './pages/Dashboard'
import { useAuthHook } from './hooks/authHook'

function App() {
  const [user, loading] = useAuthHook();
  return (
    <>
      <Dashboard /> 
    </>
  )
}



export default App
