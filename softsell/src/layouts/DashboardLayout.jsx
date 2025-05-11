import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/layout/Sidebar'
import { DashboardHeader } from '../components/layout/DashboardHeader'

export default function DashboardLayout() {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
