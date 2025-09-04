import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { hashPassword, signToken } from '../../../../lib/auth'

export async function POST(request) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters long' }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password_hash: hashedPassword
      },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true
      }
    })

    // Generate JWT
    const token = signToken({ userId: user.id, email: user.email })

    return NextResponse.json({
      message: 'User registered successfully',
      token,
      user
    }, { status: 201 })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Internal server error during registration' }, { status: 500 })
  }
}
