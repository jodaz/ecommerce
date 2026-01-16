import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import ProductRow from '@/components/home/ProductRow';
import PaymentBanner from '@/components/home/PaymentBanner';

const CATEGORY_1 = [
  { id: 1, title: 'Nevera Bespoke', description: 'Refrigeración inteligente.', cta: '$1,299', image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&q=80&w=600' },
  { id: 2, title: 'Nevera Side-by-Side', description: 'Espacio máximo.', cta: '$1,599', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600' },
  { id: 3, title: 'Congelador Horizontal', description: 'Alta capacidad.', cta: '$499', image: 'https://images.unsplash.com/photo-1536353284924-9220c464e262?auto=format&fit=crop&q=80&w=600' },
  { id: 4, title: 'Nevera Top Mount', description: 'Clásico moderno.', cta: '$899' },
];

const CATEGORY_2 = [
  { id: 5, title: 'Bravia XR 65"', description: '4K HDR OLED.', cta: '$2,199', image: 'https://images.unsplash.com/photo-1593784991095-a205039470b6?auto=format&fit=crop&q=80&w=600' },
  { id: 6, title: 'Cine Lounge 75"', description: 'Experiencia inmersiva.', cta: '$3,499', image: 'https://images.unsplash.com/photo-1558882224-cca166733315?auto=format&fit=crop&q=80&w=600' },
  { id: 7, title: 'Smart TV Slim 55"', description: 'Elegancia pura.', cta: '$999' },
  { id: 8, title: 'Gaming Pro 50"', description: '120Hz refresco.', cta: '$799' },
];

const CATEGORY_3 = [
  { id: 9, title: 'Front Load 20kg', description: 'Lavado vapor.', cta: '$1,099', image: 'https://images.unsplash.com/photo-1545173153-936277343587?auto=format&fit=crop&q=80&w=600' },
  { id: 10, title: 'Twin Wash XL', description: 'Doble carga.', cta: '$1,899', image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&q=80&w=600' },
  { id: 11, title: 'Secadora Heat Pump', description: 'Ahorro energía.', cta: '$1,199' },
  { id: 12, title: 'Wash & Dry Combo', description: 'Todo en uno.', cta: '$1,499' },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <Hero />
      
      <div className="bg-white">
        <ProductRow title="Refrigeración" items={CATEGORY_1} />
        <ProductRow title="Entretenimiento" items={CATEGORY_2} />
        <ProductRow title="Lavandería" items={CATEGORY_3} />
      </div>
      
      <PaymentBanner />
      <Footer />
    </main>
  );
}
