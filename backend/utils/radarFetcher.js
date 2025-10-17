const fs = require('fs');
const path = require('path');
const os = require('os');
const axios = require('axios');

// NOAA ArcGIS radar reflectivity service URL
const NOAA_RADAR_URL = 'https://mapservices.weather.noaa.gov/eventdriven/rest/services/radar/radar_base_reflectivity_time/ImageServer/exportImage?f=image&bbox=-130,20,-60,55&bboxSR=4326&imageSR=4326&size=1600,900&format=png&transparent=true';

// Directory to store radar images temporarily
const RADAR_DIR = path.join(os.tmpdir(), 'radar-images');

// Ensure radar directory exists
if (!fs.existsSync(RADAR_DIR)) {
  fs.mkdirSync(RADAR_DIR, { recursive: true });
}

/**
 * Fetches the latest radar image from NOAA and saves it locally
 */
async function fetchLatestRadar() {
  try {
    console.log('Fetching latest radar image from NOAA...');

    const response = await axios.get(NOAA_RADAR_URL, {
      responseType: 'arraybuffer',
      timeout: 10000 // 10 second timeout
    });

    if (response.status !== 200) {
      throw new Error(`NOAA API returned status ${response.status}`);
    }

    // Generate filename with timestamp
    const timestamp = new Date().toISOString();
    const filename = `radar_${Date.now()}.png`;
    const filepath = path.join(RADAR_DIR, filename);

    // Save the image
    fs.writeFileSync(filepath, response.data);

    console.log(`Radar image saved: ${filename}`);

    // Clean up old images
    cleanupOldImages();

    return {
      timestamp,
      imageUrl: `/radar-images/${filename}`
    };
  } catch (error) {
    console.error('Error fetching radar image:', error.message);
    // Return a fallback or cached image if available
    const cachedImage = getLatestCachedImage();
    if (cachedImage) {
      return cachedImage;
    }
    throw error;
  }
}

/**
 * Cleans up old radar images, keeping only the most recent 5
 */
function cleanupOldImages() {
  try {
    const files = fs.readdirSync(RADAR_DIR)
      .filter(file => file.startsWith('radar_') && file.endsWith('.png'))
      .map(file => ({
        name: file,
        path: path.join(RADAR_DIR, file),
        mtime: fs.statSync(path.join(RADAR_DIR, file)).mtime
      }))
      .sort((a, b) => b.mtime - a.mtime);

    // Keep only the 5 most recent files
    if (files.length > 5) {
      const filesToDelete = files.slice(5);
      filesToDelete.forEach(file => {
        fs.unlinkSync(file.path);
        console.log(`Cleaned up old radar image: ${file.name}`);
      });
    }
  } catch (error) {
    console.error('Error cleaning up old images:', error);
  }
}

/**
 * Gets the latest cached radar image if available
 */
function getLatestCachedImage() {
  try {
    const files = fs.readdirSync(RADAR_DIR)
      .filter(file => file.startsWith('radar_') && file.endsWith('.png'))
      .map(file => ({
        name: file,
        path: path.join(RADAR_DIR, file),
        mtime: fs.statSync(path.join(RADAR_DIR, file)).mtime
      }))
      .sort((a, b) => b.mtime - a.mtime);

    if (files.length > 0) {
      const latestFile = files[0];
      return {
        timestamp: new Date(latestFile.mtime).toISOString(),
        imageUrl: `/radar-images/${latestFile.name}`
      };
    }
  } catch (error) {
    console.error('Error getting latest cached image:', error);
  }
  return null;
}

module.exports = {
  fetchLatestRadar,
  getLatestCachedImage
};
