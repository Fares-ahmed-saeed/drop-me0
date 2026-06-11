"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Leaf } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { OFFER_SLIDES } from "@/lib/products-data";

export function OffersBanner() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  return (
    <div className="space-y-4">
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent>
          {OFFER_SLIDES.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="bg-secondary rounded-3xl overflow-hidden flex flex-col md:flex-row min-h-[220px]">
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <Leaf className="w-5 h-5 text-white" />
                    <span className="text-white font-serif text-xl font-bold">
                      {slide.title}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {slide.tiers.map((tier, index) => (
                      <li
                        key={index}
                        className="text-white/90 text-sm md:text-base"
                      >
                        {tier.points} Points – {tier.discount}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative w-full md:w-72 lg:w-80 h-48 md:h-auto shrink-0">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-center gap-2">
        {OFFER_SLIDES.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => scrollTo(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              current === index ? "bg-foreground" : "bg-border"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
