"use client"
import React from "react"
import { useRouter } from "next/navigation"
import { CompanyData } from "../types"
import DashboardLayout from "../components/DashboardLayout"

interface User {
  email: string
  displayName?: string
  uid?: string
}

interface DashboardProps {
  companyData: CompanyData | null
  user: User | null
  logout: () => void
}

const Dashboard: React.FC<DashboardProps> = ({ companyData, user, logout }) => {
  const router = useRouter()

  if (!user) {
    router.push("/") // Redirect to Signup page if no user is signed in
    return null
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6">
      <h1 className="text-3xl font-semibold my-10">Company Dashboard</h1>
      {companyData ? (
        <div>
          <p className="text-center text-lg mb-10 text-gray-600 max-w-md">
            Welcome to your company's dashboard.
          </p>
          <p className="my-4">Logged in as: {user?.email}</p>
          <p>Company ID: {companyData.companyID}</p>
          <p>Company Name: {companyData.companyName}</p>
          {/* Add more company details as needed */}
          <button
            onClick={logout}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <p>No company data available.</p>
      )}
    </div>
  )
}

export default (props: DashboardProps) => (
  <DashboardLayout>
    <Dashboard {...props} />
  </DashboardLayout>
)
