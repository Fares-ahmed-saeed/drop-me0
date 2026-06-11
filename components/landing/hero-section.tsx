"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const HERO_IMAGES = [
  {
    url: "/hero1.jpg",
  },
  {
    url: "/hero2.jpg",
  },
  {
    url: "/hero3.jpg",
  },
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentIndex((i) => (i + 1) % HERO_IMAGES.length),
      4000,
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[650px] overflow-hidden">
      {/* Images */}
      {HERO_IMAGES.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image.url}
            alt="Recycling"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Turning Plastic Waste Into Value
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-white/90 mb-8">
          We recycle plastic and cans to protect the environment and create
          sustainable impact.
        </p>

        <div className="flex gap-4">
          <Link
            href="/about"
            className="bg-primary px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
          >
            Learn More
          </Link>
          {/* <Link
            href="/sign-up"
            className="border border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition"
          >
            Join the Mission
          </Link> */}
        </div>
      </div>
    </section>
  );
}
