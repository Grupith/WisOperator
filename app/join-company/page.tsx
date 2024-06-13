"use client"
import React, { useState } from "react"

const JoinCompany = () => {
  const [companyId, setCompanyId] = useState("")

  const handleJoin = () => {
    // Add logic to join a company using the entered ID
    console.log("Joining company with ID:", companyId)
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-semibold my-10">Join a Company</h1>
      <p className="text-center text-lg mb-10 text-gray-600 max-w-md">
        Enter the Company ID provided by your company to join and get started.
      </p>
      <div className="w-full max-w-sm space-y-4">
        <input
          type="text"
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          placeholder="Enter Company ID"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
        <button
          onClick={handleJoin}
          className="w-full py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors"
        >
          Join Company
        </button>
      </div>
    </div>
  )
}

export default JoinCompany
