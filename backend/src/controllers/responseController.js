const { body, validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Validation rules
const responseValidation = [
  body('responses').isArray().withMessage('Responses must be an array'),
  body('responses.*.question_id').isInt({ min: 1 }).withMessage('Valid question ID required'),
  body('responses.*.year').matches(/^\d{4}-\d{2}$/).withMessage('Year must be in format YYYY-YY'),
  body('responses.*.value').exists().withMessage('Value is required')
];

// Save or update responses
const saveResponses = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }

    const { responses } = req.body;
    const userId = req.user.id;

    // Use transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      const savedResponses = [];

      for (const response of responses) {
        const { question_id, year, value } = response;

        // Verify question exists
        const question = await tx.question.findUnique({
          where: { id: question_id }
        });

        if (!question) {
          throw new Error(`Question with ID ${question_id} not found`);
        }

        // Upsert response (update if exists, create if not)
        const savedResponse = await tx.response.upsert({
          where: {
            user_id_question_id_year: {
              user_id: userId,
              question_id: question_id,
              year: year
            }
          },
          update: {
            value: String(value),
            updated_at: new Date()
          },
          create: {
            user_id: userId,
            question_id: question_id,
            year: year,
            value: String(value)
          },
          include: {
            question: {
              select: { title: true, category: true }
            }
          }
        });

        savedResponses.push(savedResponse);
      }

      return savedResponses;
    });

    res.json({
      message: 'Responses saved successfully',
      data: result
    });

  } catch (error) {
    console.error('Error saving responses:', error);
    res.status(500).json({ error: error.message || 'Failed to save responses' });
  }
};

// Get responses for a user
const getResponses = async (req, res) => {
  try {
    const userId = req.user.id;
    const { year } = req.query;

    const whereClause = { user_id: userId };
    if (year) {
      whereClause.year = year;
    }

    const responses = await prisma.response.findMany({
      where: whereClause,
      include: {
        question: {
          select: {
            id: true,
            title: true,
            category: true,
            type: true,
            unit: true
          }
        }
      },
      orderBy: [
        { question: { category: 'asc' } },
        { question: { order_num: 'asc' } }
      ]
    });

    res.json(responses);
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({ error: 'Failed to fetch responses' });
  }
};

// Get response statistics
const getResponseStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Total responses count
    const totalResponses = await prisma.response.count({
      where: { user_id: userId }
    });

    // Latest year with responses
    const latestResponse = await prisma.response.findFirst({
      where: { user_id: userId },
      orderBy: { year: 'desc' },
      select: { year: true }
    });

    // Total questions count
    const totalQuestions = await prisma.question.count();

    // Calculate completion rate for latest year
    let completionRate = 0;
    if (latestResponse) {
      const responsesInLatestYear = await prisma.response.count({
        where: { 
          user_id: userId,
          year: latestResponse.year
        }
      });
      completionRate = Math.round((responsesInLatestYear / totalQuestions) * 100);
    }

    res.json({
      totalResponses,
      latestYear: latestResponse?.year || null,
      completionRate
    });
  } catch (error) {
    console.error('Error fetching response stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
};

module.exports = {
  saveResponses,
  getResponses,
  getResponseStats,
  responseValidation
};
