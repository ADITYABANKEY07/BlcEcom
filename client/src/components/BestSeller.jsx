import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axios from "axios";
import { FaHeart, FaChevronLeft, FaChevronRight, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../cartSlice";


const BestSeller = () => {
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [likedItems, setLikedItems] = useState([]);

  // ✅ Fetch BestSeller products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let api = `${import.meta.env.VITE_API_URL}/product/bestseller?isBestSeller=true`;
        let res = await axios.get(api);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  const toggleLike = (e, productId) => {
    e.stopPropagation();

    setLikedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const handleOpenProduct = (id) => {
    navigate(`/product/${id}`);
  };

  const dispatch = useDispatch()

  // ✅ Handle Add to Cart
  const handleAddToCart = (e, product) => {
    e.stopPropagation(); // Prevents navigating to the product page
    dispatch(addToCart(product));
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      localStorage.setItem("redirectAfterLogin", "/cart");
      navigate("/login", { state: { from: "/cart" } });
    } else {
      navigate("/cart");
    }
  };



  return (
    <div className="bg-gray-50 py-8 sm:py-12 md:py-16 px-3 sm:px-6 md:px-12 relative">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 sm:mb-10">Bestsellers</h2>

      {/* Navigation Buttons */}
      <button
        onClick={() => swiperRef.current.slidePrev()}
        className="absolute right-14 sm:right-16 bottom-4 sm:bottom-6 z-10 w-8 h-8 sm:w-10 sm:h-10 cursor-pointer rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
      >
        <FaChevronLeft className="text-xs sm:text-sm" />
      </button>

      <button
        onClick={() => swiperRef.current.slideNext()}
        className="absolute right-2 sm:right-4 bottom-4 sm:bottom-6 z-10 w-8 h-8 sm:w-10 sm:h-10 cursor-pointer rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
      >
        <FaChevronRight className="text-xs sm:text-sm" />
      </button>

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={2}
        spaceBetween={20}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {products.map((item) => {
          const isLiked = likedItems.includes(item._id);

          return (
            <SwiperSlide key={item._id}>
              <div
                onClick={() => handleOpenProduct(item._id)}
                className="group cursor-pointer flex flex-col h-full"
              >
                <div className="relative bg-[#f5f5f5] rounded-2xl sm:rounded-3xl h-[180px] sm:h-[220px] md:h-[260px] flex items-center justify-center overflow-hidden">
                  {/* ✅ Real image */}
                  <img
                    src={item.defaultImage}
                    alt={item.title}
                    className="h-[85%] object-contain transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Like Button */}
                  <button
                    onClick={(e) => toggleLike(e, item._id)}
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md ${
                      isLiked
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    }`}
                  >
                    <FaHeart
                      className={`${
                        isLiked ? "text-red-500" : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>

                <div className="mt-4 flex flex-col flex-grow">
                  <h3 className="text-sm font-semibold">{item.title}</h3>

                  <p className="text-xs text-gray-500 mb-2">
                    {item.brand} {item.model}
                  </p>

                  {/* Pricing and Add to Cart Section */}
                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex gap-2 items-center flex-wrap">
                      <p className="font-medium text-black">
                        ₹{item.discountPrice}
                      </p>
                      <p className="text-gray-400 line-through text-xs sm:text-sm">
                        ₹{item.price}
                      </p>
                    </div>

                    {/* ✅ Add to Cart Button */}
                    <button
                      onClick={(e) => handleAddToCart(e, item)}
                      className="bg-gray-900 text-white hover:text-orange-500 cursor-pointer px-3 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 hover:bg-gray-700 transition-colors shadow-sm"
                    >
                      <FaShoppingCart />
                      <span className="hidden sm:inline">Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default BestSeller;