const express = require('express');
const { getLatestRadar } = require('../controllers/radarController');

const router = express.Router();

/**
 * @route GET /api/radar/latest
 * @desc Get the latest radar reflectivity data
 * @access Public
 */
router.get('/latest', getLatestRadar);

module.exports = router;
