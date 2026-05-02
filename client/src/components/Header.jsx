import { useEffect, useState } from "react";
import { Search, User, ShoppingBag, Menu } from "lucide-react";
import logo from "../images/blc.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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
            <Menu className="cursor-pointer" />
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

                {/* Vertical Dropdown Menu */}
                <div className="absolute left-0 top-full mt-2 w-56 bg-white shadow-xl py-4 flex flex-col opacity-0 invisible translate-y-5 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 border-t-4 border-orange-500 z-50">
                  <Link
                    to="/iphone"
                    className="px-6 py-2 hover:bg-orange-50 hover:text-orange-500 transition-colors lowercase first-letter:uppercase"
                  >
                    iPhone
                  </Link>
                  <Link
                    to="/samsung"
                    className="px-6 py-2 hover:bg-orange-50 hover:text-orange-500 transition-colors lowercase first-letter:uppercase"
                  >
                    Samsung
                  </Link>
                  <Link
                    to="/pixel"
                    className="px-6 py-2 hover:bg-orange-50 hover:text-orange-500 transition-colors lowercase first-letter:uppercase"
                  >
                    Pixel
                  </Link>
                  <Link
                    to="/ipad"
                    className="px-6 py-2 hover:bg-orange-50 hover:text-orange-500 transition-colors lowercase first-letter:uppercase"
                  >
                    iPad
                  </Link>

                  {/* You can add more links here as needed */}
                  <div className="border-t my-2 mx-6"></div>
                  <Link
                    to="/accessories"
                    className="px-6 py-2 hover:bg-orange-50 hover:text-orange-500 transition-colors lowercase first-letter:uppercase"
                  >
                    Accessories
                  </Link>
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

            {/* <User className="cursor-pointer hover:text-orange-500 transition" /> */}

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
    </>
  );
};

export default Header;
