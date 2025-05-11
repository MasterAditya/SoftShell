import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'
import MainLayout from '../layouts/MainLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import ProtectedRoute from '../components/shared/ProtectedRoute'
import AdminRoute from '../components/shared/AdminRoute'

// Lazy-loaded pages
const Home = lazy(() => import('../pages/Home'))
const About = lazy(() => import('../pages/About'))
const Contact = lazy(() => import('../pages/Contact'))
const FAQ = lazy(() => import('../pages/FAQ'))
const Login = lazy(() => import('../pages/Login'))
const Register = lazy(() => import('../pages/Register'))
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Licenses = lazy(() => import('../pages/Licenses'))
const NewLicense = lazy(() => import('../pages/NewLicense'))
const EditLicense = lazy(() => import('../pages/EditLicense'))
const LicenseDetails = lazy(() => import('../pages/LicenseDetails'))
const Profile = lazy(() => import('../pages/Profile'))
const AdminDashboard = lazy(() => import('../pages/AdminDashboard'))
const AdminUsers = lazy(() => import('../pages/AdminUsers'))
const NotFound = lazy(() => import('../pages/NotFound'))

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
