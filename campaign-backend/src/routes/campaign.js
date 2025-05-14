const express = require('express');
const router = express.Router();
const { generateCampaigns } = require('../controllers/campaignController');

// POST /campaigns/generate
router.post('/generate', generateCampaigns);

module.exports = router;
