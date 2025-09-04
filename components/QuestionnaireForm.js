'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const QuestionnaireForm = ({ questions, onComplete }) => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear().toString())
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm()

  // Load existing responses for the current year
  useEffect(() => {
    loadExistingResponses()
  }, [currentYear])

  const loadExistingResponses = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/responses?year=${currentYear}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        // Populate form with existing responses
        data.forEach(response => {
          setValue(`question_${response.question_id}`, response.value)
        })
      }
    } catch (error) {
      console.error('Error loading responses:', error)
    }
  }

  const onSubmit = async (data) => {
    setLoading(true)
    
    try {
      const responses = Object.keys(data).map(key => {
        const questionId = key.replace('question_', '')
        return {
          question_id: parseInt(questionId),
          year: currentYear,
          value: data[key]
        }
      }).filter(response => response.value !== '' && response.value !== undefined)

      const token = localStorage.getItem('token')
      const response = await fetch('/api/responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ responses })
      })

      if (!response.ok) {
        throw new Error('Failed to save responses')
      }

      toast.success('Responses saved successfully!')
      if (onComplete) {
        onComplete()
      }
    } catch (error) {
      toast.error(error.message || 'Failed to save responses')
    } finally {
      setLoading(false)
    }
  }

  if (!questions || questions.length === 0) {
    return <div className="text-center py-8">No questions available</div>
  }

  // Group questions by category
  const questionsByCategory = questions.reduce((acc, question) => {
    if (!acc[question.category]) {
      acc[question.category] = []
    }
    acc[question.category].push(question)
    return acc
  }, {})

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
          Select Year
        </label>
        <select
          id="year"
          value={currentYear}
          onChange={(e) => setCurrentYear(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {Array.from({ length: 5 }, (_, i) => {
            const year = new Date().getFullYear() - i
            return (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            )
          })}
        </select>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {Object.entries(questionsByCategory).map(([category, categoryQuestions]) => (
          <div key={category} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">{category}</h3>
            
            <div className="space-y-6">
              {categoryQuestions.map((question) => (
                <div key={question.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <label 
                    htmlFor={`question_${question.id}`}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {question.title}
                    {question.description && (
                      <span className="block text-xs text-gray-500 mt-1">
                        {question.description}
                      </span>
                    )}
                  </label>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      id={`question_${question.id}`}
                      type="number"
                      step="any"
                      {...register(`question_${question.id}`, {
                        required: false,
                        valueAsNumber: false
                      })}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 flex-1"
                      placeholder="Enter value"
                    />
                    {question.unit && (
                      <span className="text-sm text-gray-500 whitespace-nowrap">
                        {question.unit}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white px-6 py-2 rounded-md font-medium"
          >
            {loading ? 'Saving...' : 'Save Responses'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default QuestionnaireForm
