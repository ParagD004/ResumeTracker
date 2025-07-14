'use client';
import { FaInstagram, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800/50 backdrop-blur-md border-t border-gray-700 py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Us Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Contact Us</h3>
          <div className="space-y-2">
            <a href="paragdharmik004@gmail.com" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
              <FaEnvelope className="text-blue-400" />
              paragdharmik004@gmail.com
            </a>
            <a href="tel:+919699870424" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
              <FaPhoneAlt className="text-green-400" />
              +91-9699807424
            </a>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Follow Us</h3>
          <div className="flex items-center gap-4">
            <a 
              href="https://instagram.com/parag_dharmik_004" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full hover:scale-110 transition-transform"
            >
              <FaInstagram className="text-white text-xl" />
            </a>
            <span className="text-gray-300">@parag_dharmik_004</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Quick Links</h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-gray-700">
        <p className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Resume Tracker. All rights reserved.
        </p>
      </div>
    </footer>
  );
}