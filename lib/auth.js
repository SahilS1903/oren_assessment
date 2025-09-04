import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const signToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })
}

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    return null
  }
}

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12)
}

export const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}

export const getTokenFromRequest = (req) => {
  // Handle both Pages Router (req.headers) and App Router (req.headers.get())
  let authHeader
  if (req.headers && typeof req.headers.get === 'function') {
    // App Router format
    authHeader = req.headers.get('authorization')
  } else {
    // Pages Router format
    authHeader = req.headers?.authorization
  }
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }
  return null
}
