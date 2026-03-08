import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 bg-zinc-50 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Image 
              src="/logo.svg" 
              alt="simpleshop logo" 
              width={120} 
              height={40} 
              className="object-contain w-auto h-8"
            />
            <span className="text-xl font-bold tracking-tighter text-black">
              simpleshop
            </span>
          </div>
          <p className="text-zinc-500">
            Crea, gestiona y escala tu negocio digital con la plataforma multi-tenant definitiva.
          </p>
        </div>
        
        <div className="flex flex-col gap-4">
          <h3 className="font-bold uppercase tracking-widest text-black">Contacto</h3>
          <p className="text-zinc-500">
            WhatsApp: <br />
            <a href="https://wa.me/584121315110" className="text-black font-semibold hover:text-zinc-600 transition-colors" target="_blank" rel="noopener noreferrer">
              +58 412 13 15 110
            </a>
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-bold uppercase tracking-widest text-black">Legal</h3>
          <div className="flex flex-col gap-2">
            <Link href="/terms" className="text-zinc-500 hover:text-black transition-colors">
              Términos de Servicio
            </Link>
            <Link href="/privacy" className="text-zinc-500 hover:text-black transition-colors">
              Política de Privacidad
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-zinc-200 text-center text-xs text-zinc-400">
        &copy; {new Date().getFullYear()} simpleshop. Todos los derechos reservados.
      </div>
    </footer>
  );
}
