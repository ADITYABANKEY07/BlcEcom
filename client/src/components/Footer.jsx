import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../images/blcblack1.png";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 pt-10 pb-6">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          
          {/* Left */}
          <h2 className="text-white text-lg font-semibold tracking-wide whitespace-nowrap">
            STAY CONNECTED
          </h2>

          {/* Input */}
          <div className="flex flex-1 max-w-xl w-full border border-gray-600">
            <input
              type="email"
              placeholder="Enter Your Email Address"
              className="bg-transparent flex-1 px-4 py-2 outline-none text-sm"
            />
            <button className="bg-white text-black px-5 text-sm font-medium hover:bg-gray-200 transition">
              Subscribe
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-5 text-white text-lg">
            <FaFacebookF className="cursor-pointer hover:text-gray-400" />
            <FaInstagram className="cursor-pointer hover:text-gray-400" />
            <FaTwitter className="cursor-pointer hover:text-gray-400" />
            <FaYoutube className="cursor-pointer hover:text-gray-400" />
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-sm">
          
          <div>
            <h4 className="text-white font-semibold mb-3">INFO</h4>
            <ul className="space-y-1">
              <li className="hover:text-white cursor-pointer">Search</li>
              <li className="hover:text-white cursor-pointer">About Us</li>
              <li className="hover:text-white cursor-pointer">Contact Us</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">LEGAL</h4>
            <ul className="space-y-1">
              <li className="hover:text-white cursor-pointer">Privacy</li>
              <li className="hover:text-white cursor-pointer">Terms</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">SUPPORT</h4>
            <ul className="space-y-1">
              <li className="hover:text-white cursor-pointer">Contact Details</li>
              <li className="hover:text-white cursor-pointer">Shipping</li>
              <li className="hover:text-white cursor-pointer">Return & Refunds</li>
              <li className="hover:text-white cursor-pointer">Warranty</li>
              <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
              <li className="hover:text-white cursor-pointer">Operational Address</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">BEST COLLECTIONS</h4>
            <ul className="space-y-1">
              <li className="hover:text-white cursor-pointer">Apple</li>
              <li className="hover:text-white cursor-pointer">Samsung</li>
              <li className="hover:text-white cursor-pointer">OnePlus</li>
              <li className="hover:text-white cursor-pointer">Google</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-4 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
          
          {/* Left */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" className="h-20  object-contain" />
            <p className="text-sm whitespace-nowrap -mt-5">
              © 2026 BaseLayerCase. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;