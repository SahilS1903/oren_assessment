import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { 
  ClipboardList, 
  BarChart3, 
  Calendar,
  TrendingUp,
  Building2,
  Leaf
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalResponses: 0,
    latestYear: null,
    completionRate: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/responses/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const financialYear = `${currentYear}-${(currentYear + 1).toString().slice(-2)}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600 mt-1">
              Track and manage your ESG metrics for sustainable growth
            </p>
          </div>
          <div className="flex items-center space-x-2 text-primary-600">
            <Building2 className="h-8 w-8" />
            <Leaf className="h-8 w-8" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ClipboardList className="h-8 w-8 text-primary-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Responses
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  {loading ? '...' : stats.totalResponses}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Latest Year
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  {loading ? '...' : (stats.latestYear || 'No data')}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Completion Rate
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  {loading ? '...' : `${stats.completionRate}%`}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/questionnaire"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ClipboardList className="h-6 w-6 text-primary-600 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                Fill ESG Questionnaire
              </h3>
              <p className="text-sm text-gray-500">
                Complete your ESG metrics for {financialYear}
              </p>
            </div>
          </Link>

          <Link
            to="/summary"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <BarChart3 className="h-6 w-6 text-green-600 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                View Summary & Reports
              </h3>
              <p className="text-sm text-gray-500">
                Analyze your ESG performance and download reports
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* ESG Categories Overview */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-4">ESG Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 border border-green-200 rounded-lg bg-green-50">
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100 mb-3">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-900">Environmental</h3>
            <p className="text-sm text-gray-500 mt-1">
              Energy, emissions, and resource consumption
            </p>
          </div>

          <div className="text-center p-4 border border-blue-200 rounded-lg bg-blue-50">
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 mb-3">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-900">Social</h3>
            <p className="text-sm text-gray-500 mt-1">
              Employee diversity, training, and community impact
            </p>
          </div>

          <div className="text-center p-4 border border-purple-200 rounded-lg bg-purple-50">
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-purple-100 mb-3">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-900">Governance</h3>
            <p className="text-sm text-gray-500 mt-1">
              Board independence and data privacy policies
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
