import Link from 'next/link';
import React from 'react';
import { FileText } from 'lucide-react';
import { Button } from '../ui/button';
import NavLink from './nav-link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Header = () => {
  return (
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
      {/* Left: Logo */}
      <div className="flex lg:flex-1">
        <NavLink href="/">
          <div className="flex items-center gap-1 lg:gap-2 shrink-0">
            <FileText 
              className="w-5 h-5 lg:w-8 lg:h-8 text-gray-500 hover:rotate-12 transform transition duration-200 ease-in-out" 
              aria-label="Sommaire Logo"
            />
            <span className="font-extrabold lg:text-xl text-gray-900">Sommaire</span>
          </div>
        </NavLink>
      </div>

      {/* Center: Navigation Links */}
      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <NavLink href="/#pricing" className="text-gray-800 hover:text-black transition">
          Pricing
        </NavLink>
        <SignedIn>
          <NavLink href="/dashboard" className="text-gray-800 hover:text-black transition">
            Your Summaries
          </NavLink>
        </SignedIn>
      </div>

      {/* Right: Auth Controls */}
      <div className="flex lg:justify-end lg:flex-1 gap-4 items-center">
        <SignedIn>
          <Link href="/upload" className="text-gray-800 hover:text-black transition" aria-label="Upload a PDF">
            Upload a PDF
          </Link>
          <div className="text-sm font-semibold text-gray-600">Pro</div>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        <SignedOut>
          <Link href="/sign-in" className="text-gray-800 hover:text-black transition" aria-label="Sign In">
            Sign In
          </Link>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Header;
