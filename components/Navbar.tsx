import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const navIcons = [
    { src: "/assets/icons/search.svg", alt: "search"},
    { src: "/assets/icons/black-heart.svg", alt: "heart"},
    { src: "/assets/icons/user.svg", alt: "user"}
]

const Navbar = () => {
  return (
    <header className='w-full'>
        <nav className="nav flex justify-between items-center px-4 py-2">
            <Link href="/" className='flex items-center gap-1'>
                <Image
                src="\assets\icons\logo.svg"
                width={27}
                height={27}
                alt="logo"/>

                <p className='nav-logo'>
                    Price<span className="text-red-700">Tracker</span>
                </p>
            </Link>

            <div className='flex items-center gap-5'>
  {navIcons.map((icon) => (
    <div
      key={icon.alt}
      className='p-2 rounded-full hover:bg-gray-200 transition duration-200 cursor-pointer'
    >
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