import React, {useState, useEffect} from "react";
import { Sidebar, SidebarItem, SidebarItems } from "flowbite-react";
import {HiUser, HiArrowSmRight} from 'react-icons/hi'
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/User/userSlice";

export default function DashboardSidebar() {
    const loaction = useLocation();
    const dispatch = useDispatch();
    const [tab, setTab] = useState('')
    useEffect(()=>{
      const urlParams = new URLSearchParams(loaction.search)
      const tabFormUrl = urlParams.get('tab');
      if(tabFormUrl){
        setTab(tabFormUrl);
      }
    });

    
  // Signed out the user

  const handleSignout = async () => {
    try {
      const res = await fetch("api/user/signout", {
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
    <Sidebar className="w-full md-w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
            <Link to='/Dashboard?tab=profile'>
            <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={'User'} labelcolor='dark' as='div'>
                Profile
            </Sidebar.Item>
            </Link>
            {/* ------------------ */}
            <Sidebar.Item  icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout}>
                Sign Out
            </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
