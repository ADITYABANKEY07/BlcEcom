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

    <div className="w-full relative overflow-hidden">

      {/* SWIPER */}

      <Swiper

        modules={[Autoplay]}

        onSwiper={(swiper) =>
          (swiperRef.current = swiper)
        }

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

            <img

              src={item.img}

              alt="slider"

              className="

                w-full
                h-full

                object-cover

              "
            />

          </SwiperSlide>

        ))}

      </Swiper>

      {/* LEFT BUTTON */}

      <button

        onClick={() =>
          swiperRef.current?.slidePrev()
        }

        className="

          absolute

          left-2
          sm:left-4
          md:left-5

          top-1/2

          -translate-y-1/2

          z-10

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

        onClick={() =>
          swiperRef.current?.slideNext()
        }

        className="

          absolute

          right-2
          sm:right-4
          md:right-5

          top-1/2

          -translate-y-1/2

          z-10

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