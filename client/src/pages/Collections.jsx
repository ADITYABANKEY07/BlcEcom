import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Collections = () => {
  const { brand, model } = useParams();
  let navigate = useNavigate();
  const decodedBrand = decodeURIComponent(brand);
  const decodedModel = decodeURIComponent(model);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sort, setSort] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedType, setSelectedType] = useState([]);

  // ✅ FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const api = `${import.meta.env.VITE_API_URL}/product/display?brand=${encodeURIComponent(decodedBrand)}&model=${encodeURIComponent(decodedModel)}`;

        const res = await axios.get(api);

        setProducts(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [decodedBrand, decodedModel]);

  // ✅ FILTER LOGIC
  const filteredProducts = products
    .filter((p) => {
      const price = p.discountPrice || p.price;
      return price >= priceRange[0] && price <= priceRange[1];
    })
    .filter((p) => {
      if (selectedType.length === 0) return true;
      return selectedType.includes(p.category?.name);
    })
    .sort((a, b) => {
      const priceA = a.discountPrice || a.price;
      const priceB = b.discountPrice || b.price;

      if (sort === "low") return priceA - priceB;
      if (sort === "high") return priceB - priceA;
      return 0;
    });

  // ✅ LOADER
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin border-4 border-black border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
        {/* 🔹 SIDEBAR */}
        <div className="bg-white p-5 rounded-xl shadow-sm h-fit">
          <h2 className="font-semibold mb-4">Filters</h2>

          {/* TYPE FILTER */}
          <div className="mb-6">
            <p className="font-medium mb-2">Type</p>

            {["Standard Cases", "MagFit Cases", "Screen Protectors"].map(
              (type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 text-sm mb-1"
                >
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedType([...selectedType, type]);
                      } else {
                        setSelectedType(selectedType.filter((t) => t !== type));
                      }
                    }}
                  />
                  {type}
                </label>
              ),
            )}
          </div>

          {/* PRICE FILTER */}
          <div>
            <p className="font-medium mb-2">Price</p>

            <input
              type="range"
              min="0"
              max="10000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              className="w-full"
            />

            <p className="text-sm mt-2">₹0 - ₹{priceRange[1]}</p>
          </div>
        </div>

        {/* 🔹 PRODUCTS */}
        <div>
          {/* TOP BAR */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold">
              {decodedBrand} {decodedModel}
            </h1>

            <select
              onChange={(e) => setSort(e.target.value)}
              className="border px-3 py-2 rounded"
            >
              <option value="featured">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                {/* IMAGE */}
                <div className="bg-gray-100 rounded-lg p-4 flex justify-center">
                  <img
                    src={product.defaultImage}
                    alt={product.title}
                    className="h-40 object-contain"
                  />
                </div>

                {/* TITLE */}
                <h3 className="mt-3 text-sm font-medium line-clamp-2">
                  {product.title}
                </h3>

                {/* PRICE */}
                <div className="mt-2">
                  <span className="text-orange-600 font-semibold">
                    ₹
                    {(product.discountPrice || product.price).toLocaleString(
                      "en-IN",
                    )}
                  </span>

                  {product.discountPrice && (
                    <span className="text-gray-400 line-through text-sm ml-2">
                      ₹{product.price}
                    </span>
                  )}
                </div>

                {/* BUTTON */}
                <button
                  onClick={() => {
                    navigate(`/product/${product._id}`);
                  }}
                  className="mt-3 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
                >
                  View
                </button>
              </div>
            ))}
          </div>

          {/* EMPTY */}
          {filteredProducts.length === 0 && (
            <p className="text-center mt-10 text-gray-500">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collections;
