import Link from "next/link";
import React from "react";
import { FileText } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../mode-toggle";
import NavLink from "./nav-link";
import PlaneBadge from "./PlaneBadge";


const Header = () => {
  return (
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto transition-colors">
      {/* Left: Logo */}
      <div className="flex lg:flex-1">
        <NavLink href="/">
          <div className="flex items-center gap-1 lg:gap-2 shrink-0">
            <FileText
              className="w-5 h-5 lg:w-8 lg:h-8 text-gray-700 dark:text-gray-300 hover:rotate-12 transform transition duration-200 ease-in-out"
              aria-label="Sommaire Logo"
            />
            <span className="font-extrabold lg:text-xl text-gray-900 dark:text-white">
              PSum
            </span>
          </div>
        </NavLink>
      </div>

      {/* Center: Navigation Links */}
      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <NavLink
          href="/#pricing"
          className="text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors"
        >
          Pricing
        </NavLink>

        <SignedIn>
          <NavLink
            href="/dashboard"
            className="text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors"
          >
            Your Summaries
          </NavLink>
        </SignedIn>
      </div>

      {/* Right: Auth Controls */}
      <div className="flex lg:justify-end lg:flex-1 gap-4 items-center">
        <SignedIn>
          <Link
            href="/upload"
            className="text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors"
            aria-label="Upload a PDF"
          >
            Upload a PDF
          </Link>
          <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">
          <PlaneBadge/>
          </div>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        <SignedOut>
          <Link
            href="/sign-in"
            className="text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors"
            aria-label="Sign In"
          >
            Sign In
          </Link>
        </SignedOut>

        <div className=" shadow-md ">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Header;
