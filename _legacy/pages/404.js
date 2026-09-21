import Link from 'next/link'
import React from 'react'

export default function NotFound() {
return (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <div className="max-w-md text-center px-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
       Page Not Found
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        The page you are looking for might have been removed or does not exist.
      </p>
      <Link href="/">
          <p >Go back to <span className="text-blue-600 font-medium hover:underline">Homepage</span></p>
      </Link>
    </div>
  </div>
);
}
