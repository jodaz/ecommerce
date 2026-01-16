'use client';

import Link from 'next/link';
import { Search, ShoppingBag, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-black tracking-tighter text-black">
              JODAZ
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <Link href="/productos" className="text-gray-900 hover:text-black transition-colors">
              Productos
            </Link>
            <Link href="/ofertas" className="text-gray-500 hover:text-black transition-colors">
              Ofertas
            </Link>
            <Link href="/nosotros" className="text-gray-500 hover:text-black transition-colors">
              Nosotros
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-black transition-colors">
              <Search size={20} />
            </button>
            <button className="text-gray-500 hover:text-black transition-colors relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </button>
            <button className="md:hidden text-gray-500 hover:text-black transition-colors">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
