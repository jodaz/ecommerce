'use client';

import { usePathname } from 'next/navigation';
import Navbar from './_components/layout/Navbar';
import Footer from './_components/layout/Footer';
import { Toaster } from 'sonner';

interface TenantLayoutClientProps {
  children: React.ReactNode;
  business: {
    id: string;
    name: string;
    slug: string;
    logo_url?: string;
  };
  usdRate: number;
}

export function TenantLayoutClient({ children, business, usdRate }: TenantLayoutClientProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.includes('/admin');

  if (isAdminRoute) {
    return (
      <>
        {children}
        <Toaster position="top-right" expand={false} richColors={false} duration={3000} />
      </>
    );
  }

  return (
    <>
      <Navbar business={business} usdRate={usdRate} />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer business={business} />
      <Toaster position="top-right" expand={false} richColors={false} duration={3000} />
    </>
  );
}
