"use client"
import React, { useState, useEffect, ReactNode, cloneElement } from "react"
import { useRouter } from "next/navigation"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../Firebase"
import { useAuth } from "../contexts/AuthContext"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import { CompanyData } from "../types"
import LoadingSpinner from "./LoadingSpinner"

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
    const fetchCompanyData = async () => {
      if (user) {
        try {
          console.log("Fetching company data for user:", user.email)
          const q = query(
            collection(db, "companies"),
            where("members", "array-contains", {
              displayName: user.displayName,
              uid: user.uid,
              email: user.email,
            })
          )
          const querySnapshot = await getDocs(q)

          if (!querySnapshot.empty) {
            console.log("Company data found for user:", user.email)
            setCompanyData(querySnapshot.docs[0].data() as CompanyData)
          } else {
            console.log("No company data found, redirecting to /company-setup")
            router.push("/company-setup")
          }
        } catch (error) {
          console.error("Error fetching company data:", error)
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    if (!authLoading) {
      if (user) {
        fetchCompanyData()
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

  return (
    <div className="flex min-h-screen relative overflow-x-hidden">
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

      <div className="flex-1 flex flex-col overflow-x-hidden">
        <Navbar
          toggleSidebar={toggleSidebar}
          companyName={companyData?.companyName}
        />
        <main className="sm:p-6 bg-gray-50 flex-1">
          {cloneElement(children as React.ReactElement, {
            companyData,
            user,
            logout,
          })}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
