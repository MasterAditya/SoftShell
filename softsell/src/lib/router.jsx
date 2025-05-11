import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout.jsx'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import ProtectedRoute from '../components/shared/ProtectedRoute.jsx'
import AdminRoute from '../components/shared/AdminRoute.jsx'

// Direct imports
import Home from '../pages/Home.jsx'
import About from '../pages/About.jsx'
import Contact from '../pages/Contact.jsx'
import FAQ from '../pages/FAQ.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import Licenses from '../pages/Licenses.jsx'
import NewLicense from '../pages/NewLicense.jsx'
import EditLicense from '../pages/EditLicense.jsx'
import LicenseDetails from '../pages/LicenseDetails.jsx'
import Profile from '../pages/Profile.jsx'
import AdminDashboard from '../pages/AdminDashboard.jsx'
import AdminUsers from '../pages/AdminUsers.jsx'
import NotFound from '../pages/NotFound.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'faq', element: <FAQ /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'licenses', element: <Licenses /> },
          { path: 'licenses/new', element: <NewLicense /> },
          { path: 'licenses/:id', element: <LicenseDetails /> },
          { path: 'licenses/:id/edit', element: <EditLicense /> },
          { path: 'profile', element: <Profile /> },
          { path: 'admin', element: <AdminRoute><AdminDashboard /></AdminRoute> },
          { path: 'admin/users', element: <AdminRoute><AdminUsers /></AdminRoute> },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
])
