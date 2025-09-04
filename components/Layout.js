import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'

const Layout = ({ children, title = 'ESG Questionnaire Platform' }) => {
  const { user, logout } = useAuth()

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="ESG Questionnaire Platform for sustainability reporting" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="flex-shrink-0 flex items-center">
                  <span className="text-2xl font-bold text-primary-600">ESG Platform</span>
                </Link>
                
                {user && (
                  <div className="hidden md:ml-6 md:flex md:space-x-8">
                    <Link href="/dashboard" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                      Dashboard
                    </Link>
                    <Link href="/questionnaire" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                      Questionnaire
                    </Link>
                    <Link href="/summary" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                      Summary
                    </Link>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-4">
                {user ? (
                  <>
                    <span className="text-gray-700 text-sm">Welcome, {user.name}</span>
                    <button
                      onClick={logout}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="space-x-2">
                    <Link href="/login" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                      Login
                    </Link>
                    <Link href="/register" className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="text-center text-gray-500 text-sm">
              © 2024 ESG Questionnaire Platform. Built for sustainability reporting.
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Layout
