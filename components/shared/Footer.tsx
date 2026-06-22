import React from "react";
import Link from "next/link";
import Logo from "../defaults/Logo";
import { Camera, Globe, Bird } from "lucide-react";

function Footer() {
  return (
    <footer className="w-full  border-t border-white/10 bg-linear-to-r from-[#12081F] via-[#24104A] to-[#1B0B2E] text-white">
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* COLUMN 1 */}
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            Your ultimate gaming store. Discover top games, deals, and more.
          </p>
        </div>

       

        {/* COLUMN 2 - SOCIAL */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white font-semibold mb-2">Follow Us</h3>

          <div className="flex items-center gap-4">
            
            <a
              href="https://www.facebook.com"
              target="_blank"
              className="hover:text-blue-400 transition"
            >
              <Globe size={20} />
            </a>

            <a
              href="https://www.instagram.com"
              target="_blank"
              className="hover:text-pink-400 transition"
            >
              <Camera size={20} />
            </a>

            <a
              href="https://x.com"
              target="_blank"
              className="hover:text-white transition"
            >
              <Bird size={20} />
            </a>

          </div>

          <p className="text-xs text-gray-400 mt-2">
            Stay connected with us on social media
          </p>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10 text-center py-4 text-xs text-gray-500">
        © {new Date().getFullYear()} GameStore. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;