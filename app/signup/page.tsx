"use client"
import Link from "next/link"
import React, { useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useRouter } from "next/navigation"

const Signup = () => {
  const { user, signInWithGoogle, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard")
    }
  }, [user, loading, router])

  return (
    <div>
      <div className="flex flex-col justify-center mt-12">
        <Link href="/" className="cursor-pointer">
          <h1 className="text-2xl font-bold text-center text-gray-800 pb-12">
            WisOperator
          </h1>
        </Link>
        <section className="flex justify-center">
          <button
            onClick={signInWithGoogle}
            className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 transition-all hover:shadow focus:outline-none hover:bg-gray-100"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google logo"
              className="w-6 h-6 mr-2"
            />
            <span className="text-gray-800 font-medium">
              Sign in with Google
            </span>
          </button>
        </section>
      </div>
    </div>
  )
}

export default Signup
