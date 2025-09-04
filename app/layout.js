import { Inter } from 'next/font/google'
import { AuthProvider } from '../contexts/AuthContext'
import { Toaster } from 'react-hot-toast'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ESG Questionnaire Platform',
  description: 'ESG Questionnaire Platform for sustainability reporting',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  )
}
