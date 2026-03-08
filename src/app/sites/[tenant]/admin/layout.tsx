import type { Metadata } from 'next';
import { AdminAuthWrapper } from '@/features/admin/components/AdminAuthWrapper';

export const metadata: Metadata = {
  title: 'Panel de Administración | simpleshop',
  description: 'Gestión de Inventario y Pedidos',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <AdminAuthWrapper>
        {children}
      </AdminAuthWrapper>
    </div>
  );
}
