import { useState, useEffect, useCallback } from 'react'

// Exact Railway backend URL
const API_BASE_URL = "https://weather-radar-display-production-435d.up.railway.app";

const useRadarData = () => {
  const [radarData, setRadarData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchRadarData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch from Railway backend
      const response = await fetch(`${API_BASE_URL}/api/radar/latest`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // Prepend backend URL to radar image path so it loads correctly
      if (data.imageUrl) {
        data.imageUrl = `${API_BASE_URL}${data.imageUrl}`
      }

      setRadarData(data)
    } catch (err) {
      console.error('Error fetching radar data:', err)
      setError(err.message || 'Failed to fetch radar data')
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial fetch on component mount
  useEffect(() => {
    fetchRadarData()
  }, [fetchRadarData])

  // Auto-refresh every 1 minute
  useEffect(() => {
    const interval = setInterval(() => {
      fetchRadarData()
    }, 60000)

    return () => clearInterval(interval)
  }, [fetchRadarData])

  return {
    radarData,
    loading,
    error,
    refetch: fetchRadarData
  }
}

export default useRadarData
