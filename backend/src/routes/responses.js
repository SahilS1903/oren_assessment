const express = require('express');
const { saveResponses, getResponses, getResponseStats, responseValidation } = require('../controllers/responseController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Apply authentication to all response routes
router.use(authenticateToken);

// POST /api/responses
router.post('/', responseValidation, saveResponses);

// GET /api/responses
router.get('/', getResponses);

// GET /api/responses/stats
router.get('/stats', getResponseStats);

module.exports = router;
