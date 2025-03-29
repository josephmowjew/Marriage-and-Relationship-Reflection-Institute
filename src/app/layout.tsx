import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { RootClientLayout } from "@/components/layout/RootClientLayout";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
});

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: "MRRI - Marriage and Relationship Reflection Institute",
  description: "Strengthening relationships through expert guidance and support",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <RootClientLayout
        playfairVariable={playfair.variable}
        dmSansVariable={dmSans.variable}
      >
        {children}
      </RootClientLayout>
    </html>
  );
}
