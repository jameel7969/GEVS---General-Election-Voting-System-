import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import './App.css'

import Registeration from './pages/Registeration'
import Login from "./pages/Login"
import UserDashBoard from './pages/UserDashBoard'
import AdminDashBoard from './pages/AdminDashboard'

const App = () => {
  const { user } = useAuthContext()

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={user ? !user.isAdmin ? <UserDashBoard /> : <Navigate to='/admin' /> : <Navigate to='/login' />} />
        <Route path='/register' element={!user ? <Registeration /> : user.isAdmin ? <Navigate to='/admin' /> :  <Navigate to='/' />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path="/admin" element={user ? <AdminDashBoard /> : <Navigate to='/login' />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App


