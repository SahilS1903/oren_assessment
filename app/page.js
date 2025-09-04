'use client'

import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'
import Layout from '../components/Layout'

const Home = () => {
  const { user } = useAuth()

  return (
    <Layout title="ESG Questionnaire Platform">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            ESG Questionnaire
            <span className="block text-primary-600">Platform</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Comprehensive Environmental, Social, and Governance reporting platform 
            with real-time calculations, interactive dashboards, and seamless data export.
          </p>
          
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            {user ? (
              <div className="space-x-4">
                <Link href="/dashboard" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
                  View Dashboard
                </Link>
                <Link href="/questionnaire" className="inline-flex items-center px-6 py-3 border border-primary-600 text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50">
                  Take Questionnaire
                </Link>
              </div>
            ) : (
              <div className="space-x-4">
                <Link href="/register" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
                  Get Started
                </Link>
                <Link href="/login" className="inline-flex items-center px-6 py-3 border border-primary-600 text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50">
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Comprehensive ESG Reporting
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Everything you need for professional sustainability reporting
              </p>
            </div>

            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                      📊
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Interactive Dashboard</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Real-time visualizations and charts for your ESG metrics across multiple years.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                      📝
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Smart Questionnaire</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Comprehensive questionnaire covering Environmental, Social, and Governance metrics.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                      📈
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Real-time Calculations</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Automatic calculations and trend analysis for year-over-year comparisons.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                      📄
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Export Reports</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Generate professional PDF reports and Excel exports for stakeholders.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Demo Credentials */}
        {!user && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Try the Demo</h3>
            <p className="text-blue-700 mb-3">
              Use these credentials to explore the platform:
            </p>
            <div className="bg-white p-3 rounded border">
              <p className="font-mono text-sm">
                <strong>Email:</strong> test@example.com<br />
                <strong>Password:</strong> password123
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Home
