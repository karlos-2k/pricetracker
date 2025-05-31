// Import required Next.js components
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

// Define navigation icons with their properties
// These icons will be displayed in the navbar's right section
const navIcons = [
    { src: "/assets/icons/search.svg", alt: "search"},
    { src: "/assets/icons/black-heart.svg", alt: "heart"},
    { src: "/assets/icons/user.svg", alt: "user"}
]

// Navbar component - Main navigation header
const Navbar = () => {
  return (
    <header className='w-full'>
        <nav className="nav flex justify-between items-center px-4 py-2">
            {/* Logo and Brand Name - Left side */}
            <Link href="/" className='flex items-center gap-1'>
                <Image
                src="\assets\icons\logo.svg"
                width={27}
                height={27}
                alt="logo"/>

                {/* Brand name with styled "Tracker" text */}
                <p className='nav-logo'>
                    Price<span className="text-red-700">Tracker</span>
                </p>
            </Link>

            {/* Navigation Icons - Right side */}
            <div className='flex items-center gap-5'>
              {/* Map through navigation icons and create clickable buttons */}
              {navIcons.map((icon) => (
                <div
                  key={icon.alt}
                  className='p-2 rounded-full hover:bg-gray-200 transition duration-200 cursor-pointer'
                >
                  {/* Icon with hover animation */}
                  <Image
                    src={icon.src}
                    alt={icon.alt}
                    width={28}
                    height={28}
                    className='object-contain hover:scale-110 transition-transform duration-200'
                  />
                </div>
              ))}
            </div>
        </nav>
    </header>
  )
}

export default Navbar