import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import {Header} from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
// import HeroSection from "./components/HeroSection/HeroSection";

function Layout() {
  const location = useLocation();

  // Hide header, hero, and footer on login page
  const hideHeaderFooter = location.pathname === "/login";

  return (
    <div>
      {!hideHeaderFooter && <Header />}
      {/* {!hideHeaderFooter && <HeroSection />} */}
      <Outlet /> {/* Render child routes */}
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default Layout;
