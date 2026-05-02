import { useState } from "react";
import loginImg from "../images/loginimg.png"; // use any good banner/product image
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  let navigate = useNavigate();
  let [input, setInput] = useState({
    email: "",
    password: "",
  });
  let handleInput = (e) => {
    let { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
let handleSubmit = async (e) => {
  e.preventDefault();

  try {
    let res = await axios.post(
      `${import.meta.env.VITE_API_URL}/admin/login`,
      input,
      { withCredentials: true }
    );

    toast.success(res.data.msg, {
      onClose: () => navigate("/apanel"),
    });

  } catch (error) {
    toast.error(error.response?.data?.msg || "Server not responding");
  }
};
  return (
    <div className="min-h-screen flex">
          <ToastContainer position="top-right" autoClose={2000} />
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
          <h2 className="text-3xl font-semibold mb-2">Admin Login</h2>
          <p className="text-gray-500 mb-8">Access your dashboard securely</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="text"
                placeholder="Enter admin email"
                name="email"
                value={input.email}
                onChange={handleInput}
                className="w-full border-b border-gray-300 focus:border-black outline-none py-2 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                name="password"
                value={input.password}
                onChange={handleInput}
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
