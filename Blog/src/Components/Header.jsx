import React from "react";
import {
  Button,
  Navbar,
  Dropdown,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  TextInput,
  Avatar,
  DropdownHeader,
  DropdownItem,
  DropdownDivider,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/User/userSlice";

export default function Header() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const {theme} = useSelector((state)=> state.theme);
  const dispatch = useDispatch();

  // Signed out the user

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar className="border-b-2">
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-4 py-1 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
            {" "}
            Parag's
          </span>
          Blog
        </Link>
        <form>
          <TextInput
            type="text"
            placeholder="Search...."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
          />
        </form>
        <Button className="w-12 h-10 bg-white border-2 border-solid border-gray-200 rounded-full md:hidden">
          <AiOutlineSearch className="text-gray-500 text-lg " />
        </Button>
        <div className="flex gap-2 md:order-2">
          <Button className="w-12 h-10 hidden sm:inline text-4xl bg-white border-2 border-solid border-gray-200 rounded-full justify-center items-center px-0 hover:bg-none focus:bg-none" pill onClick={()=>dispatch(toggleTheme())}>

            {theme === 'light' ? <FontAwesomeIcon icon={faSun} className="text-black text-sm pr-2 hover:bg-none focus:bg-none" /> : <FontAwesomeIcon icon={faMoon} className="text-black text-sm hover:bg-none focus:bg-none" /> }
          </Button>
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt="user" img={currentUser.profilePicture} rounded />
              }
            >
              <Dropdown.Header>
                <span className='block text-sm'>@{currentUser.username}</span>
                <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
              </Dropdown.Header>
              <Link to='/Dashboard?tab=profile'>
              <Dropdown.Item>Profile</Dropdown.Item></Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignout}>Sign-Out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="/Signin">
              <Button gradientDuoTone="purpleToBlue" outline>
                Sign-In
              </Button>
            </Link>
          )}

          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link active={path === "/"} as={"div"}>
            <Link to="/">Home</Link>
          </Navbar.Link>

          <Navbar.Link active={path === "/About"} as={"div"}>
            <Link to="/About">About</Link>
          </Navbar.Link>

          <Navbar.Link active={path === "/Projects"} as={"div"}>
            <Link to="/Projects">Projects</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
