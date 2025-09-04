'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../contexts/AuthContext'
import Layout from '../../components/Layout'
import QuestionnaireForm from '../../components/QuestionnaireForm'

const Questionnaire = () => {
  const { user, loading: authLoading } = useAuth()
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
      return
    }
    
    if (user) {
      fetchQuestions()
    }
  }, [user, authLoading, router])

  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/questions', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch questions')
      }

      const data = await response.json()
      setQuestions(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <Layout title="Questionnaire - ESG Platform">
        <div className="flex justify-center items-center min-h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </Layout>
    )
  }

  // Redirect if not authenticated
  if (!user) {
    return null
  }

  if (loading) {
    return (
      <Layout title="Questionnaire - ESG Platform">
        <div className="flex justify-center items-center min-h-64">
          <div className="text-lg">Loading questionnaire...</div>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout title="Questionnaire - ESG Platform">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Questionnaire - ESG Platform">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ESG Questionnaire</h1>
          <p className="text-gray-600">
            Complete the questionnaire to assess your organization's Environmental, Social, and Governance performance.
          </p>
        </div>

        <QuestionnaireForm 
          questions={questions}
          onComplete={() => router.push('/dashboard')}
        />
      </div>
    </Layout>
  )
}

export default Questionnaire
