import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home           from './pages/Home'
import Login          from './pages/Login'
import AdminLayout    from './components/admin/Layout'
import Dashboard      from './pages/admin/Dashboard'
import TestimonialsAdmin from './pages/admin/TestimonialsAdmin'
import ProjectsAdmin  from './pages/admin/ProjectsAdmin'
import LeadsAdmin     from './pages/admin/LeadsAdmin'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Admin (protected) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index           element={<Dashboard />} />
          <Route path="testimonials" element={<TestimonialsAdmin />} />
          <Route path="projects"     element={<ProjectsAdmin />} />
          <Route path="leads"        element={<LeadsAdmin />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
