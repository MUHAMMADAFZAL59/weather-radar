import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, ImageOverlay } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import useRadarData from '../hooks/useRadarData'
import Loader from './Loader'

// North America bounds for the radar overlay
const NORTH_AMERICA_BOUNDS = [
  [20, -130], // Southwest corner
  [55, -60]   // Northeast corner
]

// Center of North America
const NORTH_AMERICA_CENTER = [39.8283, -98.5795]

const MapView = () => {
  const { radarData, loading, error } = useRadarData()
  const [map, setMap] = useState(null)

  useEffect(() => {
    if (map && radarData?.imageUrl) {
      map.invalidateSize()
    }
  }, [radarData, map])

  if (loading && !radarData) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  if (error && !radarData) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-2">Error loading radar data</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 relative">
      {loading && (
        <div className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-lg p-3">
          <Loader />
        </div>
      )}

      <MapContainer
        center={NORTH_AMERICA_CENTER}
        zoom={4}
        style={{ height: 'calc(100vh - 80px)', width: '100%' }}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {radarData?.imageUrl && (
          <ImageOverlay
            url={`${radarData.imageUrl}?t=${Date.now()}`}
            bounds={NORTH_AMERICA_BOUNDS}
            opacity={0.7}
            key={radarData.timestamp}
          />
        )}
      </MapContainer>

      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 z-10">
        <h4 className="font-semibold text-sm mb-2">Radar Reflectivity (dBZ)</h4>
        <div className="flex items-center space-x-1 text-xs">
          <div className="w-4 h-4 bg-green-200"></div>
          <span>Light</span>
          <div className="w-4 h-4 bg-yellow-200"></div>
          <span>Moderate</span>
          <div className="w-4 h-4 bg-orange-400"></div>
          <span>Heavy</span>
          <div className="w-4 h-4 bg-red-500"></div>
          <span>Severe</span>
        </div>
      </div>
    </div>
  )
}

export default MapView
