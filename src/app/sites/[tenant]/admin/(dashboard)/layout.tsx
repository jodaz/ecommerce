import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getStoreRole, isPlatformAdmin } from '@/lib/supabase/rbac';
import { AdminNavbar } from '~features/admin/components/AdminNavbar';

import { getStoreByDomain } from '~features/stores/api/getStoreByDomain';

export const metadata: Metadata = {
  title: 'Panel de Administración | simpleshop',
  description: 'Gestión de Inventario y Pedidos',
};

export default async function AdminLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;

  // Busca la tienda por subdominio
  const store = await getStoreByDomain(tenant);

  if (!store) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-50 text-zinc-900">
        <h1 className="text-xl font-bold">Tienda no encontrada</h1>
      </div>
    );
  }

  // Valida la autorización del lado del servidor vía RBAC
  const [role, isSuper] = await Promise.all([
    getStoreRole(store.id),
    isPlatformAdmin()
  ]);

  if (!role && !isSuper) {
    redirect('/admin/login?error=unauthorized_for_store');
  }

  return (
    <div className="flex min-h-screen bg-zinc-100 text-zinc-900">
      <AdminNavbar />
      <main className="flex-1 md:ml-56 pt-16 md:pt-0 min-h-screen overflow-auto">
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
