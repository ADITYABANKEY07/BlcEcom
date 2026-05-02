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

  // ✅ Fetch single product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let api = `${import.meta.env.VITE_API_URL}/product/products/${id}`;
        let res = await axios.get(api);

        setProduct(res.data);
        if (res.data.images && res.data.images.length > 0) {
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

  if (!product) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10 grid md:grid-cols-2 gap-10">
      
      {/* 🔥 LEFT - IMAGE GALLERY */}
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
              className={`h-20 w-20 object-cover rounded-lg cursor-pointer border 
                ${selectedImage === img ? "border-black" : "border-gray-300"}`}
            />
          ))}
        </div>

        {/* MAIN IMAGE */}
        <div className="bg-gray-100 rounded-2xl p-6 flex justify-center flex-1">
          <img
            src={selectedImage}
            alt={product.title}
            className="h-[400px] object-contain"
          />
        </div>
      </div>

      {/* 🔥 RIGHT - DETAILS */}
      <div>
        <h1 className="text-3xl font-semibold">{product.title}</h1>

        <p className="text-gray-500 mt-2">
          {product.brand} • {product.model}
        </p>

        <div className="flex items-center gap-3 mt-4">
          <span className="text-2xl font-bold">
            ₹{product.discountPrice || product.price}
          </span>

          {product.discountPrice && (
            <span className="line-through text-gray-400">
              ₹{product.price}
            </span>
          )}
        </div>

        <p className="mt-6 text-gray-600">
          {product.description}
        </p>

        <p className="mt-4 text-sm">
          Stock: {product.stock}
        </p>

        <div className="mt-6 flex gap-4">
<button
  onClick={() => {
    dispatch(addToCart(product)); // ✅ add to redux
    navigate("/cart"); // ✅ go to cart page
  }}
  className="bg-black text-white cursor-pointer px-6 py-3 rounded-lg"
>
  Add to Cart
</button>

          <button className="border px-6 py-3 rounded-lg">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BestSellerDetails;