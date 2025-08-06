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
import { usePathname } from "next/navigation";


export const Navigation = () => {
  const pathname = usePathname();
  if(pathname !== '/') {
    return null;
  }
    return (
      <nav className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-lg border-b border-[var(--foreground)]/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14 items-center"> {/* Reduced height for smaller navbar */}
            <div className="flex-shrink-0" style={{ width: '120px', height: '30px' }}>
              <img
                src="/favicon.png"
                alt="ResumeTracker Logo"
                className="object-contain rounded-lg shadow-md"
                style={{ width: '120px', height: '27px', display: 'block', background: '#111' }}
                onError={e => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-[#347188] text-white rounded-xl hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/30 flex items-center gap-2">
                <Link href="/about">About Us</Link>
              </button>
              <SignedOut>
                <SignInButton>
                  <button className="px-4 py-2 bg-[#347188] text-white rounded-xl hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/30 flex items-center gap-2">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="px-4 py-2 bg-[#347188] text-white rounded-xl hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/30 flex items-center gap-2">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <button className="px-4 py-2 bg-[#347188] text-white rounded-xl hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/30 flex items-center gap-2">
                  <Link href="/user-profile">Profile</Link>
                </button>
                <div className="px-4 py-2 bg-red-400 text-white rounded-xl hover:bg-red-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-red-500/30 flex items-center gap-2">
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