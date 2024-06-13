"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../Firebase"
import { useAuth } from "../contexts/AuthContext"
import { CompanyData } from "../types"

const Dashboard = () => {
  const router = useRouter()
  const { user, loading, logout } = useAuth()
  const [companyData, setCompanyData] = useState<CompanyData | null>(null)

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
        router.push("/") // Redirect to login if no user is signed in
      }
    }
  }, [user, loading, router])

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-semibold my-10">Company Dashboard</h1>
      {companyData ? (
        <div>
          <p className="text-center text-lg mb-10 text-gray-600 max-w-md">
            Welcome to your company's dashboard.
          </p>
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

export default Dashboard
