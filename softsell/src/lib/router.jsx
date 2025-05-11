import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'
import MainLayout from '/src/layouts/MainLayout'
import DashboardLayout from '/src/layouts/DashboardLayout'
import ProtectedRoute from '/src/components/shared/ProtectedRoute'
import AdminRoute from '/src/components/shared/AdminRoute'

// Lazy-loaded pages
const Home = lazy(() => import('/src/pages/Home'))
const About = lazy(() => import('/src/pages/About'))
const Contact = lazy(() => import('/src/pages/Contact'))
const FAQ = lazy(() => import('/src/pages/FAQ'))
const Login = lazy(() => import('/src/pages/Login'))
const Register = lazy(() => import('/src/pages/Register'))
const Dashboard = lazy(() => import('/src/pages/Dashboard'))
const Licenses = lazy(() => import('/src/pages/Licenses'))
const NewLicense = lazy(() => import('/src/pages/NewLicense'))
const EditLicense = lazy(() => import('/src/pages/EditLicense'))
const LicenseDetails = lazy(() => import('/src/pages/LicenseDetails'))
const Profile = lazy(() => import('/src/pages/Profile'))
const AdminDashboard = lazy(() => import('/src/pages/AdminDashboard'))
const AdminUsers = lazy(() => import('/src/pages/AdminUsers'))
const NotFound = lazy(() => import('/src/pages/NotFound'))

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
