"use client"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore"
import { useAuth } from "../contexts/AuthContext"
import LoadingSpinner from "../components/LoadingSpinner"

const JoinCompany = () => {
  const [companyId, setCompanyId] = useState("")
  const [status, setStatus] = useState("")
  const [joinLoading, setJoinLoading] = useState(false)
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const firestore = getFirestore()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/")
    }
  }, [user, authLoading, router])

  const handleJoin = async () => {
    if (!companyId) {
      setStatus("Please enter a Company ID.")
      return
    }

    if (!user) {
      setStatus("You need to be logged in to join a company.")
      return
    }

    setJoinLoading(true)
    try {
      const companiesRef = collection(firestore, "companies")
      const q = query(companiesRef, where("companyID", "==", companyId))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        setStatus("Invalid Company ID. Please try again.")
        setJoinLoading(false)
        return
      }

      const companyDoc = querySnapshot.docs[0]
      const companyRef = doc(firestore, "companies", companyDoc.id)
      await updateDoc(companyRef, {
        members: arrayUnion({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "no displayName",
        }),
      })
      setStatus("You have successfully joined the company.")
      router.push("/dashboard")
    } catch (error) {
      console.error("Error joining company:", error)
      setStatus("An error occurred. Please try again.")
      setJoinLoading(false)
    }
  }

  if (authLoading || joinLoading) {
    return <LoadingSpinner />
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
        {status && (
          <p className="text-center text-sm text-gray-500 mt-4">{status}</p>
        )}
      </div>
    </div>
  )
}

export default JoinCompany
