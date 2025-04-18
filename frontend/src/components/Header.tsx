'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-900 text-white shadow">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-semibold tracking-tight hover:opacity-90 transition"
        >
          CountryApp
        </Link>
        <nav className="flex space-x-6 text-sm font-medium">
          <Link href="/" className="hover:text-gray-300 transition">
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}
