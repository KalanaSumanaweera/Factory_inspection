// app/components/Navbar.tsx
'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white flex gap-6">
      <Link href="/" className="hover:underline">Home</Link>
      <Link href="/dashboard" className="hover:underline">Dashboard</Link>
      <Link href="/submit" className="hover:underline">Submit</Link>
      <Link href="/about" className="hover:underline">About</Link>
      <Link href="/settings" className="hover:underline">
        Settings
      </Link>
    </nav>
  );
}
