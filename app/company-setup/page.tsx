"use client"
import { useRouter } from "next/navigation"
import React from "react"

const CompanySetup = () => {
  const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-semibold my-10">Welcome!</h1>
      <p className="text-center text-lg mb-10 text-gray-600 max-w-md">
        To get started, choose an option below. You can either start a new
        company or join an existing one using a Company ID.
      </p>
      <div className="space-y-4 w-full max-w-sm">
        <button
          onClick={() => router.push("/create-company")}
          className="w-full py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors"
        >
          Start a Company
        </button>
        <button
          onClick={() => router.push("/join-company")}
          className="w-full py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors"
        >
          Join a Company
        </button>
      </div>
    </div>
  )
}

export default CompanySetup
