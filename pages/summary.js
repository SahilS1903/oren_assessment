import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../contexts/AuthContext'
import Layout from '../components/Layout'
import axios from 'axios'

const Summary = () => {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [exportLoading, setExportLoading] = useState(false)

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
      const token = localStorage.getItem('token')
      console.log('Token exists:', !!token)
      console.log('Token preview:', token ? token.substring(0, 20) + '...' : 'none')
      
      const response = await axios.get('/api/summary', {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log('Summary response:', response.data)
      setSummary(response.data.summary)
    } catch (err) {
      setError('Failed to load summary data')
      console.error('Summary error:', err)
    } finally {
      setLoading(false)
    }
  }

  const exportToPDF = async () => {
    setExportLoading(true)
    try {
      // Create a printable version
      const printContent = document.getElementById('summary-content')
      const originalContent = document.body.innerHTML
      document.body.innerHTML = printContent.innerHTML
      window.print()
      document.body.innerHTML = originalContent
      window.location.reload() // Reload to restore event listeners
    } catch (err) {
      console.error('Export failed:', err)
    } finally {
      setExportLoading(false)
    }
  }

  const exportToCSV = () => {
    if (!summary) return

    let csvContent = 'Year,Category,Metric,Value,Unit\n'
    
    summary.yearly_data.forEach(yearData => {
      yearData.categories.forEach(category => {
        category.metrics.forEach(metric => {
          csvContent += `${yearData.year},${category.category},${metric.title},${metric.value},${metric.unit}\n`
        })
      })
    })

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `ESG_Summary_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (authLoading || loading) {
    return (
      <Layout title="Summary - ESG Platform">
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading summary...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout title="Summary - ESG Platform">
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </Layout>
    )
  }

  if (!summary || !summary.yearly_data || summary.yearly_data.length === 0) {
    return (
      <Layout title="Summary - ESG Platform">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Data Available</h2>
          <p className="text-gray-600 mb-6">
            You haven't completed any questionnaires yet. Start by filling out your ESG metrics.
          </p>
          <a href="/questionnaire" className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700">
            Take Questionnaire
          </a>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Summary - ESG Platform">
      <div className="space-y-8">
        {/* Header with Export Options */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ESG Summary Report</h1>
            <p className="mt-2 text-gray-600">
              Comprehensive overview of your sustainability metrics
            </p>
          </div>
          <div className="space-x-3">
            <button
              onClick={exportToPDF}
              disabled={exportLoading}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              {exportLoading ? 'Exporting...' : 'Export PDF'}
            </button>
            <button
              onClick={exportToCSV}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Export CSV
            </button>
          </div>
        </div>

        {/* Summary Content */}
        <div id="summary-content" className="space-y-8">
          {/* Executive Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Executive Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">{summary.yearly_data.length}</div>
                <div className="text-sm text-gray-600">Years of Data</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {summary.yearly_data[summary.yearly_data.length - 1]?.categories.reduce(
                    (total, cat) => total + cat.metrics.length, 0
                  )}
                </div>
                <div className="text-sm text-gray-600">Current Year Metrics</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">3</div>
                <div className="text-sm text-gray-600">ESG Categories</div>
              </div>
            </div>
          </div>

          {/* Yearly Data */}
          {summary.yearly_data.map(yearData => (
            <div key={yearData.year} className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {yearData.year} ESG Metrics
              </h2>

              {yearData.categories.map(category => (
                <div key={category.category} className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
                    {category.category} Metrics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.metrics.map(metric => (
                      <div key={metric.title} className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 text-sm mb-2">
                          {metric.title}
                        </h4>
                        <div className="text-2xl font-bold text-primary-600">
                          {metric.value} <span className="text-sm text-gray-500">{metric.unit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Trends Analysis */}
          {summary.yearly_data.length > 1 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Trends Analysis</h2>
              <div className="space-y-4">
                {['Environmental', 'Social', 'Governance'].map(category => {
                  const currentYear = summary.yearly_data[summary.yearly_data.length - 1]
                  const previousYear = summary.yearly_data[summary.yearly_data.length - 2]
                  
                  const currentMetrics = currentYear?.categories.find(cat => cat.category === category)?.metrics.length || 0
                  const previousMetrics = previousYear?.categories.find(cat => cat.category === category)?.metrics.length || 0
                  
                  const change = currentMetrics - previousMetrics
                  const changePercent = previousMetrics > 0 ? ((change / previousMetrics) * 100).toFixed(1) : 0

                  return (
                    <div key={category} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">{category}</h3>
                        <p className="text-sm text-gray-600">
                          {currentMetrics} metrics ({previousMetrics} previous year)
                        </p>
                      </div>
                      <div className={`text-right ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <div className="font-bold">
                          {change >= 0 ? '+' : ''}{change} metrics
                        </div>
                        <div className="text-sm">
                          {changePercent}% change
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Data Completeness */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Completeness</h2>
            <div className="space-y-4">
              {summary.yearly_data.map(yearData => (
                <div key={yearData.year} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{yearData.year}</h3>
                    <p className="text-sm text-gray-600">
                      {yearData.categories.reduce((total, cat) => total + cat.metrics.length, 0)} total metrics
                    </p>
                  </div>
                  <div className="text-right">
                    {yearData.categories.map(cat => (
                      <div key={cat.category} className="text-sm">
                        <span className="font-medium">{cat.category}:</span> {cat.metrics.length}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-gray-500 text-sm border-t pt-6">
            <p>ESG Summary Report generated on {new Date().toLocaleDateString()}</p>
            <p>Data covers {summary.yearly_data.length} reporting year(s): {summary.yearly_data.map(y => y.year).join(', ')}</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Summary
