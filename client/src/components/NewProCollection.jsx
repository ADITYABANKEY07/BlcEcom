import React from "react";
import banner from "../images/shopimg3.png"; // use your image

const ShopByDrop = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">

      {/* Background Image */}
      <img
        src={banner}
        alt="banner"
        className="w-full h-full object-cover"
      />

      {/* Dark Overlay (important for readability) */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-start text-center px-4 mt-15">

        {/* Small Text */}
        <p className="text-gray-300 text-sm md:text-3xl mb-3">
          All-new Pixel 9 Series Collection
        </p>

        {/* Main Heading */}
        <h1 className="text-orange-500 text-3xl md:text-5xl font-bold mb-4">
          New Pros in Protection
        </h1>

        {/* CTA */}
        <button className="text-white flex items-center gap-2 hover:gap-3 transition-all duration-300">
          Protect yours →
        </button>

      </div>
    </div>
  );
};

export default ShopByDrop;