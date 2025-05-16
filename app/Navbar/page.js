"use client";
import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full bg-[#386c84] shadow-lg fixed z-50 top-0">
      {/* Main Navbar Section */}
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Left Side - Logo */}
        <div className="flex items-center">
          <Link href="/">
            {/* Add your logo here */}
            <img src="/images/newlogo.png" alt="Parajet Logo" className="w-20 md:w-24 mix-blend-multiply" />
          </Link>
        </div>

        {/* Center - Navigation Links */}
        <div className="hidden md:flex space-x-6 text-sm">
          <Link href="/" className="text-gray-300 hover:text-blue-600 transition-colors duration-300 ">
            HOME
          </Link>
          <Link href="/Paramotors" className="text-gray-300 hover:text-blue-600 transition-colors duration-300">
            PARAMOTORS
          </Link>
          <Link href="/Learn" className="text-gray-300 hover:text-blue-600 transition-colors duration-300">
            LEARN TO FLY
          </Link>
          <Link href="/Support" className="text-gray-300 hover:text-blue-600 transition-colors duration-300">
            SUPPORT
          </Link>
          <Link href="/Gallery" className="text-gray-300 hover:text-blue-600 transition-colors duration-300">
            GALLERY
          </Link>
        </div>

        {/* Right Side - Book Now Button */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/Book" className="bg-green-600 text-white px-4 py-2 text-sm rounded hover:bg-green-700 transition-colors duration-300">
            Book Now
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-300">
            {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#333333] text-white shadow-md absolute top-16  inset-x-0 py-6 px-4 z-40">
          <Link href="/" className="block py-2 text-gray-300 hover:text-blue-600 transition-colors duration-300">
            HOME
          </Link>
          <Link href="/Paramotors" className="block py-2 text-gray-300 hover:text-blue-600 transition-colors duration-300">
            PARAMOTORS
          </Link>
          <Link href="/Learn" className="block py-2 text-gray-300 hover:text-blue-600 transition-colors duration-300">
            LEARN TO FLY
          </Link>
          <Link href="/Support" className="block py-2 text-gray-300 hover:text-blue-600 transition-colors duration-300">
            SUPPORT
          </Link>
          <Link href="/Gallery" className="block py-2 text-gray-300 hover:text-blue-600 transition-colors duration-300">
            GALLERY
          </Link>

          <div className="mt-4">
            <Link href="/Book" className="bg-green-600 text-white px-4 py-2 w-full block text-center rounded hover:bg-green-700 transition-colors duration-300">
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
