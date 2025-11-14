import { useState, useEffect } from 'react'
import { Sidebar } from './components/Sidebar'
import { MainContent } from './components/MainContent'
import { LoginForm } from './components/LoginForm'
import { useAuth } from './contexts/AuthContext'
import './App.css'

function App() {
  const { isAuthenticated } = useAuth()
  const [activeItem, setActiveItem] = useState('foto-pro-asisten')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode')
      const isDark = saved ? JSON.parse(saved) : false
      // Set initial class immediately
      if (isDark) {
        document.documentElement.classList.add('dark')
      }
      return isDark
    }
    return false
  })

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <LoginForm />
  }

  return (
    <div className="App flex h-screen overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar
        activeItem={activeItem}
        onItemClick={setActiveItem}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header with Menu Button */}
        <header className="md:hidden flex items-center justify-between gap-3 p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6 text-gray-800 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">Foto PRO</h1>
          </div>
          
          {/* Theme Toggle Button - Mobile */}
          <button
            onClick={toggleDarkMode}
            className="relative p-2.5 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 dark:from-blue-500 dark:to-cyan-500 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            aria-label="Toggle theme"
            type="button"
          >
            <div className="relative w-5 h-5">
              <svg
                className={`absolute inset-0 w-5 h-5 text-white transition-all duration-500 ${
                  darkMode ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
              <svg
                className={`absolute inset-0 w-5 h-5 text-white transition-all duration-500 ${
                  darkMode ? '-rotate-90 opacity-0' : 'rotate-0 opacity-100'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
          </button>
        </header>

        {/* Desktop Theme Toggle - Floating Button */}
        <div className="hidden md:block fixed top-6 right-6 z-50">
          <button
            onClick={toggleDarkMode}
            className="group relative p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-110 cursor-pointer"
            aria-label="Toggle theme"
            type="button"
          >
            <div className="relative w-6 h-6">
              {/* Moon Icon - Dark Mode */}
              <svg
                className={`absolute inset-0 w-6 h-6 text-purple-600 dark:text-cyan-400 transition-all duration-500 ${
                  darkMode ? 'rotate-0 opacity-100 scale-100' : 'rotate-90 opacity-0 scale-50'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
              {/* Sun Icon - Light Mode */}
              <svg
                className={`absolute inset-0 w-6 h-6 text-amber-500 transition-all duration-500 ${
                  darkMode ? '-rotate-90 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            
            {/* Tooltip */}
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              {darkMode ? 'Mode Terang' : 'Mode Gelap'}
            </span>
          </button>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <MainContent activeItem={activeItem} />
        </main>
      </div>
    </div>
  )
}

export default App
