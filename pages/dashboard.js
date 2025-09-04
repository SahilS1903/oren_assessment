import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../contexts/AuthContext'
import Layout from '../components/Layout'
import Link from 'next/link'
import axios from 'axios'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts'

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
      return
    }

    if (user) {
      fetchSummary()
    }
  }, [user, authLoading])

  const fetchSummary = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/summary', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      console.log('Dashboard API response:', response.data)
      setSummary(response.data.summary)
    } catch (err) {
      setError('Failed to load dashboard data')
      console.error('Dashboard error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || loading) {
    return (
      <Layout title="Dashboard - ESG Platform">
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout title="Dashboard - ESG Platform">
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
          <Link href="/questionnaire" className="mt-4 inline-block bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700">
            Take Questionnaire
          </Link>
        </div>
      </Layout>
    )
  }

  if (!summary || !summary.yearly_data || summary.yearly_data.length === 0) {
    return (
      <Layout title="Dashboard - ESG Platform">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Data Available</h2>
          <p className="text-gray-600 mb-6">
            You haven't completed any questionnaires yet. Start by filling out your ESG metrics.
          </p>
          <Link href="/questionnaire" className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700">
            Take Questionnaire
          </Link>
        </div>
      </Layout>
    )
  }

  // Prepare chart data
  const yearlyData = summary.yearly_data.map(yearData => ({
    year: yearData.year,
    ...yearData.categories.reduce((acc, cat) => {
      cat.metrics.forEach(metric => {
        acc[metric.title.replace(/\s+/g, '_')] = metric.value
      })
      return acc
    }, {})
  }))

  // Category distribution for current year
  const currentYearData = summary.yearly_data[summary.yearly_data.length - 1]
  const categoryData = currentYearData?.categories.map(cat => ({
    name: cat.category,
    value: cat.metrics.length,
    metrics: cat.metrics.length
  })) || []

  const COLORS = {
    Environmental: '#10B981',
    Social: '#3B82F6', 
    Governance: '#8B5CF6'
  }

  return (
    <Layout title="Dashboard - ESG Platform">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ESG Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Overview of your Environmental, Social, and Governance metrics
            </p>
          </div>
          <div className="space-x-3">
            <Link href="/questionnaire" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
              Update Data
            </Link>
            <Link href="/summary" className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
              View Reports
            </Link>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {summary.yearly_data[summary.yearly_data.length - 1]?.categories.map(category => (
            <div key={category.category} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {category.category} Metrics
              </h3>
              <div className="space-y-3">
                {category.metrics.slice(0, 2).map(metric => (
                  <div key={metric.title} className="flex justify-between">
                    <span className="text-sm text-gray-600">{metric.title}</span>
                    <span className="font-medium">
                      {metric.value} {metric.unit}
                    </span>
                  </div>
                ))}
                {category.metrics.length > 2 && (
                  <div className="text-sm text-gray-500">
                    +{category.metrics.length - 2} more metrics
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Yearly Trends */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Key Metrics Trends
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={yearlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Total_Energy_Consumption_(MWh)" stroke="#10B981" name="Energy (MWh)" />
                <Line type="monotone" dataKey="Total_GHG_Emissions_(tCO2e)" stroke="#EF4444" name="Emissions (tCO2e)" />
                <Line type="monotone" dataKey="Total_Workforce_Count" stroke="#3B82F6" name="Workforce" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              ESG Categories
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value} metrics`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Environmental Metrics */}
          {currentYearData?.categories.find(cat => cat.category === 'Environmental') && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Environmental Metrics
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={currentYearData.categories.find(cat => cat.category === 'Environmental').metrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="title" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Social Metrics */}
          {currentYearData?.categories.find(cat => cat.category === 'Social') && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Social Metrics
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={currentYearData.categories.find(cat => cat.category === 'Social').metrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="title" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Year-over-Year Summary */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Year-over-Year Summary
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Environmental
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Social
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Governance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Metrics
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {summary.yearly_data.map(yearData => (
                  <tr key={yearData.year}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {yearData.year}
                    </td>
                    {['Environmental', 'Social', 'Governance'].map(category => {
                      const categoryData = yearData.categories.find(cat => cat.category === category)
                      return (
                        <td key={category} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {categoryData ? `${categoryData.metrics.length} metrics` : '0 metrics'}
                        </td>
                      )
                    })}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {yearData.categories.reduce((sum, cat) => sum + cat.metrics.length, 0)} metrics
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
