import React from 'react'

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      <span className="ml-2 text-gray-700">Loading radar data...</span>
    </div>
  )
}

export default Loader
