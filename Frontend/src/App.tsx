import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Layout Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Pages
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import FieldDetailPage from "./pages/FieldDetailPage";
import BookingPage from "./pages/BookingPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

// Role-specific pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import VisitorBookingPage from "./pages/visitor/VisitorBookingPage";

// Auth Components
import RoleProtectedRoute from "./components/auth/RoleProtectedRoute";
import { useAuth } from "./context/AuthContext";

// Protected Route Component (backward compatibility)
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { authState } = useAuth();

  if (authState.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/field/:id" element={<FieldDetailPage />} />

          {/* Visitor booking (no registration required) */}
          <Route path="/visitor-booking" element={<VisitorBookingPage />} />

          {/* Authentication routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Admin routes */}
          <Route
            path="/admin/dashboard"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </RoleProtectedRoute>
            }
          />

          {/* Owner routes */}
          <Route
            path="/owner/dashboard"
            element={
              <RoleProtectedRoute allowedRoles={["owner"]}>
                <OwnerDashboard />
              </RoleProtectedRoute>
            }
          />

          {/* Visitor/User routes */}
          <Route
            path="/booking"
            element={
              <RoleProtectedRoute allowedRoles={["visitor"]}>
                <BookingPage />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RoleProtectedRoute allowedRoles={["visitor"]}>
                <DashboardPage />
              </RoleProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#fff",
            color: "#333",
          },
          success: {
            style: {
              border: "1px solid #10B981",
            },
          },
          error: {
            style: {
              border: "1px solid #EF4444",
            },
          },
        }}
      />
    </div>
  );
}

export default App;
