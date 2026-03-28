import React from 'react'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl rounded-2xl bg-white p-8 shadow-sm border border-gray-100 text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Full Stack Web Development Assignment
        </h1>
        <p className="text-gray-700 text-base leading-7">
          This task has been assigned to me by the company as part of the
          Full Stack Web Development assignment. The project includes a login
          system, dashboard page, backend API integration, and MongoDB-based
          authentication.
        </p>
      </div>
    </div>
  )
}

export default Home