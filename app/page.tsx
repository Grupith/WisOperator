"use client"
import Link from "next/link"
import { useState } from "react"

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <main className="bg-white">
      <div className="min-h-screen flex flex-col">
        <header className="bg-white py-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-800 cursor-pointer">
              WisOperator
            </h1>
            <nav
              className={`font-normal text-md ${
                isOpen ? "block" : "hidden"
              } md:flex`}
            >
              <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 items-center">
                <li>
                  <a
                    href="#features"
                    className="hover:underline cursor-pointer"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:underline cursor-pointer">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:underline cursor-pointer">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
            <button className="hidden md:block border py-1 px-3 rounded-md font-medium transition-all hover:bg-gray-200">
              Get Started
            </button>
            <button
              className="md:hidden ml-4"
              onClick={() => setIsOpen(!isOpen)}
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
                  strokeWidth={2}
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </svg>
            </button>
          </div>
        </header>
        <main className="flex-grow container mx-auto px-4 sm:px-2 lg:px-8 py-12">
          <section className="text-center my-12">
            <h2 className="text-4xl font-semibold text-gray-800 mb-4 sm:text-3xl">
              Simplify Job Tracking and Team Communication
            </h2>
            <p className="text-lg text-gray-600 sm:text-base">
              Perfect for small trade businesses.
            </p>
            <div className="flex justify-center">
              <div className="flex flex-col items-start space-y-4 mt-8">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-6 h-6 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-lg text-gray-700">
                    Train New Employees
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-6 h-6 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-lg text-gray-700">
                    Track Job Progress
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-6 h-6 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-lg text-gray-700">
                    Create Tasks for Jobs
                  </span>
                </div>
              </div>
            </div>
            <Link href="signup">
              <button className="text-center mt-10 border text-md bg-gray-900 text-white rounded-md py-2 px-4 font-normal transition-all shadow-md hover:bg-black hover:scale-105">
                Try out for Free
              </button>
            </Link>
          </section>
        </main>
        <footer className="bg-gray-50 text-black py-3">
          <div className="container mx-auto text-center">
            &copy; {new Date().getFullYear()} WisOperator. All rights reserved.
          </div>
        </footer>
      </div>
    </main>
  )
}
