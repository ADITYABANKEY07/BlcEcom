import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";

const SelectedDevices = () => {
  const { brand, modelId } = useParams(); // Grabs 'apple' and 'iphone-16'
  const navigate = useNavigate();
  
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        setLoading(true);
        // Replace with your actual MongoDB/Node.js API endpoint
        const response = await axios.get(`http://localhost:5000/api/devices/${modelId}`);
        setDevice(response.data);
      } catch (error) {
        console.error("Error fetching device details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeviceData();
  }, [modelId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!device) {
    return <div className="py-20 text-center">Device not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-gray-600 hover:text-black transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back to Catalog
        </button>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 bg-white p-8 rounded-2xl shadow-sm">
          
          {/* Image Section */}
          <div className="flex items-center justify-center bg-gray-100 rounded-xl p-10">
            <img 
              src={device.image} 
              alt={device.name} 
              className="max-h-[500px] object-contain transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-center">
            <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
              {brand}
            </span>
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900 md:text-5xl">
              {device.name}
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              {device.description || "Premium protection and style for your device. Crafted with precision for a perfect fit."}
            </p>

            {/* Variants / Features */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900">Available Variants:</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {device.variants?.map((v, index) => (
                  <span key={index} className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700">
                    {v}
                  </span>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <ul className="mt-8 space-y-3">
              {["Free Shipping", "100% Genuine", "Secure Checkout"].map((item) => (
                <li key={item} className="flex items-center text-gray-700">
                  <FaCheckCircle className="mr-2 text-green-500" /> {item}
                </li>
              ))}
            </ul>

            <button className="mt-10 w-full rounded-lg bg-black py-4 text-white font-bold text-lg transition-transform active:scale-95 hover:bg-gray-800">
              Customize Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedDevices;