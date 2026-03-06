import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight">E-commerce SaaS</span>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter leading-tight">
          Lanza Tu Tienda Online
        </h1>
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-500 font-light">
          Sitios web de comercio electrónico rápidos y minimalistas. Pon tu tienda en línea hoy.
        </p>
        <Link 
          href="http://tienda.localhost:3000"
          target="_blank"
          className="bg-black text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all shadow-md"
        >
          Ver Tienda de Prueba
        </Link>
      </main>

      <footer className="border-t border-gray-100 py-8 text-center text-gray-400">
        <p>© {new Date().getFullYear()} E-commerce SaaS. Construido para escalar.</p>
      </footer>
    </div>
  );
}
