import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 transition-transform group-hover:scale-110">
            <Image 
              src="/logo.svg" 
              alt="simpleshop logo" 
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl font-bold tracking-tighter text-black hidden sm:block transition-colors">
            simple<span className="text-emerald-600 group-hover:text-emerald-500 transition-colors">shop</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/products" className="text-sm font-bold uppercase tracking-widest text-zinc-500 hover:text-black transition-colors">
            Catálogo
          </Link>
          <Link href="/contact" className="text-sm font-bold uppercase tracking-widest text-zinc-500 hover:text-black transition-colors">
            Ubicaciones
          </Link>
        </nav>
        <div className="flex md:hidden">
          <span className="text-sm font-bold uppercase">Menú</span>
        </div>
      </div>
    </header>
  );
}
