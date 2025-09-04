'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../contexts/AuthContext'
import Layout from '../../components/Layout'
import DashboardStats from '../../components/DashboardStats'
import YearlyTrends from '../../components/YearlyTrends'

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth()
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
      return
    }
    
    if (user) {
      fetchSummary()
    }
  }, [user, authLoading, router])

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
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <Layout title="Dashboard - ESG Platform">
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
      <Layout title="Dashboard - ESG Platform">
        <div className="flex justify-center items-center min-h-64">
          <div className="text-lg">Loading dashboard...</div>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout title="Dashboard - ESG Platform">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </Layout>
    )
  }

  if (!summary) {
    return (
      <Layout title="Dashboard - ESG Platform">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Data Available</h2>
          <p className="text-gray-600 mb-6">Start by completing the ESG questionnaire to see your dashboard.</p>
          <a href="/questionnaire" className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md">
            Take Questionnaire
          </a>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Dashboard - ESG Platform">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">ESG Dashboard</h1>
        </div>

        <DashboardStats summary={summary} />
        
        {summary.yearly_data && summary.yearly_data.length > 0 && (
          <YearlyTrends data={summary.yearly_data} />
        )}
      </div>
    </Layout>
  )
}

export default Dashboard
