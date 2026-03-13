'use client';

import { usePathname } from 'next/navigation';
import Navbar from './_components/layout/Navbar';
import Footer from './_components/layout/Footer';
import { Toaster } from 'sonner';

interface TenantLayoutClientProps {
  children: React.ReactNode;
  business: any; // We can refine this type eventually, but 'any' is quick for the DB return
}

export function TenantLayoutClient({ children, business }: TenantLayoutClientProps) {
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
      <Navbar business={business} />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer business={business} />
      <Toaster position="top-right" expand={false} richColors={false} />
    </>
  );
}
