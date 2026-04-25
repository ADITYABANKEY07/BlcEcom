import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

import supportImg from "../images/support.png";

const faqs = [
  {
    q: "What is the Blc brand all about?",
    a: "Blc focuses on high-quality mobile accessories with premium design and durability.",
  },
  {
    q: "Why should I choose Blc over other accessory brands?",
    a: "We combine innovation, durability, and affordability to give you the best value.",
  },
  {
    q: 'What is the "Blc Quality Promise"?',
    a: "We ensure strict quality checks and long-lasting products.",
  },
  {
    q: "What is your Return/Exchange policy?",
    a: "We offer easy 7-day returns and exchanges.",
  },
  {
    q: "Do you have any discounts or special offers available?",
    a: "Yes, we regularly provide seasonal offers and coupon codes.",
  },
  {
    q: "What is your shipping policy?",
    a: "We deliver across India within 3–7 business days.",
  },
];

const Faq = () => {
  const [active, setActive] = useState(null);

  const toggle = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <div className="bg-white py-16 px-6 md:px-12">

      {/* TOP TITLE */}
      <p className="text-center text-gray-500 text-sm tracking-widest mb-2">
        GENERAL FAQs
      </p>

      <h2 className="text-3xl md:text-4xl font-semibold text-center text-black mb-4">
        Have a Question? Get in touch!
      </h2>

      <p className="text-center text-gray-500 mb-12">
        Our customer support is available Monday to Saturday: 9 am to 6 pm
      </p>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT IMAGE */}
        <div>
          <img
            src={supportImg}
            alt="support"
            className="rounded-2xl w-full h-[420px] object-cover"
          />
        </div>

        {/* RIGHT FAQ */}
        <div className="space-y-4">

          {faqs.map((item, index) => (
            <div
              key={index}
              onClick={() => toggle(index)}
              className="border border-gray-200 rounded-xl px-5 py-4 cursor-pointer hover:bg-gray-50 transition"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-black text-sm md:text-base">
                  {item.q}
                </h3>

                {active === index ? (
                  <FaMinus className="text-black text-xs" />
                ) : (
                  <FaPlus className="text-black text-xs" />
                )}
              </div>

              {/* ANSWER */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  active === index ? "max-h-40 mt-3" : "max-h-0"
                }`}
              >
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          ))}

          {/* BUTTON */}
          <div className="text-center mt-8">
            <button className="bg-black text-white px-8 py-3 rounded-full text-sm hover:bg-gray-800 transition">
              View all
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Faq;