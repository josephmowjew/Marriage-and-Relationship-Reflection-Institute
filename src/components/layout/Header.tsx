import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function Header() {
  return (
    <header className="absolute w-full z-10">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo and Name */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-6 h-6 bg-red-600 transform rotate-45"></div>
          <span className="text-sm font-medium text-gray-600">Marriage and Relationship Reflection Institute</span>
        </Link>
        
        {/* Main Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {/* Programs Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 text-gray-800 hover:text-red-600 transition-colors">
              Marriage Programs
              <ChevronDown className="w-4 h-4 opacity-50" />
            </button>
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="bg-white rounded-lg shadow-md py-2">
                <Link href="/pre-marriage" className="block px-4 py-2 text-sm hover:text-red-600 hover:bg-gray-50">
                  Pre-Marriage
                </Link>
                <Link href="/marriage" className="block px-4 py-2 text-sm hover:text-red-600 hover:bg-gray-50">
                  Marriage
                </Link>
              </div>
            </div>
          </div>

          {/* Mentorship Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 text-gray-800 hover:text-red-600 transition-colors">
              Mentorship
              <ChevronDown className="w-4 h-4 opacity-50" />
            </button>
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="bg-white rounded-lg shadow-md py-2">
                <Link href="/marriage-mentorship" className="block px-4 py-2 text-sm hover:text-red-600 hover:bg-gray-50">
                  Marriage
                </Link>
                <Link href="/pastoral-mentorship" className="block px-4 py-2 text-sm hover:text-red-600 hover:bg-gray-50">
                  Pastoral
                </Link>
              </div>
            </div>
          </div>

          <Link href="/seminars" className="text-gray-800 hover:text-red-600 transition-colors">
            Seminars
          </Link>

          <Link href="/resources" className="text-gray-800 hover:text-red-600 transition-colors">
            Resources
          </Link>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 ml-4">
            <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" asChild>
              <Link href="/book">Book a Session</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
} 