"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  function logout() {
    router.push('/signin');
  }

  return (
    <nav className="bg-gray-300 text-white flex justify-between px-6 py-3 items-center">
      <Link href="/" className="text-xl font-bold text-black">
        Challenges
      </Link>
      <button
        onClick={logout}
        className="bg-blue-600 px-3 py-1 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </nav>
  );
}
