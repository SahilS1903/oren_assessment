'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'

const YearlyTrends = ({ data }) => {
  if (!data || data.length === 0) return null

  // Prepare data for charts
  const chartData = data.map(yearData => {
    const categoryTotals = {}
    yearData.categories.forEach(category => {
      const total = category.metrics.reduce((sum, metric) => sum + metric.value, 0)
      categoryTotals[category.category] = total
    })
    
    return {
      year: yearData.year,
      ...categoryTotals
    }
  })

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ESG Trends Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="Environmental" 
              stroke="#10b981" 
              strokeWidth={2}
              name="Environmental"
            />
            <Line 
              type="monotone" 
              dataKey="Social" 
              stroke="#3b82f6" 
              strokeWidth={2}
              name="Social"
            />
            <Line 
              type="monotone" 
              dataKey="Governance" 
              stroke="#8b5cf6" 
              strokeWidth={2}
              name="Governance"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Comparison by Year</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Environmental" fill="#10b981" name="Environmental" />
            <Bar dataKey="Social" fill="#3b82f6" name="Social" />
            <Bar dataKey="Governance" fill="#8b5cf6" name="Governance" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {['Environmental', 'Social', 'Governance'].map(category => (
          <div key={category} className="bg-white p-6 rounded-lg shadow">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">{category}</h4>
            <div className="space-y-3">
              {data.map(yearData => {
                const categoryData = yearData.categories.find(cat => cat.category === category)
                const total = categoryData?.metrics.reduce((sum, metric) => sum + metric.value, 0) || 0
                
                return (
                  <div key={yearData.year} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{yearData.year}</span>
                    <span className="font-medium">{total.toFixed(1)}</span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default YearlyTrends
