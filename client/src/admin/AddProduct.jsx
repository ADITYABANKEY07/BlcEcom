import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
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

  // ✅ handle input
  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ FIXED image handler
  const handleImage = (e) => {
    const files = Array.from(e.target.files); // 🔥 convert to array
    setImages(files);
    console.log("Selected images:", files);
  };

  // ✅ FIXED submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // ✅ append text fields
      for (let key in input) {
        if (key === "isBestSeller" || key === "isFeatured") {
          formData.append(key, input[key] ? "true" : "false");
        } else {
          formData.append(key, input[key]);
        }
      }

      // ✅ append images separately
      images.forEach((file) => {
        formData.append("images", file); // 🔥 must match multer
      });

      // ✅ debug
      console.log("FormData:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      let api = `${import.meta.env.VITE_API_URL}/admin/upload`;

      const response = await axios.post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      alert("Product uploaded successfully");
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-sm space-y-6"
      >
        <h2 className="text-2xl font-semibold text-black">Add Product</h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input name="title" placeholder="Product title" className="input" onChange={handleInput} />
          <input name="brand" placeholder="Brand" className="input" onChange={handleInput} />
          <input name="model" placeholder="Model (iPhone 16, S25)" className="input" onChange={handleInput} />
          <input name="category" placeholder="Category" className="input" onChange={handleInput} />
          <input name="subCategory" placeholder="Sub Category" className="input" onChange={handleInput} />
          <input name="price" placeholder="Price" className="input" onChange={handleInput} />
          <input name="discountPrice" placeholder="Discount Price" className="input" onChange={handleInput} />
          <input name="stock" placeholder="Stock" className="input" onChange={handleInput} />
        </div>

        <textarea
          name="description"
          placeholder="Product Description"
          className="input h-24"
          onChange={handleInput}
        />

        <input
          name="tags"
          placeholder="Tags (comma separated)"
          className="input"
          onChange={handleInput}
        />

        {/* ✅ FIXED FILE INPUT */}
        <div>
          <label className="text-sm text-gray-600">Upload Images</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleImage}
            className="mt-2"
          />
        </div>

        {/* Checkboxes */}
        <div className="flex gap-6 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="isBestSeller" onChange={handleInput} />
            Best Seller
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" name="isFeatured" onChange={handleInput} />
            Featured
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;