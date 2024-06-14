import Image from "next/image"
import React, { useState, useEffect, useRef } from "react"
import { useAuth } from "../contexts/AuthContext"

interface NavbarProps {
  toggleSidebar: () => void
  companyName?: string
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, companyName }) => {
  const { user, logout } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false)
    }
  }

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownOpen])

  return (
    <div className="w-full bg-gray-200 shadow-lg p-4 flex justify-between items-center lg:justify-end relative">
      <button className="lg:hidden" onClick={toggleSidebar}>
        <svg
          className="w-6 h-6 text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <span className="text-lg font-semibold">
        {companyName || "Dashboard"}
      </span>
      <div className="relative" ref={dropdownRef}>
        <div className="cursor-pointer" onClick={toggleDropdown}>
          {user?.photoURL && (
            <Image
              src={user.photoURL}
              alt="User Photo"
              width={30}
              height={30}
              className="rounded-full ml-2"
            />
          )}
        </div>
        {dropdownOpen && (
          <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Account
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={logout}
            >
              Logout
            </li>
          </ul>
        )}
      </div>
    </div>
  )
}

export default Navbar
