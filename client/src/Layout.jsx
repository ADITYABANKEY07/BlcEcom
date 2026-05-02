import React from "react";
import TopBanner from "./components/TopBanner";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <TopBanner />
      <Header />

      <main className="flex-grow bg-white">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
