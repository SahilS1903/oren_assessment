'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import toast from 'react-hot-toast'

const SummaryReport = ({ summary, responses, questions }) => {
  if (!summary || !summary.yearly_data || summary.yearly_data.length === 0) {
    return <div className="text-center py-8">No data available for summary report</div>
  }

  const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b']

  // Prepare data for category breakdown pie chart
  const categoryData = Object.entries(summary.categoryBreakdown).map(([category, data]) => ({
    name: category,
    value: data.responses,
    percentage: data.completionRate
  }))

  const exportToPDF = () => {
    // This would integrate with jsPDF - keeping it simple for now
    toast.success('PDF export functionality would be implemented here')
  }

  const exportToExcel = () => {
    // This would integrate with ExcelJS - keeping it simple for now  
    toast.success('Excel export functionality would be implemented here')
  }

  return (
    <div className="space-y-8">
      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Overall Progress</h3>
          <div className="text-3xl font-bold text-primary-600">{summary.completionRate}%</div>
          <p className="text-sm text-gray-600">Complete</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Responses</h3>
          <div className="text-3xl font-bold text-green-600">{summary.totalResponses}</div>
          <p className="text-sm text-gray-600">Out of {summary.totalQuestions * summary.yearly_data.length} possible</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Years Covered</h3>
          <div className="text-3xl font-bold text-blue-600">{summary.yearly_data.length}</div>
          <p className="text-sm text-gray-600">
            {summary.yearly_data.map(d => d.year).sort().join(', ')}
          </p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-4">
            {Object.entries(summary.categoryBreakdown).map(([category, data]) => (
              <div key={category} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium">{category}</span>
                <div className="text-right">
                  <div className="text-sm font-semibold">{data.completionRate}%</div>
                  <div className="text-xs text-gray-600">{data.responses}/{data.questions} questions</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Yearly Data Details */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Yearly Performance</h3>
        
        {summary.yearly_data.map((yearData) => (
          <div key={yearData.year} className="mb-8 last:mb-0">
            <h4 className="text-md font-semibold text-gray-800 mb-4">{yearData.year}</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {yearData.categories.map((category) => (
                <div key={category.category} className="border border-gray-200 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-3">{category.category}</h5>
                  
                  <div className="space-y-2">
                    {category.metrics.map((metric, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600 truncate">{metric.title}</span>
                        <span className="font-medium ml-2">
                          {metric.value} {metric.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Trend Analysis */}
      {summary.trendAnalysis && summary.trendAnalysis.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Trend Analysis</h3>
          
          <div className="space-y-3">
            {summary.trendAnalysis.map((trend, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm">
                  {trend.from} → {trend.to}
                </span>
                <div className="text-right">
                  <span className={`font-medium ${trend.changePercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {trend.changePercentage >= 0 ? '+' : ''}{trend.changePercentage.toFixed(1)}%
                  </span>
                  <div className="text-xs text-gray-600">
                    {trend.change >= 0 ? '+' : ''}{trend.change.toFixed(1)} total change
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Export Options */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Report</h3>
        
        <div className="flex space-x-4">
          <button
            onClick={exportToPDF}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            📄 Export PDF
          </button>
          
          <button
            onClick={exportToExcel}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            📊 Export Excel
          </button>
        </div>
      </div>
    </div>
  )
}

export default SummaryReport
