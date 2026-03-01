import Link from 'next/link';
import { PRODUCTS } from '@/lib/data';

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex-1">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-12 uppercase">Catálogo de Productos</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
        {PRODUCTS.map(product => (
          <Link href={`/products/${product.id}`} key={product.id} className="group flex flex-col">
            <div className="relative aspect-square mb-4 overflow-hidden bg-zinc-50 border border-zinc-200 group-hover:border-black transition-colors">
              <img 
                src={product.image} 
                alt={product.title} 
                className="object-cover w-full h-full mix-blend-multiply group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">{product.category}</span>
              <h3 className="text-lg font-bold text-black">{product.title}</h3>
              <p className="text-lg text-black mt-2">{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
