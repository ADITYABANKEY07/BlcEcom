import React from "react";
import banner from "../images/shopimg2.png"; // use your image

const ShopByDrop = () => {
  return (
    <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] overflow-hidden">
      {/* Background Image */}
      <img src={banner} alt="banner" className="w-full h-full scale-150 object-cover" />

      {/* Dark Overlay (important for readability) */}
      <div className="absolute"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-start text-center px-4 mt-15">
        {/* Small Text */}
        <p className="text-black text-sm md:text-3xl mb-3">
          Top-Notch Protection That Fits Your Budget
        </p>

        {/* Main Heading */}
        <h1 className="text-orange-500 text-3xl md:text-5xl font-bold mb-4">
          BLC Essential
        </h1>

        {/* CTA */}
        <button className="text-black flex items-center gap-2 hover:gap-3 transition-all duration-300">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ShopByDrop;
