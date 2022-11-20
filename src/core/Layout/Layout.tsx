import React from "react";
/* import react router dom packages */
import { Outlet, useLocation } from "react-router-dom";

/* import local components */
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";

/* import react router packages */

const Layout = () => {
  let location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/register") {
    return <Outlet />;
  }

  /* write more conditions here if you like */
  return (
    <>
      <Header />
      <main className="flex">
        <div className="flex-shrink-0">
          <Sidebar />
        </div>
        <div className="flex-grow">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
