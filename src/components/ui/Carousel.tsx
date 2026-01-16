'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface CarouselItem {
  id: number | string;
  title: string;
  description?: string;
  image?: string;
  badge?: string;
  cta?: string;
  icon?: React.ReactNode;
}

interface CarouselProps {
  items: CarouselItem[];
  isHero?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  className?: string;
}

export default function Carousel({
  items,
  isHero = false,
  autoplay = false,
  autoplayDelay = 4000,
  loop = true,
  className
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop, align: isHero ? 'center' : 'start', containScroll: 'trimSnaps' },
    autoplay ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: false })] : []
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  return (
    <div className={cn("relative group w-full", className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "relative flex-[0_0_100%] min-w-0 transition-opacity duration-500",
                !isHero && "md:flex-[0_0_33.33%] lg:flex-[0_0_25%] px-2"
              )}
            >
              <div
                className={cn(
                  "relative overflow-hidden",
                  isHero ? "h-[80vh] w-full" : "aspect-[4/5] rounded-xl border border-gray-100 bg-white"
                )}
              >
                {/* Image / Background */}
                {item.image ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover/item:scale-105"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                ) : (
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br",
                    isHero ? "from-gray-900 to-black" : "from-gray-50 to-gray-100"
                  )} />
                )}

                {/* Content Overlay */}
                <div className={cn(
                  "relative z-10 w-full h-full flex flex-col",
                  isHero ? "p-12 md:p-24 justify-center text-white" : "p-6 justify-end text-black"
                )}>
                  {/* Hero Gradient Overlay */}
                  {isHero && (
                    <div className="absolute inset-0 z-[-1] bg-black/40" />
                  )}

                  {item.badge && (
                    <span className={cn(
                      "inline-block px-3 py-1 text-[10px] font-black uppercase tracking-widest w-fit mb-4",
                      isHero ? "bg-white text-black" : "bg-black text-white"
                    )}>
                      {item.badge}
                    </span>
                  )}

                  {item.icon && !isHero && (
                    <div className="mb-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                        {item.icon}
                      </span>
                    </div>
                  )}

                  <div className={cn(isHero ? "max-w-3xl" : "w-full")}>
                    <h3 className={cn(
                      "font-black tracking-tighter uppercase",
                      isHero ? "text-4xl md:text-7xl mb-4" : "text-xl mb-1"
                    )}>
                      {item.title}
                    </h3>
                    <p className={cn(
                      "font-medium",
                      isHero ? "text-lg md:text-xl text-gray-200 mb-8" : "text-sm text-gray-500"
                    )}>
                      {item.description}
                    </p>

                    {item.cta && (
                      <button className={cn(
                        "mt-4 px-8 py-3 text-xs font-bold uppercase tracking-widest transition-all",
                        isHero
                          ? "bg-white text-black hover:bg-gray-200"
                          : "border border-black text-black hover:bg-black hover:text-white"
                      )}>
                        {item.cta}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 transition-opacity opacity-0 group-hover:opacity-100",
          !isHero && "text-black bg-white/80 border-gray-200"
        )}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={scrollNext}
        className={cn(
          "absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 transition-opacity opacity-0 group-hover:opacity-100",
          !isHero && "text-black bg-white/80 border-gray-200"
        )}
      >
        <ChevronRight size={24} />
      </button>

      {/* Pagination Dots */}
      <div className={cn(
        "absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3",
        !isHero && "bottom-[-2rem]"
      )}>
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              "h-1 transition-all duration-300",
              selectedIndex === index 
                ? cn("w-8", isHero ? "bg-white" : "bg-black") 
                : cn("w-4", isHero ? "bg-white/30" : "bg-gray-200")
            )}
          />
        ))}
      </div>
    </div>
  );
}
