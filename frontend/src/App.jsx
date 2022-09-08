import React from 'react'
import {Routes, Route} from 'react-router-dom'
import PrivateRoutes from './components/PrivateRoutes'
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'

function App() {

  return (
    <div className='h-screen bg-stone-50'>
    <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
