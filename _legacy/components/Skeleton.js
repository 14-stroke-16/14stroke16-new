import React from 'react'

export default function Skeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full p-4 bg-ivoryWhite shadow-md rounded-md">
        <div className="h-8 w-3/4 mb-4 bg-gray-300 animate-pulse rounded-md"></div>
        <div className="h-4 w-full mb-4 bg-gray-300 animate-pulse rounded-md"></div>
        <div className="h-4 w-full mb-4 bg-gray-300 animate-pulse rounded-md"></div>
        <div className="h-4 w-full mb-4 bg-gray-300 animate-pulse rounded-md"></div>
        <div className="h-4 w-full mb-4 bg-gray-300 animate-pulse rounded-md"></div>
        <div className="h-10 w-1/4 bg-gray-300 animate-pulse rounded-md"></div>
      </div>
    </div>
  );}
