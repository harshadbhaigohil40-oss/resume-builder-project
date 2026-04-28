const express = require('express');
const { analyzeResume } = require('../controllers/aiController');
const auth = require('../middleware/auth');

const router = express.Router();

// All AI routes are protected
router.use(auth);

router.post('/analyze', analyzeResume);

module.exports = router;
