const express = require('express');
const { getQuestions, getQuestionsByCategory } = require('../controllers/questionController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Apply authentication to all question routes
router.use(authenticateToken);

// GET /api/questions
router.get('/', getQuestions);

// GET /api/questions/category/:category
router.get('/category/:category', getQuestionsByCategory);

module.exports = router;
