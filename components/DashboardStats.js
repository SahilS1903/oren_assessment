'use client'

const DashboardStats = ({ summary }) => {
  if (!summary) return null

  const stats = [
    {
      title: 'Total Questions',
      value: summary.totalQuestions,
      icon: '📝',
      color: 'blue'
    },
    {
      title: 'Total Responses',
      value: summary.totalResponses,
      icon: '✅',
      color: 'green'
    },
    {
      title: 'Completion Rate',
      value: `${summary.completionRate}%`,
      icon: '📊',
      color: 'purple'
    },
    {
      title: 'Years Covered',
      value: summary.yearly_data?.length || 0,
      icon: '📅',
      color: 'orange'
    }
  ]

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
      orange: 'bg-orange-50 text-orange-600 border-orange-200'
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`p-6 rounded-lg border ${getColorClasses(stat.color)}`}
        >
          <div className="flex items-center">
            <div className="text-2xl mr-3">{stat.icon}</div>
            <div>
              <p className="text-sm font-medium opacity-75">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DashboardStats
