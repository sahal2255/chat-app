import React, { useEffect } from 'react'
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
import Login from '../Pages/Login'
import SingUp from '../Pages/SingUp'
import HomePage from '../Pages/HomePage'
import Profile from '../Pages/Profile'
import Settings from '../Pages/Settings'
import { useAuthStore } from '../store/useAuthStore'
import { BiLoader } from 'react-icons/bi'
import { Toaster } from 'react-hot-toast'
const Router = () => {
const {authUser,checkAuth,isCheckingAuth,onlineUsers}=useAuthStore()
console.log('online user in the ',onlineUsers)
useEffect(()=>{
  checkAuth()
},[checkAuth])

console.log(authUser)
if(isCheckingAuth && !authUser) return (
  <div className=' flex items-center justify-center h-screen'>
    <BiLoader className=' size-10 animate-spin'/>
  </div>
)
  return (
    <>
    <Routes>
        <Route path='/login' element={!authUser ?<Login />:<Navigate to='/' />} />
        <Route path='/signup' element={!authUser ?<SingUp />:<Navigate to='/' />} />
        <Route path='/' element={authUser ?<HomePage /> :<Navigate to='/login'/>} />
        <Route path='/profile' element={authUser ?<Profile />:<Navigate to='/login'/>} />
        <Route path='/settings' element={<Settings />} />
    </Routes>
    <Toaster />
    </>
    
  )
}

export default Router
