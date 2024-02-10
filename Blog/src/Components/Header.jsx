import React from 'react'
import {Button, Navbar, NavbarCollapse, NavbarLink, NavbarToggle, TextInput} from 'flowbite-react'
import {Link , useLocation} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import {AiOutlineSearch} from "react-icons/ai"
// import { FaMoon } from 'react-icons/fa'

export default function Header() {
  const path = useLocation().pathname;
  return (
    <>
      <Navbar className='border-b-2'>
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-4 py-1 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white'> Parag's</span>
        Blog
        </Link>
    <form>
        <TextInput 
        type='text'
        placeholder='Search....' 
        rightIcon={AiOutlineSearch} 
        className='hidden lg:inline'
        />
    </form>
    <Button className='w-12 h-10 bg-white border-2 border-solid border-gray-200 rounded-full'>
      <AiOutlineSearch className='text-gray-500 text-lg' />
    </Button>
    <div className="flex gap-2 md:order-2">
    <Button className="w-12 h-10 hidden sm:inline text-4xl bg-white border-2 border-solid border-gray-200 rounded-full justify-center items-center">
      <FontAwesomeIcon icon={faMoon} className='text-black text-sm '/>
    </Button>
    <Link to="/Signin">
    <Button className='bg-gradient-to-r from-indigo-500 to-purple-500'>
    Sign-In
    </Button>
    </Link>
      <Navbar.Toggle />    
    </div>
    <Navbar.Collapse>
      <Navbar.Link active={path === "/"} as={'div'}>
        <Link to="/">
          Home
        </Link>
      </Navbar.Link>

      <Navbar.Link active={path === "/About"} as={'div'}>
        <Link to="/About">
          About
        </Link>
      </Navbar.Link>

      <Navbar.Link active={path === "/Projects"} as={'div'}>
        <Link to="/Projects">
          Projects
        </Link>
      </Navbar.Link>
    </Navbar.Collapse>
      </Navbar>
    </>
  )
}