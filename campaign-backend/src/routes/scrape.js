const express = require('express');
const router = express.Router();
const { testScrape } = require('../controllers/scrapeController');

// POST /scrape/test
router.post('/test', testScrape);

module.exports = router;
