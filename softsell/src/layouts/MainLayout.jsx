import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'

export default function MainLayout() {
  const { darkMode } = useSelector((state) => state.theme)

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
