const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const cron = require('node-cron');
const radarRoutes = require('./routes/radar');
const { fetchLatestRadar } = require('./utils/radarFetcher');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from /tmp directory for radar images
app.use('/radar-images', express.static(path.join(require('os').tmpdir(), 'radar-images')));

// Routes
app.use('/api', radarRoutes);

// Add direct route for /api/radar/latest
app.get('/api/radar/latest', async (req, res) => {
  try {
    const radarInfo = await fetchLatestRadar();
    res.json(radarInfo);
  } catch (error) {
    console.error('Error in /api/radar/latest:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve radar data'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Schedule radar data fetching every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  console.log('Fetching latest radar data...');
  try {
    await fetchLatestRadar();
    console.log('Radar data updated successfully');
  } catch (error) {
    console.error('Error fetching radar data:', error);
  }
});

// Initial fetch on startup
fetchLatestRadar().then(() => {
  console.log('Initial radar data fetch completed');
}).catch(error => {
  console.error('Error during initial radar fetch:', error);
});

app.listen(PORT, () => {
  console.log(`Weather Radar Backend server running on port ${PORT}`);
});
