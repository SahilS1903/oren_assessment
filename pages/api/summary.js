import { prisma } from '../../lib/prisma'
import { verifyToken, getTokenFromRequest } from '../../lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Verify authentication
    const token = getTokenFromRequest(req)
    if (!token) {
      return res.status(401).json({ error: 'Access token required' })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid or expired token' })
    }

    // Get all responses for the user
    const responses = await prisma.response.findMany({
      where: { user_id: decoded.userId },
      include: {
        question: true
      }
    })

    // Get all questions for reference
    const questions = await prisma.question.findMany({
      orderBy: { order_num: 'asc' }
    })

    // Get unique years from responses data dynamically
    const uniqueYears = [...new Set(responses.map(r => r.year))].sort()
    const categories = ['Environmental', 'Social', 'Governance']
    
    const summary = {
      totalQuestions: questions.length,
      totalResponses: responses.length,
      completionRate: uniqueYears.length > 0 ? Math.round((responses.length / (questions.length * uniqueYears.length)) * 100) : 0,
      yearly_data: [],
      categoryBreakdown: {},
      trendAnalysis: []
    }

    // Calculate yearly data with categories and metrics
    uniqueYears.forEach(year => {
      const yearResponses = responses.filter(r => r.year === year)
      
      const yearData = {
        year,
        categories: categories.map(category => {
          const categoryQuestions = questions.filter(q => q.category === category)
          const categoryResponses = yearResponses.filter(r => 
            categoryQuestions.some(q => q.id === r.question_id)
          )
          
          const metrics = categoryResponses.map(response => {
            const question = questions.find(q => q.id === response.question_id)
            return {
              title: question.title,
              value: parseFloat(response.value || 0),
              unit: question.unit || ''
            }
          })
          
          return {
            category,
            metrics
          }
        })
      }
      
      summary.yearly_data.push(yearData)
    })

    // Calculate category breakdown
    categories.forEach(category => {
      const categoryQuestions = questions.filter(q => q.category === category)
      const categoryResponses = responses.filter(r => 
        categoryQuestions.some(q => q.id === r.question_id)
      )
      
      summary.categoryBreakdown[category] = {
        questions: categoryQuestions.length,
        responses: categoryResponses.length,
        completionRate: categoryQuestions.length > 0 && uniqueYears.length > 0
          ? Math.round((categoryResponses.length / (categoryQuestions.length * uniqueYears.length)) * 100)
          : 0
      }
    })

    // Calculate trend analysis (year-over-year change)
    for (let i = 1; i < summary.yearly_data.length; i++) {
      const current = summary.yearly_data[i]
      const previous = summary.yearly_data[i - 1]
      
      // Calculate total values for comparison
      const currentTotal = current.categories.reduce((sum, cat) => 
        sum + cat.metrics.reduce((catSum, metric) => catSum + metric.value, 0), 0)
      const previousTotal = previous.categories.reduce((sum, cat) => 
        sum + cat.metrics.reduce((catSum, metric) => catSum + metric.value, 0), 0)
      
      const change = currentTotal - previousTotal
      const changePercentage = previousTotal > 0 ? ((change / previousTotal) * 100) : 0

      summary.trendAnalysis.push({
        from: previous.year,
        to: current.year,
        change,
        changePercentage: Math.round(changePercentage * 100) / 100
      })
    }

    res.status(200).json({ summary, responses, questions })

  } catch (error) {
    console.error('Summary error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
