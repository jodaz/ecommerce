'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  className,
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
    <div className={cn('relative group w-full', className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((item) => (
            <div
              key={item.id}
              className={cn(
                'relative flex-[0_0_100%] min-w-0 transition-opacity duration-500',
                !isHero && 'md:flex-[0_0_33.33%] lg:flex-[0_0_25%] px-2'
              )}
            >
              <div
                className={cn(
                  'relative overflow-hidden',
                  isHero ? 'h-[80vh] w-full' : 'aspect-[4/5] rounded-xl border border-gray-100 bg-white'
                )}
              >
                {/* Image */}
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={cn(
                      'object-cover transition-transform duration-700',
                      !isHero && 'group-hover/item:scale-105'
                    )}
                    sizes={isHero ? '100vw' : '(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw'}
                    priority={isHero}
                  />
                ) : (
                  <div
                    className={cn(
                      'absolute inset-0 bg-gradient-to-br',
                      isHero ? 'from-gray-900 to-black' : 'from-gray-50 to-gray-100'
                    )}
                  />
                )}

                {/* Content Overlay */}
                <div
                  className={cn(
                    'relative z-10 w-full h-full flex flex-col',
                    isHero ? 'p-6 md:p-12 lg:p-24 justify-center text-white' : 'p-4 md:p-6 justify-end text-black'
                  )}
                >
                  {/* Hero Gradient Overlay */}
                  {isHero && <div className="absolute inset-0 z-[-1] bg-black/40" />}

                  {item.badge && (
                    <span
                      className={cn(
                        'inline-block px-3 py-1 text-[10px] font-black uppercase tracking-widest w-fit mb-3 md:mb-4',
                        isHero ? 'bg-white text-black' : 'bg-black text-white'
                      )}
                    >
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

                  <div className={cn(isHero ? 'max-w-3xl' : 'w-full')}>
                    <h3
                      className={cn(
                        'font-black tracking-tighter uppercase',
                        isHero ? 'text-3xl md:text-5xl lg:text-7xl mb-3 md:mb-4' : 'text-lg md:text-xl mb-1'
                      )}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={cn(
                        'font-medium',
                        isHero ? 'text-base md:text-lg lg:text-xl text-gray-200 mb-6 md:mb-8' : 'text-xs md:text-sm text-gray-500'
                      )}
                    >
                      {item.description}
                    </p>

                    {item.cta && (
                      <button
                        className={cn(
                          'mt-3 md:mt-4 px-6 md:px-8 py-2 md:py-3 text-xs font-bold uppercase tracking-widest transition-all',
                          isHero
                            ? 'bg-white text-black hover:bg-gray-200'
                            : 'border border-black text-black hover:bg-black hover:text-white'
                        )}
                      >
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
        aria-label="Previous slide"
        className={cn(
          'absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 transition-opacity opacity-0 group-hover:opacity-100',
          !isHero && 'text-black bg-white/80 border-gray-200'
        )}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={scrollNext}
        aria-label="Next slide"
        className={cn(
          'absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 transition-opacity opacity-0 group-hover:opacity-100',
          !isHero && 'text-black bg-white/80 border-gray-200'
        )}
      >
        <ChevronRight size={24} />
      </button>

      {/* Pagination Dots */}
      <div
        className={cn(
          'absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3',
          !isHero && 'bottom-[-2rem]'
        )}
      >
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={cn(
              'h-1 transition-all duration-300',
              selectedIndex === index
                ? cn('w-8', isHero ? 'bg-white' : 'bg-black')
                : cn('w-4', isHero ? 'bg-white/30' : 'bg-gray-200')
            )}
          />
        ))}
      </div>
    </div>
  );
}
