'use client';

import * as React from "react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
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
            <button className="flex items-center gap-1.5 text-gray-800 hover:text-red-600 transition-colors py-2">
              Marriage Programs
              <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity group-hover:text-red-600" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg py-2 px-1 min-w-[220px] border border-gray-100"
              >
                <Link href="/pre-marriage" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-colors">
                  Pre-Marriage
                </Link>
                <Link href="/marriage" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-colors">
                  Marriage
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Mentorship Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 text-gray-800 hover:text-red-600 transition-colors py-2">
              Mentorship
              <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity group-hover:text-red-600" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg py-2 px-1 min-w-[220px] border border-gray-100"
              >
                <Link href="/marriage-mentorship" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-colors">
                  Marriage
                </Link>
                <Link href="/pastoral-mentorship" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-colors">
                  Pastoral
                </Link>
              </motion.div>
            </div>
          </div>

          <Link href="/seminars" className="text-gray-800 hover:text-red-600 transition-colors py-2">
            Seminars
          </Link>

          <Link href="/resources" className="text-gray-800 hover:text-red-600 transition-colors py-2">
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
};

export default Header; 