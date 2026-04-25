import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// images
import img1 from "../images/sliderimg1.png";
import img2 from "../images/sliderimg2.png";
import img3 from "../images/sliderimg3.png";
import img4 from "../images/sliderimg4.png";

const sliderImg = [
  { id: 1, img: img1 },
  { id: 2, img: img2 },
  { id: 3, img: img3 },
  { id: 4, img: img4 },
];

const Slider = () => {
  const swiperRef = useRef(null);

  return (
    <div className="w-full relative">
      
      {/* Swiper */}
      <Swiper
        modules={[Autoplay]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-[400px] md:h-[450px]"
      >
        {sliderImg.map((item) => (
          <SwiperSlide key={item.id}>
            <img
              src={item.img}
              alt="slider"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* LEFT ARROW */}
      <button
        onClick={() => swiperRef.current.slidePrev()}
        className="absolute left-5 top-1/2 cursor-pointer -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-md hover:bg-white transition"
      >
        ❮
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={() => swiperRef.current.slideNext()}
        className="absolute right-5 top-1/2 cursor-pointer -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-md hover:bg-white transition"
      >
        ❯
      </button>
    </div>
  );
};

export default Slider;