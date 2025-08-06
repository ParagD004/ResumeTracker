'use client';
import {
    SignInButton,
    SignOutButton,
    SignUpButton,
    // UserButton,
    SignedIn,
    SignedOut,
  } from "@clerk/nextjs";
import Link from "next/link";


export const Navigation = () => {
    return (
      <nav className="bg-[var(--background)] border-b border-[var(--foreground)]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-semibold text-[var(--foreground)]">
                ResumeTracker
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/30 flex items-center gap-2">
                <Link href="/about">About Us</Link>
              </button>
              <SignedOut>
                <SignInButton>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/30 flex items-center gap-2">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/30 flex items-center gap-2">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/30 flex items-center gap-2">
                <Link href="/user-profile">Profile</Link>
                </button>
                <div className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-red-500/30 flex items-center gap-2">
                  <SignOutButton />
                </div>
                {/* <UserButton /> */}
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>
    );
  };