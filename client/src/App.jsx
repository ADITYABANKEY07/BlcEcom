import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import AdminLayout from "./AdminLayout";
import Dashboard from "./admin/Dashboard";
import Login from "./admin/Login";
import Iphone from "./pages/Iphone";
import Samsung from "./pages/Samsung";
import Pixel from "./pages/Pixel";
import Ipad from "./pages/Ipad";
import Accessories from "./pages/Accessories";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SelectedDevices from "./pages/SelectedDevices";
import BestSellerDetails from "./pages/BestSellerDetails";
import AddProduct from "./admin/AddProduct";
import ProtectedRoute from "./utils/ProtectedRoute";
import AddToCart from "./pages/AddToCart";

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="iphone" element={<Iphone />} />
          <Route path="samsung" element={<Samsung />} />
          <Route path="pixel" element={<Pixel />} />
          <Route path="ipad" element={<Ipad />} />
          <Route path="accessories" element={<Accessories />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="device/:brand/:modelId" element={<SelectedDevices />} />
          <Route path="/product/:id" element={<BestSellerDetails />} />
          <Route path="/cart" element={<AddToCart />} />
        </Route>

        {/* Admin Login (separate) */}
        <Route path="/admin-login" element={<Login />} />

        {/* Admin Protected Routes */}
        <Route
          path="/apanel"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="addproduct" element={<AddProduct />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
