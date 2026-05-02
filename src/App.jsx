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
import Builders       from './pages/Builders'
import Designers      from './pages/Designers'
import About          from './pages/About'
import ContactPage    from './pages/ContactPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/builders" element={<Builders />} />
          <Route path="/designers" element={<Designers />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
        
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
