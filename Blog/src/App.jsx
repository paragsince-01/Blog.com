import React from 'react'
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Projects from './Pages/Projects'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard'
import Header from './Components/Header'

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
          <Route path="/Dasboard" element={<Dashboard/>}/>
        </Routes>
      </Router>
    </>
  )
}
