import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#3C3C3B] py-6">
      <div className="container mx-auto px-4">
        <div className="text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Marriage and Relationship Reflection Institute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 