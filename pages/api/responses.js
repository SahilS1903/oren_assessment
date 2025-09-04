import { prisma } from '../../lib/prisma'
import { verifyToken, getTokenFromRequest } from '../../lib/auth'

export default async function handler(req, res) {
  // Verify authentication
  const token = getTokenFromRequest(req)
  if (!token) {
    return res.status(401).json({ error: 'Access token required' })
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }

  if (req.method === 'GET') {
    try {
      const { year } = req.query
      
      const whereClause = { user_id: decoded.userId }
      if (year) {
        whereClause.year = year.toString()
      }

      const responses = await prisma.response.findMany({
        where: whereClause,
        include: {
          question: true
        },
        orderBy: { created_at: 'desc' }
      })

      res.status(200).json(responses)
    } catch (error) {
      console.error('Get responses error:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  } else if (req.method === 'POST') {
    try {
      const { responses } = req.body

      if (!responses || !Array.isArray(responses)) {
        return res.status(400).json({ error: 'Responses array is required' })
      }

      // Process each response
      const savedResponses = []
      for (const response of responses) {
        const { question_id, year, value } = response

        if (!question_id || !year || value === undefined) {
          continue // Skip invalid responses
        }

        // Upsert response
        const savedResponse = await prisma.response.upsert({
          where: {
            user_id_question_id_year: {
              user_id: decoded.userId,
              question_id: parseInt(question_id),
              year: year.toString()
            }
          },
          update: {
            value: value.toString(),
            updated_at: new Date()
          },
          create: {
            user_id: decoded.userId,
            question_id: parseInt(question_id),
            year: year.toString(),
            value: value.toString()
          },
          include: {
            question: true
          }
        })

        savedResponses.push(savedResponse)
      }

      res.status(200).json({
        message: 'Responses saved successfully',
        responses: savedResponses
      })
    } catch (error) {
      console.error('Save responses error:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
