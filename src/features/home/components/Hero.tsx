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
  },
  {
    id: 2,
    title: 'Sonido e Imagen Sin Límites',
    description: 'Televisores OLED con negros perfectos y diseño minimalista que se integra en cualquier espacio.',
    badge: 'Tendencia',
    cta: 'Ver Televisores',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: 3,
    title: 'Climatización Inteligente',
    description: 'Aires acondicionados que aprenden de tus hábitos para brindarte el máximo confort con el mínimo consumo.',
    badge: 'Ecoeficiente',
    cta: 'Saber Más',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=2000'
  }
];

export default function Hero() {
  return (
    <section className="relative w-full h-[80vh] mt-16 overflow-hidden bg-black">
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
