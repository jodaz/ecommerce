import Link from "next/link";
import { LayoutIcon } from "@/components/core/icons";

export function PublicNavbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 transition-transform group-hover:scale-110 flex items-center justify-center bg-emerald-500 rounded-lg">
            <LayoutIcon className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white transition-colors">
            simple<span className="text-emerald-500 group-hover:text-emerald-400 transition-colors">shop</span>
          </span>
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
        <Link href="/#features" className="hover:text-white transition-colors">Características</Link>
        <Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link>
      </div>
      <div className="flex items-center gap-4">
        <Link 
          href="/#cta" 
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
        >
          Saber Más
        </Link>
      </div>
    </nav>
  );
}
