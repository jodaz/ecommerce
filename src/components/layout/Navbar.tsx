import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="/LOGO.png" 
            alt="Mega Import C.A. Logo" 
            width={120} 
            height={40} 
            className="object-contain w-auto h-8"
            priority
          />
          <span className="text-xl font-bold tracking-tighter uppercase text-black hidden sm:block">
            Mega Import
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
