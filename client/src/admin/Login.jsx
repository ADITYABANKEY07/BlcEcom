import React from "react";
import loginImg from "../images/loginimg.png"; // use any good banner/product image

const Login = () => {
  return (
    <div className="min-h-screen flex">

      {/* LEFT IMAGE */}
      <div className="hidden md:flex w-1/2 bg-black items-center justify-center">
        <img
          src={loginImg}
          alt="login visual"
          className="object-cover h-full w-full opacity-90"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-white px-6">
        
        <div className="w-full max-w-md">
          
          {/* Heading */}
          <h2 className="text-3xl font-semibold mb-2">
            Admin Login
          </h2>
          <p className="text-gray-500 mb-8">
            Access your dashboard securely
          </p>

          {/* Form */}
          <form className="space-y-5">

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="text"
                placeholder="Enter admin email"
                className="w-full border-b border-gray-300 focus:border-black outline-none py-2 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full border-b border-gray-300 focus:border-black outline-none py-2 transition"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-3 mt-4 hover:bg-gray-900 transition"
            >
              Login
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;