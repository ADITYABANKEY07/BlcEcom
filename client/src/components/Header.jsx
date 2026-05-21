import { useEffect, useState } from "react";
import { Search, User, ShoppingBag, Menu } from "lucide-react";
import logo from "../images/blc.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import UserDropDown from "./UserDropDown";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();

  const [menuData, setMenuData] = useState({});

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/product/menu`,
        );
        setMenuData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMenu();
  }, []);

  const handleSearchToggle = () => {
    setOpenSearch((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".search-box")) {
        setOpenSearch(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    navigate(`/search?q=${searchQuery}`);
  };

  // Sticky hide/show on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 5000) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  const cartData = useSelector((state) => state.mycart.cart);
  const cartLen = cartData.length;

  return (
    <>
      {/* Header */}
      <header
        className={`sticky top-0 z-50 bg-white shadow-xl transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-[1400px] mx-auto h-[80px] flex items-center justify-between px-4 md:px-10">
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Menu
              onClick={() => setMobileMenu(!mobileMenu)}
              className="cursor-pointer"
            />
          </div>

          {/* Logo */}
          <div className="flex-1 text-center md:text-left">
            <img src={logo} alt="logo" className="h-20 mx-auto md:mx-0" />
          </div>

          {/* Nav */}
          <nav className="hidden md:flex flex-1 justify-center">
            <ul className="flex gap-8 text-sm font-semibold uppercase tracking-wide">
              <Link to={"/home"}>Home</Link>
              {/* SMART DEVICE with Vertical Menu */}
              <li className="group relative list-none">
                <Link
                  to="#"
                  className="flex items-center gap-1 hover:text-orange-500 transition-colors"
                >
                  SMART DEVICE
                  {/* Animated Arrow */}
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Link>

                {/* 🔥 LEVEL 2 (BRANDS) */}
                <div className="absolute left-0 top-full pt-2 w-56 z-[999]">
                  <div
                    className="bg-white shadow-xl py-4 border-t-4 border-orange-500
        opacity-0 invisible translate-y-2 
        group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 
        transition-all duration-300"
                  >
                    {Object.keys(menuData).map((brand) => (
                      <div key={brand} className="relative group/sub">
                        {/* 🔹 BRAND */}
                        <div className="px-6 py-2 flex justify-between items-center hover:bg-orange-50 cursor-pointer capitalize">
                          {brand}
                          <span>›</span>
                        </div>

                        {/* 🔥 LEVEL 3 (MODELS) */}
                        <div className="absolute left-full top-0 pt-2 w-56 z-[999]">
                          <div
                            className="bg-white shadow-xl py-3 
                opacity-0 invisible translate-x-2 
                group-hover/sub:opacity-100 group-hover/sub:visible group-hover/sub:translate-x-0 
                transition-all duration-300"
                          >
                            {menuData[brand].map((model, i) => (
                              <Link
                                key={i}
                                to={`/collection/${brand}/${encodeURIComponent(model)}`}
                                className="block px-5 py-2 text-sm hover:bg-orange-50 hover:text-orange-500 capitalize"
                              >
                                {model}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </li>

              <Link to={"/about"}>About</Link>
              <Link to={"/contact"}>Contact Us</Link>
            </ul>
          </nav>

          {/* Actions */}
          <div className="search-box relative flex-1 flex justify-end items-center gap-6">
            <div onClick={handleSearchToggle}>
              <Search className="cursor-pointer hover:text-orange-500 transition" />
            </div>
            {openSearch && (
              <div className="absolute top-10 right-0 bg-white shadow-lg p-3 rounded-lg">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border px-3 py-2 rounded w-64 outline-none"
                />
                <button onClick={handleSearch}>
                  <Search className="cursor-pointer hover:text-orange-500 transition" />
                </button>
              </div>
            )}

            <UserDropDown />

            {/* Cart */}
            <Link
              to={"cart"}
              className="relative cursor-pointer hover:text-orange-500 transition"
            >
              <ShoppingBag />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {cartLen}
              </span>
            </Link>
          </div>
        </div>
      </header>
      {/* MOBILE SIDEBAR */}

<div
  className={`

    md:hidden

    fixed top-0 left-0

    h-full w-[280px]

    bg-white

    z-[999]

    shadow-2xl

    transition-transform duration-300

    ${
      mobileMenu
        ? "translate-x-0"

        : "-translate-x-full"
    }

  `}
>

  {/* TOP */}

  <div className="flex items-center justify-between p-5 border-b">

    <h2 className="font-bold text-lg">
      Menu
    </h2>

    <button
      onClick={() =>
        setMobileMenu(false)
      }
      className="text-2xl"
    >
      ×
    </button>

  </div>

  {/* LINKS */}

  <div className="flex flex-col p-5 gap-5 text-sm font-semibold uppercase overflow-y-auto h-full pb-20">

    <Link
      to="/home"

      onClick={() =>
        setMobileMenu(false)
      }
    >
      Home
    </Link>

    {/* SMART DEVICE */}

    <div>

      <p className="mb-3 text-gray-400">
        Smart Device
      </p>

      <div className="flex flex-col gap-4 pl-2">

        {
          Object.keys(menuData).map(
            (brand) => (

              <div key={brand}>

                <p className="capitalize text-orange-500 font-bold mb-2">
                  {brand}
                </p>

                <div className="flex flex-col gap-2 pl-3">

                  {
                    menuData[brand].map(
                      (model, i) => (

                        <Link

                          key={i}

                          to={`/collection/${brand}/${encodeURIComponent(model)}`}

                          onClick={() =>
                            setMobileMenu(false)
                          }

                          className="text-xs capitalize text-gray-700"
                        >

                          {model}

                        </Link>
                      )
                    )
                  }

                </div>

              </div>
            )
          )
        }

      </div>

    </div>

    <Link
      to="/about"

      onClick={() =>
        setMobileMenu(false)
      }
    >
      About
    </Link>

    <Link
      to="/contact"

      onClick={() =>
        setMobileMenu(false)
      }
    >
      Contact Us
    </Link>

  </div>

</div>

{/* BACKDROP */}

{
  mobileMenu && (

    <div

      onClick={() =>
        setMobileMenu(false)
      }

      className="md:hidden fixed inset-0 bg-black/40 z-[998]"
    />

  )
}
    </>
  );
};

export default Header;
