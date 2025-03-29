'use client';

import { usePathname } from 'next/navigation';
import { isAdminRoute } from "@/lib/utils";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = isAdminRoute(pathname || '');

  return (
    <>
      {!isAdmin && <Header />}
      <main className="flex-1">
        {children}
      </main>
      {!isAdmin && <Footer />}
    </>
  );
} 