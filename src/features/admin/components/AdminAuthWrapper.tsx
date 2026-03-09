'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAdminStore } from '@/stores/adminStore';
import { AdminNavbar } from './AdminNavbar';

export function AdminAuthWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAdminStore();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (!isAuthenticated && pathname !== '/admin/login') {
        router.replace('/admin/login');
      }
    }
  }, [isAuthenticated, pathname, router, mounted]);

  if (!mounted) return null;

  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen bg-zinc-100">
      <AdminNavbar />
      {/* Offset for fixed sidebar on desktop, fixed topbar on mobile */}
      <main className="flex-1 md:ml-56 pt-16 md:pt-0 min-h-screen overflow-auto">
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
