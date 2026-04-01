// src/pages/Admin/AdminLayout.jsx
import { Link, useNavigate, Outlet } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar menu bên trái */}
      <aside className="w-64 bg-white shadow-lg hidden md:block">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-navy mb-10">Admin Panel</h2>
          <nav>
            <ul className="space-y-2 bg-white ">
              <li>
                <Link
                  to="/admin/dashboard"
                  className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-100 text-navy font-medium transition"
                >
                  <span className="mr-3 text-xl">🏠</span> Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/events"
                  className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-100 text-navy font-medium transition"
                >
                  <span className="mr-3 text-xl">📅</span> Quản lý Sự kiện
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/figures"
                  className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-100 text-navy font-medium transition"
                >
                  <span className="mr-3 text-xl">👤</span> Quản lý Nhân vật
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/periods"
                  className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-100 text-navy font-medium transition"
                >
                  <span className="mr-3 text-xl">🗓️</span> Quản lý Thời kỳ
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Nội dung chính */}
      <div className="flex-1 flex flex-col">
        {/* Header nhỏ */}
        <header className=" text-white p-4 flex justify-end shadow-md">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg transition font-medium"
          >
            Đăng xuất
          </button>
        </header>

        {/* Nội dung các trang con (AdminDashboard, AdminEvents, v.v.) sẽ render ở đây */}
        <main className="flex-1 p-6 md:p-8 overflow-auto bg-white">
          <Outlet /> {/* <--- Đây là phần quan trọng! */}
        </main>
      </div>
    </div>
  );
}
