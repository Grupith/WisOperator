"use client"
import React, { useState, useEffect, ReactNode, cloneElement } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../contexts/AuthContext"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import LoadingSpinner from "./LoadingSpinner"
import { fetchUserData, fetchCompanyData } from "../Firestore"
import { CompanyData } from "../types"

interface DashboardLayoutProps {
  children: ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [companyData, setCompanyData] = useState<CompanyData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { user, loading: authLoading, logout } = useAuth()

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  useEffect(() => {
    const initializeData = async () => {
      if (user) {
        try {
          console.log("Fetching company data for user:", user.email)

          const userData = await fetchUserData(user.uid)
          console.log("Fetched user data:", userData) // Log the user data

          if (userData && userData.companyID) {
            console.log("User has companyID:", userData.companyID)

            // Fetch company data using document ID
            const companyData = await fetchCompanyData(userData.companyID)
            console.log("Fetched company data:", companyData) // Log the company data

            setCompanyData(companyData as CompanyData)
          } else {
            console.log(
              "No companyID found in user document, redirecting to /company-setup"
            )
            router.push("/company-setup")
          }
        } catch (error) {
          console.error("Error fetching data:", error)
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    if (!authLoading) {
      if (user) {
        initializeData()
      } else {
        console.log("User not authenticated, redirecting to /")
        router.push("/")
      }
    }
  }, [user, authLoading, router])

  if (authLoading || loading) {
    return <LoadingSpinner />
  }

  if (!companyData) {
    console.log("No company data available, rendering null")
    return null // Or render a fallback UI if necessary
  }

  console.log("companyID from dashboardLayout", companyData.id)

  return (
    <div className="flex min-h-screen relative overflow-hidden">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative lg:w-64 transition-transform duration-300 ease-in-out z-50`}
      >
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          toggleSidebar={toggleSidebar}
          companyName={companyData?.companyName}
        />
        <main className="sm:p-6 bg-gray-50 flex-1 overflow-y-auto">
          {cloneElement(children as React.ReactElement, {
            companyData,
            user,
            logout,
            companyID: companyData.id,
          })}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
