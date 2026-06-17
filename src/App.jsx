import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home           from './pages/Home'
import Login          from './pages/Login'
import AdminLayout    from './components/admin/Layout'
import Dashboard      from './pages/admin/Dashboard'
import TestimonialsAdmin from './pages/admin/TestimonialsAdmin'
import ProjectsAdmin  from './pages/admin/ProjectsAdmin'
import LeadsAdmin     from './pages/admin/LeadsAdmin'
import ProtectedRoute from './components/ProtectedRoute'

import PublicLayout   from './components/public/PublicLayout'
import NotFound       from './pages/NotFound'
import Amc            from './pages/Amc'
import Designers      from './pages/Designers'
import About          from './pages/About'
import ContactPage    from './pages/ContactPage'
import ServicesPage   from './pages/ServicesPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/amc" element={<Amc />} />
          <Route path="/designers" element={<Designers />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
        
        <Route path="/admin/login" element={<Login />} />

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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
