import React, { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules";

import "swiper/css";

// images
import img1 from "../images/sliderimg1.png";
import img2 from "../images/sliderimg2.png";
import img3 from "../images/sliderimg3.png";

const sliderImg = [
  {
    id: 1,
    img: img1,
    title: "Flash Deal: Accessories at Crazy Prices!",
    subtitle: "Grab it before the clock runs out!",
    button: "Shop Now",
    textColor: "text-black",
    btnStyle:
      "border border-black text-black hover:bg-black hover:text-white",
  },

  {
    id: 2,
    img: img2,
    title: "Covered from Edge to Edge.",
    subtitle: "Galaxy S25 Edge Accessories.",
    button: "Shop Series",
    textColor: "text-black",
    btnStyle:
      "border border-black text-black hover:bg-black hover:text-white",
  },

  {
    id: 3,
    img: img3,
    title: "Galaxy S25 Cases",
    subtitle: "Tough, Slim, Stylish Protection.",
    button: "Explore More",
    textColor: "text-white",
    btnStyle:
      "bg-white text-black hover:bg-gray-200 border border-white",
  },
];

const Slider = () => {
  const swiperRef = useRef(null);

  return (
    <div className="w-full relative overflow-hidden">
      {/* SWIPER */}

      <Swiper
        modules={[Autoplay]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="
          w-full
          h-[220px]
          sm:h-[320px]
          md:h-[450px]
          lg:h-[650px]
        "
      >
        {sliderImg.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative w-full h-full">
              {/* IMAGE */}

              <img
                src={item.img}
                alt="slider"
                className="
                  w-full
                  h-full
                  object-cover
                "
              />

              {/* TEXT CONTENT */}

              <div
                className={`
                  absolute
                  top-1/2
                  -translate-y-1/2

                  left-6
                  sm:left-10
                  md:left-16
                  lg:left-24

                  z-20

                  max-w-[90%]
                  sm:max-w-[70%]
                  md:max-w-[50%]

                  ${item.textColor}
                `}
              >
                <h2
                  className="
                    text-lg
                    sm:text-3xl
                    md:text-5xl
                    lg:text-6xl

                    font-bold
                    leading-tight
                  "
                >
                  {item.title}
                </h2>

                <p
                  className="
                    mt-2
                    sm:mt-4

                    text-xs
                    sm:text-lg
                    md:text-2xl

                    font-medium
                  "
                >
                  {item.subtitle}
                </p>

                <button
                  className={`
                    mt-4
                    sm:mt-6
                    md:mt-8

                    px-4
                    py-2

                    sm:px-6
                    sm:py-3

                    rounded-full

                    text-xs
                    sm:text-base

                    font-semibold

                    transition-all
                    duration-300

                    ${item.btnStyle}
                  `}
                >
                  {item.button}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* LEFT BUTTON */}

      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="
          absolute

          left-2
          sm:left-4
          md:left-5

          top-1/2

          -translate-y-1/2

          z-30

          w-8 h-8
          sm:w-10 sm:h-10
          md:w-12 md:h-12

          flex
          items-center
          justify-center

          rounded-full

          bg-white/40
          backdrop-blur-md

          hover:bg-white

          transition

          text-sm
          sm:text-base
          md:text-lg
        "
      >
        ❮
      </button>

      {/* RIGHT BUTTON */}

      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="
          absolute

          right-2
          sm:right-4
          md:right-5

          top-1/2

          -translate-y-1/2

          z-30

          w-8 h-8
          sm:w-10 sm:h-10
          md:w-12 md:h-12

          flex
          items-center
          justify-center

          rounded-full

          bg-white/40
          backdrop-blur-md

          hover:bg-white

          transition

          text-sm
          sm:text-base
          md:text-lg
        "
      >
        ❯
      </button>
    </div>
  );
};

export default Slider;