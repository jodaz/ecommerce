'use client';

import Carousel, { CarouselItem } from '@/components/ui/Carousel';

const HERO_ITEMS: CarouselItem[] = [
  {
    id: 1,
    title: 'Minimalismo en tu Cocina',
    description: 'La nueva línea de neveras y congeladores con diseño ultramoderno y eficiencia energética superior.',
    badge: 'Nuevo Lanzamiento',
    cta: 'Explorar Colección',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=2000'
  }
];

interface HeroProps {
  storeName?: string;
}

export default function Hero({ storeName }: HeroProps) {
  return (
    <section className="relative w-full h-[80vh] mt-16 overflow-hidden bg-black">
      {storeName && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mix-blend-difference">{storeName}</h1>
        </div>
      )}
      <Carousel 
        items={HERO_ITEMS} 
        isHero={true} 
        autoplay={true} 
        autoplayDelay={5000} 
        loop={true}
      />
    </section>
  );
}
