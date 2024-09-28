'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { logout } from 'public/utils/firebase'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOutUser } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo ou Nome do App */}
        <div className="text-3xl font-bold">
          <Link href="/home" className="hover:text-gray-300 transition">Aplicativo de Tarefas</Link>
        </div>
  
        {/* Menu Normal */}
        <div className="hidden md:flex space-x-8">
          {user && (
            <>
              <Link href="/home" className="hover:text-gray-300 transition">Home</Link>
              <Link href="/profile" className="hover:text-gray-300 transition">Perfil</Link>
            </>
          )}
          {user ? (
            <button onClick={handleLogout} className="hover:text-gray-300 transition">
              Sair
            </button>
          ) : (
            <Link href="/" className="hover:text-gray-300 transition">Login</Link>
          )}
        </div>
  
        {/* Menu Hambúrguer (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>
  
      {/* Dropdown Menu para Mobile */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 bg-blue-500 rounded-lg shadow-md">
          {user && (
            <>
              <Link href="/home" onClick={closeMenu} className="block px-4 py-2 hover:bg-blue-400 transition">Home</Link>
              <Link href="/profile" onClick={closeMenu} className="block px-4 py-2 hover:bg-blue-400 transition">Perfil</Link>
            </>
          )}
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                closeMenu();
              }}
              className="block px-4 py-2 w-full text-left hover:bg-blue-400 transition"
            >
              Sair
            </button>
          ) : (
            <Link href="/" onClick={closeMenu} className="block px-4 py-2 hover:bg-blue-400 transition">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
  
};

export default Navbar;