import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../contexts/AuthContext'
import Layout from '../components/Layout'
import axios from 'axios'

const Questionnaire = () => {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [questions, setQuestions] = useState([])
  const [responses, setResponses] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
      return
    }

    if (user) {
      fetchQuestions()
    }
  }, [user, authLoading, currentYear])

  const fetchQuestions = async () => {
    try {
      setLoading(true)
      const [questionsRes, responsesRes] = await Promise.all([
        axios.get('/api/questions'),
        axios.get(`/api/responses?year=${currentYear}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
      ])

      setQuestions(questionsRes.data)
      
      // Convert responses array to object for easier access
      const responseMap = {}
      responsesRes.data.forEach(response => {
        responseMap[response.question_id] = response.value
      })
      setResponses(responseMap)
    } catch (err) {
      setError('Failed to load questionnaire')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleResponseChange = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const responsesToSubmit = Object.entries(responses).map(([questionId, value]) => ({
        question_id: parseInt(questionId),
        value: parseFloat(value) || 0,
        year: currentYear
      }))

      await axios.post('/api/responses', 
        { responses: responsesToSubmit },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
      )

      setSuccess('Responses saved successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save responses')
    } finally {
      setSubmitting(false)
    }
  }

  // Safety check: ensure questions is an array before using reduce
  const groupedQuestions = Array.isArray(questions) ? questions.reduce((acc, question) => {
    if (!acc[question.category]) {
      acc[question.category] = []
    }
    acc[question.category].push(question)
    return acc
  }, {}) : {}

  if (authLoading || loading) {
    return (
      <Layout title="Questionnaire - ESG Platform">
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading questionnaire...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Questionnaire - ESG Platform">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">ESG Questionnaire</h1>
          <p className="mt-2 text-gray-600">
            Provide your organization's metrics for comprehensive ESG reporting
          </p>
          
          {/* Year Selector */}
          <div className="mt-4">
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
              Reporting Year
            </label>
            <select
              id="year"
              value={currentYear}
              onChange={(e) => setCurrentYear(parseInt(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              {Array.from({ length: 5 }, (_, i) => {
                const year = new Date().getFullYear() - i
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                )
              })}
            </select>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {Object.entries(groupedQuestions).map(([category, categoryQuestions]) => (
            <div key={category} className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {category} Metrics
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categoryQuestions
                  .sort((a, b) => a.order_num - b.order_num)
                  .map((question) => (
                    <div key={question.id} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {question.title}
                        {question.unit && (
                          <span className="text-gray-500 ml-1">({question.unit})</span>
                        )}
                      </label>
                      
                      {question.type === 'number' || question.type === 'percentage' ? (
                        <input
                          type="number"
                          step={question.type === 'percentage' ? '0.01' : '0.001'}
                          min="0"
                          max={question.type === 'percentage' ? '100' : undefined}
                          value={responses[question.id] || ''}
                          onChange={(e) => handleResponseChange(question.id, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          placeholder={`Enter ${question.title.toLowerCase()}`}
                        />
                      ) : (
                        <textarea
                          value={responses[question.id] || ''}
                          onChange={(e) => handleResponseChange(question.id, e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          placeholder={`Enter ${question.title.toLowerCase()}`}
                        />
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
            >
              {submitting ? 'Saving...' : 'Save Responses'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Questionnaire
