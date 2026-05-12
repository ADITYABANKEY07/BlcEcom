import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import AdminLayout from "./AdminLayout";
import Dashboard from "./admin/Dashboard";
import AdminLogin from "./admin/Login";
import Accessories from "./pages/Accessories";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SelectedDevices from "./pages/SelectedDevices";
import BestSellerDetails from "./pages/BestSellerDetails";
import AddProduct from "./admin/AddProduct";
import ProtectedRoute from "./utils/ProtectedRoute";
import AddToCart from "./pages/AddToCart";
import ProductDetails from "./pages/ProductDetails";
import Collections from "./pages/Collections";
import Checkout from "./pages/Checkout";
import AllProduct from "./admin/AllProduct";
import UpdateProduct from "./admin/UpdateProduct";
import AdminOrders from "./admin/AdminOrders";
import Success from "./pages/Success";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import LoginSuccess from "./components/LoginSuccess";

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="accessories" element={<Accessories />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="device/:brand/:model" element={<SelectedDevices />} />
          <Route path="product/:id" element={<BestSellerDetails />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="cart" element={<AddToCart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="collection/:brand/:model" element={<Collections />} />
          <Route path="success" element={<Success />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="login-success" element={<LoginSuccess />} />
        </Route>

        {/* Admin Login (separate) */}
        <Route path="/admin-login" element={<AdminLogin />} />

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
          <Route path="allproduct" element={<AllProduct />} />
          <Route path="update/:id" element={<UpdateProduct />} />
          <Route path="adminorders" element={<AdminOrders />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
