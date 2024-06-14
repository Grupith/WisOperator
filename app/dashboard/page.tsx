"use client"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { CompanyData } from "../types"
import DashboardLayout from "../components/DashboardLayout"
import { useAuth } from "../contexts/AuthContext"

interface DashboardProps {
  companyData: CompanyData | null
  user: {
    email: string
    displayName?: string
    uid?: string
  } | null
  logout: () => void
}

const Dashboard: React.FC<DashboardProps> = ({ companyData, user }) => {
  const router = useRouter()
  const { loading: authLoading } = useAuth()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/")
    }
  }, [authLoading, user, router])

  if (authLoading || !user) {
    return null
  }

  return (
    <div className="flex flex-col justify-start min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-10">Main Dashboard</h1>
      {companyData ? (
        <div>
          <p className="text-lg mb-10 text-gray-600 max-w-md">
            Welcome to your company's dashboard.
          </p>
          <p className="my-4">Logged in as: {user?.email}</p>
          <p>Company ID: {companyData.companyID}</p>
          <p>Company Name: {companyData.companyName}</p>
          {/* Add more company details as needed */}
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
