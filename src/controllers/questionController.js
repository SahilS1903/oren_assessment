const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get all questions
const getQuestions = async (req, res) => {
  try {
    const questions = await prisma.question.findMany({
      orderBy: [
        { category: 'asc' },
        { order_num: 'asc' }
      ]
    });

    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
};

// Get questions by category
const getQuestionsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    const questions = await prisma.question.findMany({
      where: { category },
      orderBy: { order_num: 'asc' }
    });

    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions by category:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
};

module.exports = {
  getQuestions,
  getQuestionsByCategory
};
