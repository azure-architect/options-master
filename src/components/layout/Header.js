// src/components/layout/Header.js
import React from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '../../components/ThemeSwitcher';  // Fix the import path

function Header({ isSidebarOpen, toggleSidebar }) {
  return (
    <header className="bg-gray-900 text-white py-4 px-6 shadow-md flex items-center justify-between">
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 hover:bg-gray-800 rounded-lg"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <h1 className="text-2xl font-bold text-center flex-1 lg:text-left">Options Master</h1>
      <ThemeToggle />
    </header>
  );
}

export default Header;