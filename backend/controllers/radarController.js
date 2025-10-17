const { fetchLatestRadar } = require('../utils/radarFetcher');

/**
 * Controller for radar-related endpoints
 */

/**
 * GET /api/radar/latest
 * Returns the latest radar data
 */
const getLatestRadar = async (req, res) => {
  try {
    const radarInfo = await fetchLatestRadar();

    if (!radarInfo) {
      return res.status(503).json({
        error: 'Radar data not available',
        message: 'No radar data has been fetched yet. Please try again later.'
      });
    }

    // Return radar data in the specified format
    res.json({
      timestamp: radarInfo.timestamp,
      imageUrl: radarInfo.imageUrl
    });

  } catch (error) {
    console.error('Error in getLatestRadar controller:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve radar data'
    });
  }
};

module.exports = {
  getLatestRadar
};
