const express = require('express');
const { getSummary, getSummaryByYear } = require('../controllers/summaryController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Apply authentication to all summary routes
router.use(authenticateToken);

// GET /api/summary
router.get('/', getSummary);

// GET /api/summary/:year
router.get('/:year', getSummaryByYear);

module.exports = router;
