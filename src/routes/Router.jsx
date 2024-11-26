import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from '../Pages/Login'
import SingUp from '../Pages/SingUp'
const Router = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SingUp />} />
    </Routes>
    </BrowserRouter>
  )
}

export default Router
