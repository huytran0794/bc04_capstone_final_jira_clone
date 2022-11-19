import React from "react";
/* import react router dom packages */
import { Outlet, useLocation } from "react-router-dom";

/* import local components */
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";

/* import react router packages */

const Layout = () => {
  let location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/register") {
    return <Outlet />;
  }

  /* write more conditions here if you like */
  return (
    <>
      <div className='mx-auto container mb-10'><Header/></div>

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Layout;
