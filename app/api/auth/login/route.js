import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { comparePasswords, signToken } from '../../../../lib/auth'

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    // Verify password
    const isPasswordValid = await comparePasswords(password, user.password_hash)

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    // Generate JWT
    const token = signToken({ userId: user.id, email: user.email })

    return NextResponse.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }, { status: 200 })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error during login' }, { status: 500 })
  }
}
