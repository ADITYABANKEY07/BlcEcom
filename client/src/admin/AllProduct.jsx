import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AllProduct = () => {
  const [mydata, setMyData] = useState([]);
  const navigate = useNavigate();

  // ✅ Load Data
  const loadData = async () => {
    try {
      let api = `${import.meta.env.VITE_API_URL}/admin/displayall`;
      let res = await axios.get(api);
      setMyData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ✅ DELETE PRODUCT
  const handleDelete = async (id) => {
    try {
      let api = `${import.meta.env.VITE_API_URL}/admin/delete/?id=${id}`;
     let res =  await axios.get(api);
      toast.success(res.data.msg);
      loadData(); // refresh table
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ UPDATE NAVIGATION
  const handleUpdate = (id) => {
    navigate(`/apanel/update/${id}`);
  };

  return (
<div className="p-6 min-h-screen bg-[#0B132B] text-gray-200">

          <ToastContainer position="top-right" autoClose={2000} />
      <h1 className="text-2xl font-semibold mb-6">All Products</h1>

<div className="overflow-x-auto bg-[#111827] rounded-2xl border border-gray-800 shadow-lg">
        <table className="w-full text-sm text-left">

<thead className="bg-[#1F2937] text-gray-400 uppercase text-xs tracking-wider">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3">Brand</th>
              <th className="p-3">Model</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {mydata.map((item) => (
<tr
  key={item._id}
  className="border-b border-gray-800 hover:bg-[#1E293B]/70 transition duration-200"
>
  {/* IMAGE */}
  <td className="p-3">
    <img
      src={item.defaultImage}
      alt={item.title}
      className="w-14 h-14 object-cover rounded-lg border border-gray-700"
    />
  </td>

  {/* DATA */}
  <td className="p-3 text-gray-200 font-medium">{item.title}</td>
  <td className="p-3 text-gray-400">{item.brand}</td>
  <td className="p-3 text-gray-400">{item.model}</td>

  {/* PRICE */}
  <td className="p-3 font-semibold text-green-400">
    ₹{Number(item.discountPrice || item.price).toLocaleString("en-IN")}
  </td>

  {/* STOCK with badge */}
  <td className="p-3">
    <span
      className={`px-2 py-1 text-xs rounded-full ${
        item.stock > 10
          ? "bg-green-500/20 text-green-400"
          : item.stock > 0
          ? "bg-yellow-500/20 text-yellow-400"
          : "bg-red-500/20 text-red-400"
      }`}
    >
      {item.stock}
    </span>
  </td>

  {/* ACTIONS */}
  <td className="p-3 flex gap-2">
    <button
      onClick={() => handleUpdate(item._id)}
      className="px-3 py-1 bg-indigo-500/90 text-white rounded-md hover:bg-indigo-600 text-xs transition"
    >
      Update
    </button>

    <button
      onClick={() => handleDelete(item._id)}
      className="px-3 py-1 bg-red-500/80 text-white rounded-md hover:bg-red-600 text-xs transition"
    >
      Delete
    </button>
  </td>
</tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default AllProduct;