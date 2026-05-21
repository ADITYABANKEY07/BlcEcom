import React, { useEffect, useRef, useState } from "react";
import { User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const UserDropDown = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  // ✅ GET USER
  const user = JSON.parse(localStorage.getItem("user"));

  const dropdownRef = useRef();

  // ✅ CLOSE DROPDOWN OUTSIDE CLICK
  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  // ✅ LOGOUT
  const handleLogout = () => {
    // REMOVE USER
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");

    window.location.reload();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* USER BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="cursor-pointer"
      >
        {user && user.image ? (
          <img
            src={user.image}
            alt={user.name}
            referrerPolicy="no-referrer"
            className="w-9 h-9 rounded-full object-cover border border-gray-200 hover:border-orange-500 transition"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:bg-orange-500 transition">
            <User size={18} />
          </div>
        )}
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 top-12 w-64 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden z-50">

          {user ? (
            <>
              {/* USER INFO */}
              <div className="px-4 py-4 border-b border-gray-100 flex items-center gap-3">

                {user?.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center">
                    <User size={20} />
                  </div>
                )}

                <div>
                  <p className="text-sm font-semibold text-black">
                    {user.name}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* MENU */}
              <div className="flex flex-col">

                <Link
                  to="/myorders"
                  className="px-4 py-3 text-sm hover:bg-gray-50 transition"
                >
                  My Orders
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-4 py-3 text-left text-sm text-red-500 hover:bg-red-50 transition"
                >
                  Logout
                </button>

              </div>
            </>
          ) : (
            <div className="p-4">
              <Link
                to="/login"
                className="w-full block text-center bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDropDown;