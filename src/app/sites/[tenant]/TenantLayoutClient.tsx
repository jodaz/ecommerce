'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'sonner';

export function TenantLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.includes('/admin');

  if (isAdminRoute) {
    return (
      <>
        {children}
        <Toaster position="top-right" expand={false} richColors={false} />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
      <Toaster position="top-right" expand={false} richColors={false} />
    </>
  );
}
