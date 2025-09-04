'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Layout from '../../components/Layout'
import SummaryReport from '../../components/SummaryReport'

const Summary = () => {
  const { user, loading: authLoading } = useAuth()
  const [summary, setSummary] = useState(null)
  const [responses, setResponses] = useState([])
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      fetchSummary()
    }
  }, [user])

  const fetchSummary = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/summary', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch summary')
      }

      const data = await response.json()
      setSummary(data.summary)
      setResponses(data.responses)
      setQuestions(data.questions)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || loading) {
    return (
      <Layout title="Summary - ESG Platform">
        <div className="flex justify-center items-center min-h-64">
          <div className="text-lg">Loading summary...</div>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout title="Summary - ESG Platform">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </Layout>
    )
  }

  if (!summary || !summary.yearly_data || summary.yearly_data.length === 0) {
    return (
      <Layout title="Summary - ESG Platform">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Data Available</h2>
          <p className="text-gray-600 mb-6">Complete the ESG questionnaire to generate your summary report.</p>
          <a href="/questionnaire" className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md">
            Take Questionnaire
          </a>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Summary - ESG Platform">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ESG Summary Report</h1>
          <p className="text-gray-600">
            Comprehensive overview of your Environmental, Social, and Governance performance.
          </p>
        </div>

        <SummaryReport 
          summary={summary}
          responses={responses}
          questions={questions}
        />
      </div>
    </Layout>
  )
}

export default Summary
