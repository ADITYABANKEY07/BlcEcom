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
  { id: "Galaxy S24", model: "Galaxy S24", img: samsung24, brand: "Samsung" },
  { id: "Galaxy S25", model: "Galaxy S25", img: samsung25, brand: "Samsung" },
  { id: "iPhone 16", model: "iPhone 16", img: iphone16, brand: "Apple" },
  { id: "iPhone 15", model: "iPhone 15", img: iphone15, brand: "Apple" },
  { id: "Pixel 9", model: "Pixel 9a", img: pixel, brand: "Google" },
  { id: "iPad", model: "iPad", img: ipad, brand: "Apple" },
];

const ChooseDevice = () => {
  const swiperRef = useRef(null);
  const navigate = useNavigate(); // 3. Initialize navigate

const handleDeviceClick = (device) => {
  navigate(`/device/${device.brand}/${device.model}`);
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
                  alt={item.model}
                  className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 font-medium text-gray-700 group-hover:text-blue-600">
                {item.model}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ChooseDevice;