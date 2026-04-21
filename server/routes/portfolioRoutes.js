const express = require('express');
const router = express.Router();
const {
  getPortfolioByUsername,
  createOrUpdatePortfolio,
  getMyPortfolio
} = require('../controllers/portfolioController');
const auth = require('../middleware/auth');

// Public route
router.get('/:username', getPortfolioByUsername);

// Protected routes
router.post('/', auth, createOrUpdatePortfolio);
router.get('/settings/me', auth, getMyPortfolio);

module.exports = router;
