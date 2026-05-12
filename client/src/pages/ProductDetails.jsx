import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../cartSlice";

const ProductDetails = () => {
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
    <div className="bg-gray-50 min-h-screen py-10 px-6">
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* 🔥 LEFT - IMAGE SECTION */}
        <div className="flex gap-4">

          {/* THUMBNAILS */}
          <div className="flex flex-col gap-3">
            {(product.images?.length > 0
              ? product.images
              : [product.defaultImage]
            ).map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumb"
                onClick={() => setSelectedImage(img)}
                className={`h-20 w-20 object-cover rounded-lg cursor-pointer border transition
                ${selectedImage === img ? "border-black" : "border-gray-300"}`}
              />
            ))}
          </div>

          {/* MAIN IMAGE */}
          <div className="flex-1 bg-white rounded-2xl p-8 flex items-center justify-center shadow-sm relative">

            {/* DISCOUNT BADGE */}
            {discountPercent && (
              <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 rounded">
                {discountPercent}% OFF
              </span>
            )}

            <img
              src={selectedImage}
              alt={product.title}
              className="max-h-[450px] object-contain"
            />
          </div>
        </div>

        {/* 🔥 RIGHT - DETAILS */}
        <div className="flex flex-col justify-center">

          {/* BRAND */}
          <p className="uppercase text-sm text-gray-500 tracking-wider">
            {product.brand}
          </p>

          {/* TITLE */}
          <h1 className="text-3xl font-semibold mt-2">
            {product.title}
          </h1>

          {/* MODEL */}
          <p className="text-gray-500 mt-1">
            Compatible with {product.model}
          </p>

          {/* PRICE */}
          <div className="flex items-center gap-3 mt-5">
            <span className="text-2xl font-bold text-black">
              ₹{(product.discountPrice || product.price).toLocaleString("en-IN")}
            </span>

            {product.discountPrice && (
              <span className="line-through text-gray-400">
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
          <p className="mt-6 text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* FEATURES */}
          <ul className="mt-6 space-y-2 text-sm text-gray-700">
            <li>✔ Premium Quality Material</li>
            <li>✔ Perfect Fit & Protection</li>
            <li>✔ Fast Shipping Available</li>
          </ul>

          {/* BUTTONS */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => {
                dispatch(addToCart(product));
                navigate("/cart");
              }}
              className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>

<button
  onClick={() => navigate(`/product/${product._id}`)}
  className="mt-3 w-full bg-black text-white py-2 rounded-md"
>
  View
</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;