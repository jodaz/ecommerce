'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Settings,
  LogOut,
  Store,
  Menu,
  X,
  Tag
} from 'lucide-react';
import { useAdminStore } from '@/stores/adminStore';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard',     path: '/admin',           icon: LayoutDashboard },
  { name: 'Pedidos',       path: '/admin/orders',    icon: ShoppingBag },
  { name: 'Inventario',    path: '/admin/inventory', icon: Package },
  { name: 'Categorías',    path: '/admin/categories',icon: Tag },
  { name: 'Configuración', path: '/admin/settings',  icon: Settings },
];

export function AdminNavbar() {
  const pathname  = usePathname();
  const { logout } = useAdminStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-2 text-white">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0">
            <Store className="w-4 h-4 text-white" />
          </div>
          <span className="text-base font-bold tracking-tight">
            simple<span className="text-emerald-400">shop</span>
          </span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-zinc-400 hover:text-white transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 w-64 md:w-56 bg-zinc-900 text-white flex flex-col z-50 transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Brand (Desktop) / Mobile Close Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0">
              <Store className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold tracking-tight hidden md:inline-block">
              simple<span className="text-emerald-400">shop</span>
            </span>
            <span className="text-base font-bold tracking-tight md:hidden">
              Menú
            </span>
          </div>
          <button 
            className="md:hidden p-2 text-zinc-400 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ name, path, icon: Icon }) => {
            const isActive =
              path === '/admin'
                ? pathname === path || pathname === path + '/'
                : pathname?.startsWith(path);

            return (
              <Link
                key={path}
                href={path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-zinc-400 hover:bg-white/5 hover:text-white',
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {name}
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer – logout */}
        <div className="px-3 py-4 border-t border-zinc-800">
          <button
            onClick={async () => {
              const { createClient } = await import('@/lib/supabase/client');
              const supabase = createClient();
              await supabase.auth.signOut();
              logout();
              window.location.href = '/admin/login';
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:bg-white/5 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}
