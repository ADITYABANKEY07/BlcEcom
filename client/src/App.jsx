import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import AdminLayout from "./AdminLayout";
import Overview from "./admin/Overview";
import Login from "./admin/Login"; // make sure imported

const App = () => {
  return (
    <div>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
        </Route>

        {/* Admin Login (separate) */}
        <Route path="/admin-login" element={<Login />} />

        {/* Admin Protected Routes */}
        <Route path="/apanel" element={<AdminLayout />}>
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
        </Route>

      </Routes>
    </div>
  );
};

export default App;