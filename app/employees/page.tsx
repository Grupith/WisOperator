"use client"
import React, { useState } from "react"
import DashboardLayout from "../components/DashboardLayout"

const Employees = () => {
  const [employees, setEmployees] = useState([
    { name: "John Doe", email: "john.doe@example.com", role: "Manager" },
    { name: "Jane Smith", email: "jane.smith@example.com", role: "Developer" },
    { name: "Chris Kyle", email: "american.chris@gmail.com", role: "Owner" },
    // Add more employees as needed
  ])
  const [email, setEmail] = useState("")

  const handleInvite = () => {
    // Implement invite functionality here
    console.log("Invite sent to:", email)
    setEmail("") // Clear the email input after sending the invite
  }

  return (
    <DashboardLayout>
      <div className="p-6 overflow-x-hidden">
        <h1 className="text-2xl font-semibold mb-4">Current Employees</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-200 text-left text-gray-600 font-semibold uppercase tracking-wider">
                    Name
                  </th>
                  <th className="py-2 px-4 bg-gray-200 text-left text-gray-600 font-semibold uppercase tracking-wider">
                    Email
                  </th>
                  <th className="py-2 px-4 bg-gray-200 text-left text-gray-600 font-semibold uppercase tracking-wider">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{employee.name}</td>
                    <td className="py-2 px-4">{employee.email}</td>
                    <td className="py-2 px-4">{employee.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Invite New Employee</h2>
          <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-md font-medium text-gray-700"
              >
                Employee Email
              </label>
              <div className="mt-2 lg:w-1/2">
                <input
                  type="email"
                  id="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <button
                onClick={handleInvite}
                className="w-full lg:w-56 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition ease-in-out duration-150"
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Employees
