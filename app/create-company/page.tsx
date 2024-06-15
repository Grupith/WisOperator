"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { addCompanyToFirestore } from "../Firestore"
import { getAuth } from "firebase/auth"
import { db } from "../Firebase"
import { doc, updateDoc } from "firebase/firestore"

const CreateCompany = () => {
  const [companyName, setCompanyName] = useState("")
  const [companyDescription, setCompanyDescription] = useState("")
  const [companyLogo, setCompanyLogo] = useState<File | null>(null)
  const [industryType, setIndustryType] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [websiteURL, setWebsiteURL] = useState("")
  const [location, setLocation] = useState("")
  const router = useRouter()

  const handleCreate = async () => {
    const auth = getAuth()
    const user = auth.currentUser

    if (!user) {
      console.error("No user is signed in.")
      return
    }

    const companyData = {
      companyName,
      companyDescription,
      companyLogo,
      industryType,
      contactEmail,
      contactPhone,
      websiteURL,
      location,
      members: [
        {
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
          role: "Owner",
        },
      ],
    }

    try {
      // Add the company data to Firestore and get the document ID
      const companyID = await addCompanyToFirestore(companyData)
      console.log("Company created with ID:", companyID)

      // Update the user's document with the companyID
      const userRef = doc(db, "users", user.uid)
      await updateDoc(userRef, {
        companyID,
      })
      console.log("Updated the user's companyID in Firestore")

      // Redirect to the dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Error creating company:", error)
    }
  }

  const industries = [
    "Construction",
    "Electrical",
    "Plumbing",
    "Landscaping",
    "HVAC",
    "Cleaning Services",
    "Handyman",
    "Painting",
    "Carpentry",
    "Automotive",
    "IT Services",
    "Consulting",
    "Retail",
    "Food and Beverage",
    "Health and Wellness",
    "Real Estate",
    "Other",
  ]

  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ]

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-semibold my-10">Create a New Company</h1>
      <p className="text-center text-lg mb-10 text-gray-600 max-w-md">
        Enter the details of your new company to get started.
      </p>
      <div className="w-full max-w-sm space-y-4">
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Company Name"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
        <textarea
          value={companyDescription}
          onChange={(e) => setCompanyDescription(e.target.value)}
          placeholder="Company Description"
          className="w-full px-4 py-3 border border-gray-300 resize-none rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          rows={4}
        />
        <select
          value={industryType}
          onChange={(e) => setIndustryType(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 cursor-pointer rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          <option value="" disabled>
            Select Industry Type
          </option>
          {industries.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          <option value="" disabled>
            Select State
          </option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <input
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          placeholder="Contact Email"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
        <input
          type="tel"
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
          placeholder="Contact Phone"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
        <input
          type="url"
          value={websiteURL}
          onChange={(e) => setWebsiteURL(e.target.value)}
          placeholder="Website URL"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />

        <h2 className="text-lg text-gray-800 font-medium mt-4">Company Logo</h2>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              setCompanyLogo(e.target.files[0])
            }
          }}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
        <button
          onClick={handleCreate}
          className="w-full py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors"
        >
          Create Company
        </button>
      </div>
    </div>
  )
}

export default CreateCompany
