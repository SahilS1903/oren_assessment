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

    const { searchParams } = new URL(request.url)
    const year = searchParams.get('year')
    
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

    return NextResponse.json(responses, { status: 200 })
  } catch (error) {
    console.error('Get responses error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request) {
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

    const { responses } = await request.json()

    if (!responses || !Array.isArray(responses)) {
      return NextResponse.json({ error: 'Responses array is required' }, { status: 400 })
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

    return NextResponse.json({
      message: 'Responses saved successfully',
      responses: savedResponses
    }, { status: 200 })
  } catch (error) {
    console.error('Save responses error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
