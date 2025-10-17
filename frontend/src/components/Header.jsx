import React from 'react'

const Header = ({ lastUpdated }) => {
  const formatLastUpdated = (timestamp) => {
    if (!timestamp) return 'Loading...'

    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    })
  }

  return (
    <header className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Weather Radar Display</h1>
            <p className="text-sm text-gray-300 mt-1">
              Live MRMS Reflectivity at Lowest Altitude (RALA) Data
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-300">Last Updated</p>
            <p className="text-lg font-semibold">
              {formatLastUpdated(lastUpdated)}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
