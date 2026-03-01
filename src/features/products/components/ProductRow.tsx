'use client';

import Carousel, { CarouselItem } from '@/components/ui/Carousel';

interface ProductRowProps {
  title: string;
  items: CarouselItem[];
}

export default function ProductRow({ title, items }: ProductRowProps) {
  return (
    <section className="py-16 border-b border-gray-100 last:border-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black tracking-tighter text-black uppercase mb-2">{title}</h2>
          <div className="h-1 w-16 bg-black"></div>
        </div>
        <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors border-b border-transparent hover:border-black pb-1">
          Ver Todo la Colección
        </button>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Carousel 
          items={items} 
          isHero={false}
          loop={true}
          autoplay={false}
        />
      </div>
    </section>
  );
}
