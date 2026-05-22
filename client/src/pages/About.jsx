import React from "react";
import { useNavigate } from "react-router-dom";

const stats = [
  { num: "2M+", label: "Happy customers" },
  { num: "500+", label: "Products designed" },
  { num: "6 yrs", label: "In the making" },
];

const values = [
  {
    title: "Precision engineering",
    desc: "Every millimetre matters. Our cases are designed to exact tolerances for each device model.",
    color: "bg-orange-50",
    dot: "bg-orange-400",
  },
  {
    title: "Premium materials",
    desc: "We source only the best — from military-grade polymers to aerospace-grade aluminium accents.",
    color: "bg-blue-50",
    dot: "bg-blue-400",
  },
  {
    title: "Customer first",
    desc: "Hassle-free returns, fast support, and a warranty that actually means something.",
    color: "bg-green-50",
    dot: "bg-green-400",
  },
];

const timeline = [
  { year: "2018", title: "Founded in Mumbai", desc: "Started with just 3 phone case models and a small online store." },
  { year: "2020", title: "Reached 100k customers", desc: "Expanded to screen protectors and introduced the MagFit lineup." },
  { year: "2022", title: "Pan-India delivery", desc: "Now shipping to every pin code across the country with same-day dispatch." },
  { year: "2024", title: "500+ products, 2M+ orders", desc: "Covering all major brands: Apple, Samsung, OnePlus, Google, and more." },
];

const team = [
  { initials: "AB", name: "Aditya Bankey", role: "Founder & CEO", color: "bg-orange-100 text-orange-800" },
  { initials: "PR", name: "Priya Rao", role: "Head of Design", color: "bg-blue-100 text-blue-800" },
  { initials: "SS", name: "Sajan Singh", role: "Operations", color: "bg-green-100 text-green-800" },
  { initials: "NM", name: "Neha Mehta", role: "Customer Success", color: "bg-amber-100 text-amber-800" },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-50 px-4 sm:px-6 md:px-10 py-10 sm:py-14 md:py-16 border-b border-gray-100">
        <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-gray-100 opacity-60" />
        <div className="absolute bottom-[-60px] right-16 h-36 w-36 rounded-full bg-gray-100 opacity-40" />
        <p className="mb-4 text-xs font-medium uppercase tracking-[3px] text-gray-400">Our story</p>
        <h1 className="max-w-xl text-2xl sm:text-3xl md:text-4xl font-bold leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          Protecting devices,{" "}
          <span className="text-orange-600">one case</span> at a time.
        </h1>
        <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-gray-500">
          We started as a small workshop obsessed with precision-fit phone protection. Today we craft
          accessories trusted by millions across India.
        </p>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-3 border-b border-gray-100">
        {stats.map((s) => (
          <div key={s.label} className="border-r border-gray-100 px-3 sm:px-6 md:px-8 py-5 sm:py-7 last:border-r-0">
            <p className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{s.num}</p>
            <p className="mt-1 text-[10px] sm:text-xs uppercase tracking-widest text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Who we are */}
      <section className="border-b border-gray-100 px-4 sm:px-6 md:px-10 py-8 sm:py-10 md:py-12">
        <p className="mb-6 text-xs font-medium uppercase tracking-[3px] text-gray-400">Who we are</p>
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-10 lg:grid-cols-2">
          <div className="space-y-4 text-sm font-light leading-relaxed text-gray-500">
            <p>
              We believe your device deserves protection that's engineered, not just assembled. Every product goes
              through rigorous testing to ensure it fits perfectly, protects completely, and looks great doing it.
            </p>
            <p>
              From the very first case we shipped out of a tiny office in Mumbai, to our current lineup spanning
              hundreds of models — our commitment to quality has never wavered.
            </p>
          </div>
          <div className="border-l-4 border-orange-500 bg-gray-50 px-4 sm:px-6 py-4 sm:py-5 rounded-r-xl">
            <p className="text-sm leading-relaxed text-gray-700">
              "Great protection should never compromise on design. We built this brand on the belief that you
              shouldn't have to choose between the two."
            </p>
            <p className="mt-3 text-xs text-gray-400">— Founder & CEO</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-gray-100 px-4 sm:px-6 md:px-10 py-8 sm:py-10 md:py-12">
        <p className="mb-6 text-xs font-medium uppercase tracking-[3px] text-gray-400">What we stand for</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-xl border border-gray-100 bg-gray-50 p-4 sm:p-5">
              <div className={`mb-3 h-8 w-8 rounded-lg ${v.color} flex items-center justify-center`}>
                <div className={`h-3 w-3 rounded-full ${v.dot}`} />
              </div>
              <p className="mb-2 text-sm font-medium text-gray-900">{v.title}</p>
              <p className="text-xs leading-relaxed text-gray-500">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="border-b border-gray-100 px-4 sm:px-6 md:px-10 py-8 sm:py-10 md:py-12">
        <p className="mb-6 text-xs font-medium uppercase tracking-[3px] text-gray-400">Our journey</p>
        <div className="flex flex-col">
          {timeline.map((t, i) => (
            <div key={t.year} className="grid grid-cols-[50px_1px_1fr] sm:grid-cols-[80px_1px_1fr] gap-x-3 sm:gap-x-4">
              <p className="pt-0.5 text-right text-xs sm:text-sm font-bold text-orange-600"
                style={{ fontFamily: "'Playfair Display', serif" }}>{t.year}</p>
              <div className="relative bg-gray-200">
                <div className="absolute -left-[3px] top-1.5 h-2 w-2 rounded-full bg-orange-500" />
              </div>
              <div className={`pb-7 ${i === timeline.length - 1 ? "pb-0" : ""}`}>
                <p className="text-sm font-medium text-gray-900">{t.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-gray-500">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="border-b border-gray-100 px-4 sm:px-6 md:px-10 py-8 sm:py-10 md:py-12">
        <p className="mb-6 text-xs font-medium uppercase tracking-[3px] text-gray-400">The team</p>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
          {team.map((m) => (
            <div key={m.name} className="rounded-xl border border-gray-100 bg-gray-50 p-3 sm:p-5 text-center">
              <div className={`mx-auto mb-2 sm:mb-3 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full text-xs sm:text-sm font-medium ${m.color}`}>
                {m.initials}
              </div>
              <p className="text-xs sm:text-sm font-medium text-gray-900">{m.name}</p>
              <p className="mt-1 text-[10px] sm:text-xs text-gray-400">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 px-4 sm:px-6 md:px-10 py-10 sm:py-14 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
          Ready to protect your device?
        </h2>
        <p className="mt-2 text-sm text-gray-500">Browse our full collection — cases, screen guards, and more.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 rounded-lg bg-black px-7 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Shop now
        </button>
      </section>
    </div>
  );
};

export default About;