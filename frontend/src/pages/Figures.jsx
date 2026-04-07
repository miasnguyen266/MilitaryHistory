// src/pages/Figures.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Figures() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [figures, setFigures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 8; // Bạn có thể thay đổi số lượng hiển thị mỗi trang

  useEffect(() => {
    const fetchFigures = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get("/api/figures", {
          params: {
            page: currentPage,
            limit: itemsPerPage,
          },
        });

        const data = res.data;

        // Hỗ trợ nhiều cấu trúc response khác nhau
        const figuresList = data.figures || data.data || data || [];
        const safeData = Array.isArray(figuresList) ? figuresList : [];

        setFigures(safeData);
        setTotalPages(data.totalPages || 1);
        console.log("Dữ liệu nhân vật từ API:", safeData);
      } catch (err) {
        console.error("Lỗi tải nhân vật:", err);
        setError(t("error") || "Không tải được danh sách nhân vật");
        setFigures([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchFigures();
  }, [currentPage, t]);

  const lang = i18n.language;

  const handleClick = (id) => {
    navigate(`/figure/${id}`);
  };

  // Xử lý chuyển trang
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "instant" });
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
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-navy mb-12">
          Nhân vật lịch sử
        </h1>

        {figures.length === 0 ? (
          <p className="text-center text-xl text-gray-600 py-10">
            {t("figures.no_results") || "Chưa có nhân vật lịch sử nào"}
          </p>
        ) : (
          <>
            {/* Grid nhân vật */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {figures.map((figure, index) => {
                const name =
                  lang === "en"
                    ? figure.full_name_en || figure.full_name_vi || "Unknown"
                    : figure.full_name_vi || figure.full_name_en || "Không rõ";

                const time = figure.birth_year
                  ? `${figure.birth_year} - ${figure.death_year || (lang === "en" ? "Present" : "Nay")}`
                  : lang === "en"
                    ? "Unknown"
                    : "Không rõ";

                return (
                  <motion.div
                    key={figure.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition cursor-pointer border border-gray-200 flex flex-col"
                    onClick={() => handleClick(figure.id)}
                  >
                    <div className="h-80 overflow-hidden flex items-center justify-center bg-gray-100">
                      {figure.image_url ? (
                        <img
                          src={figure.image_url}
                          alt={name}
                          className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                          onError={(e) => {
                            e.target.src = "/placeholder-figure.jpg";
                            e.target.className = "w-full h-full object-cover";
                          }}
                        />
                      ) : (
                        <span className="text-gray-500 text-lg">
                          {t("no_image") || "Không có ảnh"}
                        </span>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-2xl font-semibold text-navy mb-2 line-clamp-2">
                        {name}
                      </h3>
                      <p className="text-gray-600 mb-4">{time}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Phân trang */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-col items-center">
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  {/* Nút Previous */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    ← {t("previous")}
                  </button>

                  {/* Các số trang */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg transition ${
                          currentPage === page
                            ? "bg-navy text-white font-semibold"
                            : "border border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}

                  {/* Nút Next */}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {t("next") || "Sau"} →
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
