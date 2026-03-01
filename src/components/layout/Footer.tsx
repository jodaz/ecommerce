import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 bg-zinc-50 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Image 
              src="/LOGO.png" 
              alt="Mega Import C.A. Logo" 
              width={120} 
              height={40} 
              className="object-contain w-auto h-8"
            />
            <span className="text-xl font-bold tracking-tighter uppercase text-black">
              Mega Import
            </span>
          </div>
          <p className="text-zinc-500">
            Tu tienda Mega de confianza. Encuentra los mejores productos y ofertas.
          </p>
        </div>
        
        <div className="flex flex-col gap-4">
          <h3 className="font-bold uppercase tracking-widest text-black">Contacto</h3>
          <p className="text-zinc-500">
            WhatsApp: <br />
            <a href="https://wa.me/5804121833072" className="text-black font-semibold hover:text-zinc-600 transition-colors" target="_blank" rel="noopener noreferrer">
              +58 0412 1833072
            </a>
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-bold uppercase tracking-widest text-black">Enlaces Rápidos</h3>
          <div className="flex flex-col gap-2">
            <Link href="/products" className="text-zinc-500 hover:text-black transition-colors">
              Catálogo de Productos
            </Link>
            <Link href="/contact" className="text-zinc-500 hover:text-black transition-colors">
              Nuestras Tiendas
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-zinc-200 text-center text-xs text-zinc-400">
        &copy; {new Date().getFullYear()} Mega Import C.A. Todos los derechos reservados.
      </div>
    </footer>
  );
}
