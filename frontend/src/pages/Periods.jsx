// src/pages/Periods.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Periods() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [periods, setPeriods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8; // Số thời kỳ mỗi trang (có thể thay đổi)

  const lang = i18n.language;

  useEffect(() => {
    const fetchPeriods = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get("/api/periods", {
          params: {
            page: currentPage,
            limit: itemsPerPage,
          },
        });

        const data = res.data;

        const perriodsList = data.periods || data.data || data || [];
        const safeData = Array.isArray(perriodsList) ? perriodsList : [];

        setPeriods(safeData);
        setTotalPages(res.data.totalPages || 1);
        console.log("Dữ liệu thời kỳ:", safeData); // tùy backend trả về
      } catch (err) {
        console.error("Lỗi tải thời kỳ:", err);
        setError(t("error") || "Có lỗi xảy ra khi tải dữ liệu");
        setPeriods([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };
    fetchPeriods();
  }, [currentPage, t]);

  const handleClick = (id) => {
    navigate(`/period/${id}`);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" }); // cuộn lên đầu khi chuyển trang
    }
  };

  if (loading)
    return (
      <div className="text-center py-20 text-xl">
        {t("loading") || "Đang tải..."}
      </div>
    );
  if (error)
    return (
      <div className="text-center py-20 text-red-600 text-xl">{error}</div>
    );

  return (
    <div className="py-16 px-4 bg-gray-100 min-h-screen">
      <div className="max-w-screen-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-navy mb-12">
          {t("nav.periods") || "Các thời kỳ lịch sử"}
        </h1>

        {/* Danh sách thời kỳ */}
        {periods.length === 0 ? (
          <p className="text-center text-xl text-gray-600 py-10">
            {t("periods.no_results") || "Chưa có thời kỳ nào"}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {periods.map((period, index) => {
              const name =
                lang === "en" ? period.period_name_en : period.period_name_vi;
              const content =
                (lang === "en" ? period.content_en : period.content_vi) || "";
              const timeRange = `${period.start_year} - ${period.end_year || t("present")}`;

              return (
                <motion.div
                  key={period.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition cursor-pointer border border-gray-400"
                  onClick={() => handleClick(period.id)}
                >
                  <h2 className="text-2xl font-semibold text-navy mb-2">
                    {name}
                  </h2>
                  <p className="text-gray-600 mb-4 font-medium">{timeRange}</p>
                  <p className="text-gray-700 line-clamp-4 mb-4">{content}</p>
                  {period.image_url && (
                    <img
                      src={period.image_url}
                      alt={name}
                      className="w-full h-48 object-cover rounded-lg mt-4"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Phân trang */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-8 py-4 rounded-xl font-bold transition ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#c8102e] text-white hover:bg-[#a00d25]"
              }`}
            >
              {t("previous") || "Trang trước"}
            </button>

            <span className="text-xl font-medium text-gray-800">
              Trang {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-8 py-4 rounded-xl font-bold transition ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#c8102e] text-white hover:bg-[#a00d25]"
              }`}
            >
              {t("next") || "Trang sau"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
