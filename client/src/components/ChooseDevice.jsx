import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// images
import iphone15 from "../images/iphone15.png";
import iphone16 from "../images/iphone16.png";
import samsung24 from "../images/s24ultra.png";
import samsung25 from "../images/s25ultra.png";
import pixel from "../images/pixel9a.png";
import ipad from "../images/ipad.png";
import { Autoplay } from "swiper/modules";

const devices = [
  { id: 1, name: "Galaxy S24 Series", img: samsung24 },
  { id: 1, name: "Galaxy S25 Series", img: samsung25 },
  { id: 2, name: "iPhone 15 Series", img: iphone15 },
  { id: 2, name: "iPhone 16 Series", img: iphone16 },
  { id: 3, name: "Pixel 9 Series", img: pixel },
  { id: 4, name: "iPad Series", img: ipad },
];

const ChooseDevice = () => {
  const swiperRef = useRef(null);

  return (
    <div className="relative bg-white py-16">

      {/* LEFT ARROW */}
      <button
        onClick={() => swiperRef.current.slidePrev()}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 shadow hover:bg-white"
      >
        <FaChevronLeft size={14} />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={() => swiperRef.current.slideNext()}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 shadow hover:bg-white"
      >
        <FaChevronRight size={14} />
      </button>

      {/* SWIPER */}
      <Swiper
              modules={[Autoplay]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={2}
        spaceBetween={30}
        loop={true}
                autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 4 },
        }}
        className="px-16"
      >
        {devices.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="flex flex-col items-center text-center cursor-pointer group">
              
              {/* Image */}
              <div className="h-[300px] flex items-center justify-center">
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Title */}
              <p className="mt-4 text-gray-700 group-hover:text-black">
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