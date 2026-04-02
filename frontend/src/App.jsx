import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Timeline from "./components/TimeLine/Timeline";
import Periods from "./pages/Periods";
import Figures from "./pages/Figures";
import FigureDetail from "./pages/FigureDetail";
import Search from "./pages/Search";
import EventDetail from "./pages/EventDetail";
import PeriodDetail from "./pages/PeriodDetail";

import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminEvents from "./pages/Admin/AdminEvents";
import AdminFigures from "./pages/Admin/AdminFigures";
import AdminPeriods from "./pages/Admin/AdminPeriods";

import AdminLayout from "./layouts/AdminLayout";

// Component bảo vệ route admin
const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* USER LAYOUT - tất cả trang công khai */}
        <Route
          path="/*"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/timeline" element={<Timeline />} />
                  <Route path="/periods" element={<Periods />} />
                  <Route path="/figures" element={<Figures />} />
                  <Route path="/figure/:id" element={<FigureDetail />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/event/:id" element={<EventDetail />} />
                  <Route path="/period/:id" element={<PeriodDetail />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />

        {/* ADMIN LOGIN (không dùng layout, không bảo vệ) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN LAYOUT - bảo vệ tất cả route con */}
        <Route element={<AdminLayout />}>
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/events"
            element={
              <ProtectedAdminRoute>
                <AdminEvents />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/figures"
            element={
              <ProtectedAdminRoute>
                <AdminFigures />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/periods"
            element={
              <ProtectedAdminRoute>
                <AdminPeriods />
              </ProtectedAdminRoute>
            }
          />
        </Route>

        {/* Redirect nếu gõ /admin */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
