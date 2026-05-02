import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import "swiper/css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Autoplay } from "swiper/modules";

// Images (Assuming these are correctly imported)
import iphone15 from "../images/iphone15.png";
import iphone16 from "../images/iphone16.png";
import samsung24 from "../images/s24ultra.png";
import samsung25 from "../images/s25ultra.png";
import pixel from "../images/pixel9a.png";
import ipad from "../images/ipad.png";

const devices = [
  // 2. Ensure each item has a unique ID and a URL-friendly 'slug'
  { id: "s24-ultra", name: "Galaxy S24 Series", img: samsung24, brand: "samsung" },
  { id: "s25-ultra", name: "Galaxy S25 Series", img: samsung25, brand: "samsung" },
  { id: "iphone-15", name: "iPhone 15 Series", img: iphone15, brand: "apple" },
  { id: "iphone-16", name: "iPhone 16 Series", img: iphone16, brand: "apple" },
  { id: "pixel-9a", name: "Pixel 9 Series", img: pixel, brand: "google" },
  { id: "ipad-series", name: "iPad Series", img: ipad, brand: "apple" },
];

const ChooseDevice = () => {
  const swiperRef = useRef(null);
  const navigate = useNavigate(); // 3. Initialize navigate

  const handleDeviceClick = (device) => {
    // 4. Navigate to a dynamic route, e.g., /repair/samsung/s24-ultra
    navigate(`/device/${device.brand}/${device.id}`);
  };

  return (
    <div className="relative bg-white py-16">
      {/* LEFT ARROW */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 shadow hover:bg-white"
      >
        <FaChevronLeft size={14} />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 shadow hover:bg-white"
      >
        <FaChevronRight size={14} />
      </button>

      <Swiper
        modules={[Autoplay]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={2}
        spaceBetween={30}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="px-16"
      >
        {devices.map((item) => (
          <SwiperSlide key={item.id}>
            {/* 5. Add onClick handler here */}
            <div 
              onClick={() => handleDeviceClick(item)} 
              className="flex flex-col items-center text-center cursor-pointer group"
            >
              <div className="h-[300px] flex items-center justify-center">
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 font-medium text-gray-700 group-hover:text-blue-600">
                {item.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ChooseDevice;