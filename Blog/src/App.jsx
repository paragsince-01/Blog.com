import React from 'react'
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import Home from './Componets/Home'
import About from './Componets/About'
import Projects from './Componets/Projects'
import Signin from './Componets/Signin'
import Signup from './Componets/Signup'
import Dashboard from './Componets/Dashboard'

export default function App() {
  return (
    <>
      <Router>
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
