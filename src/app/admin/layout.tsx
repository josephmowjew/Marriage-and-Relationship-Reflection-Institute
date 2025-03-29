'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import AdminLayout from '@/components/admin/layout/AdminLayout';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthCheck>
      <AdminLayout>{children}</AdminLayout>
    </AuthCheck>
  );
}

function AuthCheck({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600" />
      </div>
    );
  }

  if (!session?.user) {
    redirect('/login?callbackUrl=/admin');
    return null;
  }

  // Check if user has admin role
  if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col p-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-600 text-center max-w-md">
          You don't have permission to access the admin dashboard. 
          Please contact an administrator if you believe this is an error.
        </p>
      </div>
    );
  }

  return <>{children}</>;
} 