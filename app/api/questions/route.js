import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { verifyToken, getTokenFromRequest } from '../../../lib/auth'

export async function GET(request) {
  try {
    // Verify authentication
    const token = getTokenFromRequest(request)
    if (!token) {
      return NextResponse.json({ error: 'Access token required' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 })
    }

    // Get all questions
    const questions = await prisma.question.findMany({
      orderBy: { order_num: 'asc' }
    })

    return NextResponse.json(questions, { status: 200 })

  } catch (error) {
    console.error('Questions error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
