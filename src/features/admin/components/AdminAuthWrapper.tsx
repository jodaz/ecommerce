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

  // Prevent hydration errors with Zustand persist
  if (!mounted) return null; 

  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  // Double check, do not render dashboard content if not authenticated
  if (!isAuthenticated) return null;

  return (
    <>
      <AdminNavbar />
      <main className="pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </>
  );
}
