import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../cartSlice";

const BestSellerDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  // ✅ FETCH PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api = `${import.meta.env.VITE_API_URL}/product/products/${id}`;
        const res = await axios.get(api);

        setProduct(res.data);

        if (res.data.images?.length > 0) {
          setSelectedImage(res.data.images[0]);
        } else {
          setSelectedImage(res.data.defaultImage);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin border-4 border-black border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // ✅ DISCOUNT %
  const discountPercent =
    product.discountPrice &&
    Math.round(
      ((product.price - product.discountPrice) / product.price) * 100
    );

  return (
    <div className="bg-gray-50 min-h-screen py-6 sm:py-8 md:py-10 px-3 sm:px-4 md:px-6">
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">

        {/* 🔥 LEFT - IMAGE SECTION */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">

          {/* THUMBNAILS */}
          <div className="flex sm:flex-col gap-2 sm:gap-3 overflow-x-auto sm:overflow-x-visible scrollbar-hide">
            {(product.images?.length > 0
              ? product.images
              : [product.defaultImage]
            ).map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumb"
                onClick={() => setSelectedImage(img)}
                className={`h-16 w-16 sm:h-20 sm:w-20 object-cover rounded-lg cursor-pointer border transition flex-shrink-0
                ${selectedImage === img ? "border-black" : "border-gray-300"}`}
              />
            ))}
          </div>

          {/* MAIN IMAGE */}
          <div className="flex-1 bg-white rounded-2xl p-4 sm:p-6 md:p-8 flex items-center justify-center shadow-sm relative">

            {/* DISCOUNT BADGE */}
            {discountPercent && (
              <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-black text-white text-xs px-3 py-1 rounded">
                {discountPercent}% OFF
              </span>
            )}

            <img
              src={selectedImage}
              alt={product.title}
              className="max-h-[280px] sm:max-h-[350px] md:max-h-[450px] w-full object-contain"
            />
          </div>
        </div>

        {/* 🔥 RIGHT - DETAILS */}
        <div className="flex flex-col justify-center">

          {/* BRAND */}
          <p className="uppercase text-xs sm:text-sm text-gray-500 tracking-wider">
            {product.brand}
          </p>

          {/* TITLE */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-2">
            {product.title}
          </h1>

          {/* MODEL */}
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Compatible with {product.model}
          </p>

          {/* PRICE */}
          <div className="flex items-center gap-3 mt-4 sm:mt-5">
            <span className="text-xl sm:text-2xl font-bold text-black">
              ₹{(product.discountPrice || product.price).toLocaleString("en-IN")}
            </span>

            {product.discountPrice && (
              <span className="line-through text-gray-400 text-sm sm:text-base">
                ₹{product.price}
              </span>
            )}
          </div>

          {/* STOCK */}
          <p
            className={`mt-3 text-sm font-medium ${
              product.stock > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {product.stock > 0 ? "✔ In Stock" : "✖ Out of Stock"}
          </p>

          {/* DESCRIPTION */}
          <p className="mt-4 sm:mt-6 text-gray-600 leading-relaxed text-sm sm:text-base">
            {product.description}
          </p>

          {/* FEATURES */}
          <ul className="mt-4 sm:mt-6 space-y-2 text-sm text-gray-700">
            <li>✔ Premium Quality Material</li>
            <li>✔ Perfect Fit & Protection</li>
            <li>✔ Fast Shipping Available</li>
          </ul>

          {/* BUTTONS */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={() => {
                dispatch(addToCart(product));
                const user = JSON.parse(localStorage.getItem("user"));
                if (!user) {
                  localStorage.setItem("redirectAfterLogin", "/cart");
                  navigate("/login", { state: { from: "/cart" } });
                } else {
                  navigate("/cart");
                }
              }}
              className="bg-black text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-gray-800 transition w-full sm:w-auto"
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                const buyNowProduct = [
                  {
                    ...product,
                    qty: 1,
                  },
                ];
                localStorage.setItem("buyNowProduct", JSON.stringify(buyNowProduct));
                localStorage.setItem("checkoutMode", "buyNow");
                const user = JSON.parse(localStorage.getItem("user"));
                if (!user) {
                  localStorage.setItem("redirectAfterLogin", "/checkout");
                  navigate("/login", {
                    state: {
                      from: "/checkout",
                    },
                  });
                } else {
                  navigate("/checkout");
                }
              }}
              className="border border-black text-black px-6 sm:px-8 py-3 rounded-lg hover:bg-gray-100 transition w-full sm:w-auto cursor-pointer font-medium text-center"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellerDetails;