import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function FigureDetail() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [figure, setFigure] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFigure = async () => {
      try {
        // Lấy thông tin nhân vật chính
        const figureRes = await axios.get(`/api/figures/${id}`);
        setFigure(figureRes.data);

        // Lấy nội dung chi tiết theo ngôn ngữ hiện tại
        const lang = i18n.language;
        const contentRes = await axios.get(
          `/api/figures/contents/${id}/${lang}`,
        );
        setContent(contentRes.data);
      } catch (err) {
        setError(t("error"));
        console.error("Lỗi tải chi tiết nhân vật:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFigure();
  }, [id, t, i18n.language]);

  if (loading)
    return <div className="text-center py-20 text-xl">{t("loading")}</div>;
  if (error || !figure || !content)
    return (
      <div className="text-center py-20 text-red-600 text-xl">
        {error || t("figure_not_found")}
      </div>
    );

  const lang = i18n.language;
  const name = lang === "en" ? figure.full_name_en : figure.full_name_vi;
  const time = figure.birth_year
    ? `${figure.birth_year} - ${figure.death_year || "?"}`
    : "Không rõ";

  return (
    <div className="min-h-screen py-16 px-4 bg-gray-100">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl p-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-primary hover:underline flex items-center gap-2 font-medium"
        >
          ← {t("back")}
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Ảnh nhân vật - giữ nguyên hình dạng */}
          {figure.image_url && (
            <div className="md:w-1/3 flex justify-center md:justify-start">
              <img
                src={figure.image_url}
                alt={name}
                className="max-w-full h-auto rounded-xl shadow-lg object-contain border border-gray-200" // object-contain + max-w-full để giữ nguyên hình
              />
            </div>
          )}

          {/* Thông tin chính */}
          <div className="md:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              {name}
            </h1>
            <p className="text-xl text-gray-600 mb-8">{time}</p>

            {/* Tiểu sử chi tiết */}
            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
              <h2 className="text-2xl font-semibold text-navy mb-4">
                {lang === "en" ? "Biography" : "Tiểu sử"}
              </h2>
              <p className="mb-6 whitespace-pre-wrap">
                {content.bio ||
                  (lang === "en"
                    ? "No biography available"
                    : "Không có tiểu sử chi tiết")}
              </p>

              {/* Đóng góp lịch sử */}
              <h2 className="text-2xl font-semibold text-navy mb-4">
                {lang === "en" ? "Contributions" : "Đóng góp"}
              </h2>
              <p className="whitespace-pre-wrap">
                {content.contributions ||
                  (lang === "en"
                    ? "No contributions available"
                    : "Không có thông tin đóng góp")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
