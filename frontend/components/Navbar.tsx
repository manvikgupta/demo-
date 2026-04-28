"use client";

import Link from 'next/link';
import { useContext } from 'react';
import { AppContext } from './Providers';
import { setAuthToken } from '../lib/api';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, setUser } = useContext(AppContext);
  const router = useRouter();

  const handleLogout = () => {
    setUser(null);
    setAuthToken(null);
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50">
      <Link href="/" className="text-2xl font-bold text-blue-600">EduDiscover</Link>
      <div className="flex gap-6 items-center">
        <Link href="/colleges" className="text-gray-600 hover:text-blue-600">Colleges</Link>
        {user ? (
          <>
            <Link href="/saved" className="text-gray-600 hover:text-blue-600">Saved</Link>
            <button onClick={handleLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-full font-medium hover:bg-red-100 transition">Logout</button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-gray-600 hover:text-blue-600 font-medium px-4">Login</Link>
            <Link href="/register" className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition shadow-md">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
