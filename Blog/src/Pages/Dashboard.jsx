import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardSidebar from "../Components/DashboardSidebar";
import DashboardProfile from "../Components/DashboardProfile";
import DashboardPosts from "../Components/DashboardPosts";
import DashboardUsers from "../Components/DashboardUsers";

export default function Dashboard() {
  const loaction = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(loaction.search);
    const tabFormUrl = urlParams.get("tab");
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [loaction.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* ------------sidebar ------------*/}
      <div className="md:w-56">
        <DashboardSidebar />
      </div>
      {/* ------------profile ------------*/}
      {tab === "profile" && <DashboardProfile />}

      {/* ------------posts ------------*/}
      {tab === "posts" && <DashboardPosts />}
      
      {/* ------------users------------*/}
      {tab === "users" && <DashboardUsers />}
    </div>
  );
}
