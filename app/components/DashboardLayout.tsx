"use client"
import React, { useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../Firebase"
import { useAuth } from "../contexts/AuthContext"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import { CompanyData } from "../types"

interface DashboardLayoutProps {
  children: ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [companyData, setCompanyData] = useState<CompanyData | null>(null)
  const router = useRouter()
  const { user, loading, logout } = useAuth()

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (user) {
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
          setCompanyData(querySnapshot.docs[0].data() as CompanyData)
        } else {
          router.push("/company-setup") // Redirect to company setup if no company found
        }
      }
    }

    if (!loading) {
      if (user) {
        fetchCompanyData()
      } else {
        router.push("/") // Redirect to Signup page if no user is signed in
      }
    }
  }, [user, loading, router])

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div className="flex min-h-screen relative">
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

      <div className="flex-1 flex flex-col">
        <Navbar
          toggleSidebar={toggleSidebar}
          companyName={companyData?.companyName}
        />
        <main className="p-6 bg-gray-50 flex-1">
          {React.cloneElement(children as React.ReactElement, {
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
