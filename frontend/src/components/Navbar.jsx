// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "vi" ? "en" : "vi");
  };

  // Xử lý submit tìm kiếm (ấn Enter hoặc click icon)
  const handleSearch = (e) => {
    e.preventDefault(); // Ngăn reload trang mặc định
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(""); // Xóa input sau khi tìm (tùy chọn)
    }
  };

  return (
    <nav className=" bg-navy">
      <div className="max-w-7xl text-white  mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo cờ Việt Nam + Tên trang */}
        <div className="flex items-center space-x-3">
          <img
            src="/vietnam-flag.png"
            alt="Cờ Việt Nam"
            className="w-10 h-6 object-contain flex-shrink-0"
          />
          <Link to="/" className="text-xl md:text-2xl font-bold">
            {t("home.hero.title")}
          </Link>
        </div>

        {/* Menu chính */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-accent transition">
            {t("nav.home")}
          </Link>
          <Link to="/timeline" className="hover:text-accent transition">
            {t("nav.timeline")}
          </Link>
          <Link to="/periods" className="hover:text-accent transition">
            {t("nav.periods")}
          </Link>
          <Link to="/figures" className="hover:text-accent transition">
            {t("nav.figures")}
          </Link>

          {/* Thanh tìm kiếm - ĐÃ SỬA */}
          <form onSubmit={handleSearch} className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                t("nav.search_placeholder") || "Tìm kiếm sự kiện, thời kỳ..."
              }
              className="pl-10 pr-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/30 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-accent w-64"
            />
            {/* Icon kính lúp - click cũng submit form */}
            <button
              type="submit"
              className="absolute left-3 text-gray-600 hover:text-accent transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>

          {/* Nút chuyển ngôn ngữ */}
          <button
            onClick={toggleLanguage}
            className="bg-primary text-white hover:bg-primary-dark px-4 py-2 rounded-md transition font-medium"
          >
            {t("nav.language")}
          </button>
        </div>

        {/* Mobile: chỉ hiển thị nút ngôn ngữ (có thể thêm hamburger sau) */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleLanguage}
            className="bg-primary px-3 py-1 rounded"
          >
            {t("nav.language")}
          </button>
        </div>
      </div>
    </nav>
  );
}
