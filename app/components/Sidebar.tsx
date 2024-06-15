import React from "react"
import Link from "next/link"
import { useAuth } from "../contexts/AuthContext"

interface SidebarProps {
  toggleSidebar: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ toggleSidebar }) => {
  const { user } = useAuth()
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col lg:sticky lg:top-0 lg:h-screen min-h-screen justify-between shadow-md">
      <section>
        <div className="flex justify-between mx-2 items-center lg:justify-center">
          <span className="p-4 text-xl font-semibold">- WisOperator -</span>
          <button className="lg:hidden p-4 w-fit" onClick={toggleSidebar}>
            <svg
              className="w-6 h-6 text-white"
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
        </div>
        <nav className="flex flex-col mt-4 space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center mx-2 hover:bg-gray-600 text-lg rounded-lg"
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white ml-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M11 4.717c-2.286-.58-4.16-.756-7.045-.71A1.99 1.99 0 0 0 2 6v11c0 1.133.934 2.022 2.044 2.007 2.759-.038 4.5.16 6.956.791V4.717Zm2 15.081c2.456-.631 4.198-.829 6.956-.791A2.013 2.013 0 0 0 22 16.999V6a1.99 1.99 0 0 0-1.955-1.993c-2.885-.046-4.76.13-7.045.71v15.081Z"
                clipRule="evenodd"
              />
            </svg>

            <span className="px-2 py-2 text-white">Dashboard</span>
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center mx-2 hover:bg-gray-600 text-lg rounded-lg"
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white ml-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7.833 2c-.507 0-.98.216-1.318.576A1.92 1.92 0 0 0 6 3.89V21a1 1 0 0 0 1.625.78L12 18.28l4.375 3.5A1 1 0 0 0 18 21V3.889c0-.481-.178-.954-.515-1.313A1.808 1.808 0 0 0 16.167 2H7.833Z" />
            </svg>

            <span className="px-2 py-2 text-white line-through">Jobs</span>
          </Link>
          <Link
            href="/employees"
            className="flex items-center mx-2 hover:bg-gray-600 text-lg rounded-lg"
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white ml-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z"
                clipRule="evenodd"
              />
            </svg>

            <span className="px-2 py-2 text-white">Employees</span>
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center mx-2 hover:bg-gray-600 text-lg rounded-lg"
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white ml-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z"
                clipRule="evenodd"
              />
            </svg>

            <span className="px-2 py-2 text-white line-through">Settings</span>
          </Link>
        </nav>
      </section>
      <div className="flex text-sm justify-center">
        <p className="p-2">
          Email:{" "}
          <span className="text-blue-600 font-medium">
            {user?.email || "email error"}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Sidebar
