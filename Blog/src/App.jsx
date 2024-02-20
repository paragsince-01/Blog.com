import React from 'react'
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Projects from './Pages/Projects'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard'
import Header from './Components/Header'
import Footer from './Components/Footer'
import PrivateRoute from './Components/PrivateRoute'
import IsAdminPrivateRoute from './Components/IsAdminPrivateRoute'
import Create_Post from './Pages/Create_Post'
import Update_Post from './Pages/Update_Post'

export default function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/About" element={<About/>}/>
          <Route path="/Projects" element={<Projects />}/>
          <Route path="/Signin" element={<Signin/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          {/* Private Route only for user not for visitor */}
          <Route element={<PrivateRoute />}>
             <Route path="/Dashboard" element={<Dashboard/>}/>
          </Route>         
           {/*Private Route only for admin  */}
          <Route element={<IsAdminPrivateRoute />}>
            <Route path='/Create_Post' element={<Create_Post />} />
            <Route path='/Update_Post/:postId' element={<Update_Post />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </>
  )
}
