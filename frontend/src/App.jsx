import React from 'react'
import Header from './components/Header'
import MapView from './components/MapView'
import useRadarData from './hooks/useRadarData'

function App() {
  const { radarData } = useRadarData()

  return (
    <div className="min-h-screen bg-gray-100">
      <Header lastUpdated={radarData?.timestamp} />
      <MapView />
    </div>
  )
}

export default App
