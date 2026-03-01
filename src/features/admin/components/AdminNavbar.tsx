'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Store, LogOut } from 'lucide-react';
import { useAdminStore } from '@/stores/adminStore';
import { cn } from '@/lib/utils';

export function AdminNavbar() {
  const pathname = usePathname();
  const { logout } = useAdminStore();

  const navItems = [
    { name: 'Inicio', path: '/admin' },
    { name: 'Pedidos', path: '/admin/orders' },
    { name: 'Inventario', path: '/admin/inventory' },
    { name: 'Configuración', path: '/admin/settings' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-zinc-200 z-50 flex items-center px-6 lg:px-8 justify-between">
      {/* Brand Logo & Tabs Group */}
      <div className="flex items-center gap-12 h-full">
        <div className="flex items-center gap-3 text-black">
          <Store className="w-6 h-6" />
          <span className="text-lg font-bold tracking-tight uppercase">Mega Import</span>
        </div>

        {/* Navigation Tabs */}
        <div className="hidden md:flex items-center gap-8 h-full">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/admin' && pathname?.startsWith(item.path));
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "relative h-full flex items-center text-sm font-bold uppercase tracking-widest transition-colors",
                  isActive 
                    ? "text-black" 
                    : "text-zinc-500 hover:text-zinc-800"
                )}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-black" />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => logout()}
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-500 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Salir</span>
        </button>
      </div>
    </nav>
  );
}
