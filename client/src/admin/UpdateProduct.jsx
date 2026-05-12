import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const UpdateProduct = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: "",
    brand: "",
    model: "",
    price: "",
    discountPrice: "",
    description: "",
    category: "",
    subCategory: "",
    tags: "",
    stock: "",
    isBestSeller: false,
    isFeatured: false,
  });

  let loadData = async () => {
    let api = `${import.meta.env.VITE_API_URL}/admin/editdisplay/?id=${id}`;
    let res = await axios.get(api);
    console.log(res.data);
    setInput(res.data.product || res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  // ✅ handle input
  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ Submit WITHOUT images
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let api = `${import.meta.env.VITE_API_URL}/admin/update`;

      const res = await axios.post(api, input); // 🔥 send JSON directly

      console.log(res.data);

toast.success(res.data.msg);

setTimeout(() => {
  navigate("/apanel/allproduct");
}, 2000);

    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B132B] text-gray-200 px-4 py-6">
      <ToastContainer position="top-right" autoClose={2000} />
      <h1 className="text-xl font-semibold text-gray-300 mb-6">
        Update Product
      </h1>

      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl bg-[#111827] p-8 rounded-2xl border border-gray-800 shadow-lg space-y-6"
        >
          <h2 className="text-2xl font-semibold text-white">Update Product</h2>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              name="title"
              value={input.title}
              placeholder="Product title"
              className="inputDark"
              onChange={handleInput}
            />
            <input
              name="brand"
              value={input.brand}
              placeholder="Brand"
              className="inputDark"
              onChange={handleInput}
            />
            <input
              name="model"
              value={input.model}
              placeholder="Model"
              className="inputDark"
              onChange={handleInput}
            />
            <input
              name="category"
              value={input.category}
              placeholder="Category"
              className="inputDark"
              onChange={handleInput}
            />
            <input
              name="subCategory"
              value={input.subCategory}
              placeholder="Sub Category"
              className="inputDark"
              onChange={handleInput}
            />
            <input
              name="price"
              value={input.price}
              placeholder="Price"
              className="inputDark"
              onChange={handleInput}
            />
            <input
              name="discountPrice"
              value={input.discountPrice}
              placeholder="Discount Price"
              className="inputDark"
              onChange={handleInput}
            />
            <input
              name="stock"
              value={input.stock}
              placeholder="Stock"
              className="inputDark"
              onChange={handleInput}
            />
          </div>

          {/* Description */}
          <textarea
            name="description"
            placeholder="Product Description"
            className="inputDark h-24"
            onChange={handleInput}
            value={input.description}
          />

          {/* Tags */}
          <input
            name="tags"
            placeholder="Tags (comma separated)"
            className="inputDark"
            onChange={handleInput}
            value={input.tags}
          />

          {/* Checkboxes */}
          <div className="flex gap-6 text-sm">
            <label className="flex items-center gap-2 text-gray-300">
              <input
                type="checkbox"
                name="isBestSeller"
                checked={input.isBestSeller}
                onChange={handleInput}
                className="accent-indigo-500"
              />
              Best Seller
            </label>

            <label className="flex items-center gap-2 text-gray-300">
              <input
                type="checkbox"
                name="isFeatured"
                checked={input.isFeatured}
                onChange={handleInput}
                className="accent-indigo-500"
              />
              Featured
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-xl hover:bg-indigo-600 transition font-medium"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
