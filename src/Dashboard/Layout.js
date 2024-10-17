import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import TopNav from './TopNav/TopNav';
import SideNav from './SideNav/SideNav';
import Swal from 'sweetalert2';

const Layout = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);
  const loggedIn = localStorage.getItem("loggedIn");
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn === "false" || loggedIn === null || !loggedIn) {
      Swal.fire({
        title: "Login Required",
        text: "You need to get logged in first! Please login to continue",
        icon: "error",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      document.getElementById("swal2-checkbox").style.display = "none";
    }
  })
  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  return (
    <>
      <TopNav toggleSideNav={toggleSideNav} isSideNavOpen={isSideNavOpen} />
      <div className='content toggle'>
        <SideNav isOpen={isSideNavOpen} />
        <div className="main-content toggle" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 60px)' }}>
          {/* This is where other components will be rendered based on route */}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
