'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  DashboardIcon,
  ShoppingBagIcon,
  PackageIcon,
  SettingsIcon,
  LogOutIcon,
  StoreIcon,
  MenuIcon,
  XIcon,
  TagIcon,
  ExternalLinkIcon
} from '@/components/core/icons';
import { useAdminStore } from '@/stores/adminStore';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard',     path: '/admin',           icon: DashboardIcon },
  { name: 'Pedidos',       path: '/admin/orders',    icon: ShoppingBagIcon },
  { name: 'Inventario',    path: '/admin/inventory', icon: PackageIcon },
  { name: 'Categorías',    path: '/admin/categories',icon: TagIcon },
  { name: 'Configuración', path: '/admin/settings',  icon: SettingsIcon },
];

export function AdminNavbar() {
  const pathname  = usePathname();
  const { logout, activeSubscription } = useAdminStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-2 text-white">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0">
            <StoreIcon className="w-4 h-4 text-white" />
          </div>
          <span className="text-base font-bold tracking-tight">
            simple<span className="text-emerald-400">shop</span>
          </span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-zinc-400 hover:text-white transition-colors"
        >
          <MenuIcon className="w-6 h-6" />
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
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0">
                <StoreIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold tracking-tight hidden md:inline-block uppercase tracking-tighter">
                simple<span className="text-emerald-400">shop</span>
              </span>
              <span className="text-base font-bold tracking-tight md:hidden">
                Menú
              </span>
            </div>
            
            {/* Subscription Tag */}
            {activeSubscription && (
              <div className="mt-1">
                <span className={cn(
                  "px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.15em] border rounded-none inline-block",
                  activeSubscription.plan_name === 'Empresarial' 
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" 
                    : "bg-zinc-500/10 text-zinc-400 border-zinc-500/30"
                )}>
                  Plan {activeSubscription.plan_name}
                </span>
              </div>
            )}
          </div>
          <button 
            className="md:hidden p-2 text-zinc-400 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ name, path, icon: IconComponent }) => {
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
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors uppercase tracking-widest text-[10px]',
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-zinc-400 hover:bg-white/5 hover:text-white',
                )}
              >
                <IconComponent className="w-4 h-4 shrink-0" />
                {name}
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-zinc-800 space-y-1">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:bg-white/5 hover:text-white transition-colors uppercase tracking-widest text-[10px]"
          >
            <ExternalLinkIcon className="w-4 h-4 shrink-0" />
            Ver sitio web
          </Link>
          <button
            onClick={async () => {
              const { createClient } = await import('@/lib/supabase/client');
              const supabase = createClient();
              await supabase.auth.signOut();
              logout();
              window.location.href = '/admin/login';
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:bg-white/5 hover:text-red-400 transition-colors uppercase tracking-widest text-[10px]"
          >
            <LogOutIcon className="w-4 h-4 shrink-0" />
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}
