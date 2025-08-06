"use client";
import { FaInstagram, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800/50 backdrop-blur-md border-t border-gray-700 py-4 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Us Section */}
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-white">Contact Us</h3>
          <div className="space-y-1">
            <a
              href="mailto:paragdharmik004@gmail.com"
              className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
            >
              <FaEnvelope className="text-blue-400" />
              paragdharmik004@gmail.com
            </a>
            <a
              href="tel:+919699870424"
              className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
            >
              <FaPhoneAlt className="text-green-400" />
              +91-9699807424
            </a>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-white">Follow Us</h3>
          <div className="space-y-3">
            {/* Instagram */}
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/parag_dharmik_004"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full hover:scale-110 transition-transform"
              >
                <FaInstagram className="text-white text-xl" />
              </a>
              <a
                href="https://instagram.com/parag_dharmik_004"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-gray-300">Instagram</span>
              </a>
            </div>

            {/* LinkedIn */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/parag-dharmik-004/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-700 rounded-full hover:scale-110 transition-transform"
              >
                <FaLinkedin className="text-white text-xl" />
              </a>
              <a
                href="https://www.linkedin.com/in/parag-dharmik-445ab9257"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-gray-300">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">Quick Links</h3>
          <div className="flex flex-col gap-2">
            <Link
              href="/privacy"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/faq"
              className="text-gray-300 hover:text-white transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/admin"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="max-w-7xl mx-auto mt-1 pt-3 border-t border-gray-700">
        <p className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Resume Tracker. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
