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

  useEffect(() => {
    const fetchFigures = async () => {
      try {
        const res = await axios.get("/api/figures");
        const data = res.data.figures || res.data || [];
        const safeData = Array.isArray(data) ? data : [];
        setFigures(safeData);
        console.log("Dữ liệu nhân vật từ API:", safeData);
      } catch (err) {
        console.error("Lỗi tải nhân vật:", err);
        setError(t("error") || "Không tải được danh sách nhân vật");
        setFigures([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFigures();
  }, [t]);

  const lang = i18n.language;

  const handleClick = (id) => {
    navigate(`/figure/${id}`);
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {figures.map((figure, index) => {
              const name =
                lang === "en"
                  ? figure.full_name_en || figure.full_name_vi || "Không rõ"
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
                  {/* Ảnh nhân vật - hiển thị đầy đủ, đúng tỷ lệ */}
                  <div className=" h-80 overflow-hidden flex items-center justify-center bg-gray-100">
                    {figure.image_url ? (
                      <img
                        src={figure.image_url}
                        alt={name}
                        className="w-full h-81 object-contain transition-transform duration-500 hover:scale-105"
                        onError={(e) => {
                          e.target.src = "/placeholder-figure.jpg"; // ảnh mặc định nếu lỗi
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
        )}
      </div>
    </div>
  );
}
