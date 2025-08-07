"use client";
import { FaInstagram, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800/50 backdrop-blur-md border-t border-gray-700 py-2 px-2 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
        {/* Contact Us Section */}
        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-semibold text-white">Contact Us</h3>
          <div className="space-y-1">
            <a
              href="mailto:paragdharmik004@gmail.com"
              className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
            >
              <FaEnvelope className="text-blue-400 text-base sm:text-lg" />
              paragdharmik004@gmail.com
            </a>
            <a
              href="tel:+919699870424"
              className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
            >
              <FaPhoneAlt className="text-green-400 text-base sm:text-lg" />
              +91-9699807424
            </a>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-semibold text-white">Follow Us</h3>
          <div className="space-y-2 sm:space-y-3">
            {/* Instagram */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/parag_dharmik_004"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full hover:scale-110 transition-transform"
              >
                <FaInstagram className="text-white text-base sm:text-lg" />
              </a>
              <a
                href="https://instagram.com/parag_dharmik_004"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-gray-300 hover:text-white transition-colors">Instagram</span>
              </a>
            </div>

            {/* LinkedIn */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/parag-dharmik-445ab9257"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 bg-blue-700 rounded-full hover:scale-110 transition-transform"
              >
                <FaLinkedin className="text-white text-base sm:text-lg" />
              </a>
              <a
                href="https://www.linkedin.com/in/parag-dharmik-445ab9257"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-gray-300 hover:text-white transition-colors">LinkedIn</span>
              </a>
            </div>

            {/* GitHub */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/ParagD004"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 bg-gray-900 rounded-full hover:scale-110 transition-transform"
              >
                {/* GitHub icon */}
                <svg className="text-white text-base sm:text-lg" fill="currentColor" viewBox="0 0 24 24" width="18" height="18">
                  <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.525.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.338 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://github.com/ParagD004"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-gray-300 hover:text-white transition-colors">GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-semibold text-white">Quick Links</h3>
          <div className="flex flex-col gap-1">
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
      <div className="max-w-7xl mx-auto mt-1 pt-2 border-t border-gray-700">
        <p className="text-center text-gray-400 text-xs">
          © {new Date().getFullYear()} Parag Dharmik. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
