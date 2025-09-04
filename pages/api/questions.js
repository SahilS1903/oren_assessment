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

    // Get all questions
    const questions = await prisma.question.findMany({
      orderBy: { order_num: 'asc' }
    })

    res.status(200).json(questions)

  } catch (error) {
    console.error('Questions error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
