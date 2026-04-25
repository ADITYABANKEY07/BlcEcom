import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { FaHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// images
import cover1 from "../images/cover1.png";
import cover2 from "../images/cover2.png";
import cover3 from "../images/cover3.png";
import cover4 from "../images/cover4.png";
import cover5 from "../images/cover5.png";

const products = [
  {
    id: 1,
    name: "GLAS.tR EZ Fit Pro",
    desc: "Galaxy S24 Series Case",
    price: "19.99",
    img: cover1,
  },
  {
    id: 2,
    name: "Tough Armor (Mag Fit)",
    desc: "iphone 16 Series Case",
    price: "9.99",
    img: cover2,
  },
  {
    id: 3,
    name: "Classic Rugged Case",
    desc: "Galaxy S25 Series Case",
    price: "12.99",
    img: cover3,
  },
  {
    id: 4,
    name: "GLAS.tR EZ Fit | Sensor",
    desc: "Galaxy S25 Series Case",
    price: "20.99",
    img: cover4,
  },
  {
    id: 5,
    name: "Premium Clear Case",
    desc: "iPhone 16e Series Case",
    price: "10.99",
    img: cover5,
  },
];

const BestSeller = () => {
  const swiperRef = useRef(null);

  return (
    <div className="bg-gray-50 py-16 px-6 md:px-12 relative">

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-semibold mb-10">
        Bestsellers
      </h2>

      {/* LEFT ARROW */}
      <button
        onClick={() => swiperRef.current.slidePrev()}
        className="absolute right-16 bottom-6 z-10 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
      >
        <FaChevronLeft />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={() => swiperRef.current.slideNext()}
        className="absolute right-4 bottom-6 z-10 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
      >
        <FaChevronRight />
      </button>

      {/* SWIPER */}
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={2}
        spaceBetween={20}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 4 },
        }}
      >
        {products.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="group cursor-pointer">

<div className="relative bg-[#f5f5f5] rounded-3xl h-[260px] flex items-center justify-center overflow-hidden">

  {/* Image */}
  <img
    src={item.img}
    alt={item.name}
    className="h-[85%] object-contain transition-transform duration-300 group-hover:scale-105"
  />

  {/* Wishlist */}
  <button className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
    <FaHeart className="text-gray-400 text-sm hover:text-red-500" />
  </button>

</div>

              {/* Info */}
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-900">
                  {item.name}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  {item.desc}
                </p>

<p className="text-sm font-medium mt-2">
  ₹{(item.price * 83).toFixed(0)}
</p>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BestSeller;