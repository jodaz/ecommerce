'use client';

import Carousel, { CarouselItem } from '@/components/ui/Carousel';
import { cn } from '@/lib/utils';

import Link from 'next/link';

interface ProductRowProps {
  title: string;
  items: CarouselItem[];
  index?: number;
  slug?: string;
  hasPage?: boolean;
}

export default function ProductRow({ title, items, index = 0, slug, hasPage = false }: ProductRowProps) {
  const isDark = index % 2 === 0;
  const textVariant = isDark ? 'dark' : 'light';

  return (
    <section className={cn(
      "py-16 border-b border-gray-100 last:border-0 overflow-hidden",
      !isDark && "bg-zinc-900 border-zinc-800"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex justify-between items-end text-balance">
        <div>
          <h2 className={cn(
            "text-3xl font-black tracking-tighter uppercase mb-2",
            isDark ? "text-black" : "text-white"
          )}>
            {title}
          </h2>
          <div className={cn("h-1 w-16", isDark ? "bg-black" : "bg-white")}></div>
        </div>
        
        {hasPage && slug && (
          <Link 
            href={`/collections/${slug}`}
            className={cn(
              "text-[10px] font-black uppercase tracking-widest transition-colors border-b border-transparent pb-1",
              isDark 
                ? "text-gray-400 hover:text-black hover:border-black" 
                : "text-zinc-500 hover:text-white hover:border-white"
            )}
          >
            Ver Todo la Colección
          </Link>
        )}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Carousel 
          items={items} 
          isHero={false}
          loop={true}
          autoplay={false}
          textVariant={textVariant}
        />
      </div>
    </section>
  );
}
