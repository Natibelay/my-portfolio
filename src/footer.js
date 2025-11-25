import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      {/* Horizontal Contact Section */}
      <div className="px-6 py-6 flex flex-wrap justify-center items-center gap-10 border-b border-gray-700">

        <div className="flex items-center gap-2">
          <span className="font-bold text-orange-400"></span>
          <a href="mailto:natnael@example.com" className="hover:underline text-white">
            Contact me
          </a>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-orange-400">📧 Email:</span>
          <a href="mailto:natibelay@gmail.com" className="hover:underline text-white">
            Natibelay@gmail.com
          </a>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-orange-400">📞 Phone:</span>
          <a href="tel:+251912345678" className="hover:underline text-white">
            +251 912 345 678
          </a>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-orange-400">📍 Address:</span>
          <span className="text-white">Addis Ababa, Ethiopia</span>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="px-6 py-4 text-center text-white">
        &copy; 2025 Natnael Belayneh. All rights reserved.
      </div>
    </footer>
  );
}
