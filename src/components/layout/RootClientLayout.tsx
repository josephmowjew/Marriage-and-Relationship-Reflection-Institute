'use client';

import { AuthProvider } from "@/components/auth/AuthProvider";
import { ClientLayout } from "@/components/layout/ClientLayout";

export function RootClientLayout({
  children,
  playfairVariable,
  dmSansVariable,
}: {
  children: React.ReactNode;
  playfairVariable: string;
  dmSansVariable: string;
}) {
  return (
    <body className={`${playfairVariable} ${dmSansVariable} font-sans min-h-screen flex flex-col`}>
      <AuthProvider>
        <ClientLayout>
          {children}
        </ClientLayout>
      </AuthProvider>
    </body>
  );
} 