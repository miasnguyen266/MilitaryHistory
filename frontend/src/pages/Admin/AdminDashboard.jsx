// src/pages/Admin/AdminDashboard.jsx
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

// Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

// 🔥 map action number -> string
const ACTION_LABEL = {
  1: "add",
  2: "edit",
  3: "delete",
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const [timeFilter, setTimeFilter] = useState("day");
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [stats, setStats] = useState({
    events: { add_count: 0, edit_count: 0, delete_count: 0 },
    figures: { add_count: 0, edit_count: 0, delete_count: 0 },
    periods: { add_count: 0, edit_count: 0, delete_count: 0 },
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const activitiesPerPage = 5;

  useEffect(() => {
    if (!token) return;
    fetchDashboardData();
  }, [timeFilter, token]);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      // 1. Stats
      const statsRes = await axios.get("/api/admin/stats", config);
      setStats(statsRes.data);

      // 2. Chart
      const chartRes = await axios.get(
        `/api/admin/chart?filter=${timeFilter}`,
        config,
      );

      const chart = chartRes.data;

      setChartData({
        labels: chart.labels,
        datasets: [
          {
            label: "Sự kiện",
            data: chart.events,
            backgroundColor: "rgba(54, 162, 235, 0.7)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
          {
            label: "Nhân vật",
            data: chart.figures,
            backgroundColor: "rgba(75, 192, 192, 0.7)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: "Thời kỳ",
            data: chart.periods,
            backgroundColor: "rgba(255, 159, 64, 0.7)",
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 1,
          },
        ],
      });

      // 3. Activities
      const activitiesRes = await axios.get(
        "/api/admin/recent-activities",
        config,
      );

      // 🔥 convert action number -> string
      const formatted = activitiesRes.data.map((act) => ({
        ...act,
        type: ACTION_LABEL[act.type] || "delete",
      }));

      setRecentActivities(formatted);
    } catch (err) {
      console.error("Lỗi fetch dashboard:", err);

      if (err.response?.status === 401) {
        logout();
        toast.error("Phiên đăng nhập hết hạn!");
        navigate("/admin/login");
      } else {
        const errMsg =
          err.response?.data?.error || "Không thể tải dữ liệu dashboard";
        setError(errMsg);
        toast.error(errMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  // pagination
  const indexOfLast = currentPage * activitiesPerPage;
  const indexOfFirst = indexOfLast - activitiesPerPage;
  const currentActivities = recentActivities.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(recentActivities.length / activitiesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  const renderPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (start > 1) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages) pages.push("...");

    return pages;
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: `Số lượng bài đăng theo thời gian (${
          timeFilter === "day"
            ? "Ngày"
            : timeFilter === "week"
              ? "Tuần"
              : "Tháng"
        })`,
      },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  if (loading)
    return <div className="text-center py-20">Đang tải dữ liệu...</div>;

  if (error)
    return <div className="text-center py-20 text-red-600">{error}</div>;

  if (error) {
    return (
      <div className="text-center py-20 text-xl text-red-600">{error}</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-navy mb-10 text-center">
        Chào mừng đến Dashboard Admin
      </h1>

      {/* Filter thời gian */}
      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => setTimeFilter("day")}
          className={`px-8 py-3 rounded-full font-medium transition-all ${
            timeFilter === "day"
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Ngày
        </button>
        <button
          onClick={() => setTimeFilter("week")}
          className={`px-8 py-3 rounded-full font-medium transition-all ${
            timeFilter === "week"
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Tuần
        </button>
        <button
          onClick={() => setTimeFilter("month")}
          className={`px-8 py-3 rounded-full font-medium transition-all ${
            timeFilter === "month"
              ? "bg-primary text-white "
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Tháng
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Biểu đồ */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-xl">
          <div className="h-96">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Thống kê */}
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-navy mb-8">
            Thống kê hoạt động
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-700">
                Sự kiện
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-green-600 font-bold text-2xl">
                    {stats.events.add_count}
                  </p>
                  <p className="text-sm text-gray-600">Thêm</p>
                </div>
                <div>
                  <p className="text-blue-600 font-bold text-2xl">
                    {stats.events.edit_count}
                  </p>
                  <p className="text-sm text-gray-600">Sửa</p>
                </div>
                <div>
                  <p className="text-red-600 font-bold text-2xl">
                    {stats.events.delete_count}
                  </p>
                  <p className="text-sm text-gray-600">Xóa</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-700">
                Nhân vật
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-green-600 font-bold text-2xl">
                    {stats.figures.add_count}
                  </p>
                  <p className="text-sm text-gray-600">Thêm</p>
                </div>
                <div>
                  <p className="text-blue-600 font-bold text-2xl">
                    {stats.figures.edit_count}
                  </p>
                  <p className="text-sm text-gray-600">Sửa</p>
                </div>
                <div>
                  <p className="text-red-600 font-bold text-2xl">
                    {stats.figures.delete_count}
                  </p>
                  <p className="text-sm text-gray-600">Xóa</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-purple-700">
                Thời kỳ
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-green-600 font-bold text-2xl">
                    {stats.periods.add_count}
                  </p>
                  <p className="text-sm text-gray-600">Thêm</p>
                </div>
                <div>
                  <p className="text-blue-600 font-bold text-2xl">
                    {stats.periods.edit_count}
                  </p>
                  <p className="text-sm text-gray-600">Sửa</p>
                </div>
                <div>
                  <p className="text-red-600 font-bold text-2xl">
                    {stats.periods.delete_count}
                  </p>
                  <p className="text-sm text-gray-600">Xóa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hoạt động mới nhất - có phân trang */}
      <div className="bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-navy mb-8">
          Hoạt động mới nhất
        </h2>

        {currentActivities.length > 0 ? (
          <div className="space-y-4">
            {currentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300"
              >
                <div>
                  <span
                    className={`font-semibold ${
                      activity.type === "add"
                        ? "text-green-600"
                        : activity.type === "edit"
                          ? "text-blue-600"
                          : "text-red-600"
                    }`}
                  >
                    {activity.type === "add"
                      ? "Thêm"
                      : activity.type === "edit"
                        ? "Sửa"
                        : "Xóa"}
                  </span>
                  <span className="ml-2 text-gray-800">{activity.item}</span>
                </div>
                <span className="text-gray-500 text-sm">{activity.time}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 py-10">
            Chưa có hoạt động nào gần đây
          </p>
        )}

        {/* Phân trang */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center items-center gap-2 flex-wrap">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-5 py-2 rounded-lg font-medium transition ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-primary text-white hover:bg-primary-dark"
              }`}
            >
              ← Prev
            </button>

            {renderPageNumbers().map((page, idx) => (
              <button
                key={idx}
                onClick={() => typeof page === "number" && paginate(page)}
                className={`px-5 py-2 rounded-lg font-medium transition ${
                  page === currentPage
                    ? "bg-primary text-white shadow-md"
                    : page === "..."
                      ? "text-gray-500 cursor-default px-3"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                disabled={page === "..."}
              >
                {page}
              </button>
            ))}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`px-5 py-2 rounded-lg font-medium transition ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-primary text-white hover:bg-primary-dark"
              }`}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
