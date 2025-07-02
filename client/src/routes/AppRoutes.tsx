import { Routes, Route } from "react-router-dom"
import Login from "@/pages/Login"
import Signup from "@/pages/Signup"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import Dashboard from "@/pages/Dashboard"
const AppRoutes = () => {
  return (
    <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/dashboard" element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    } />
  </Routes>
  )
}

export default AppRoutes
