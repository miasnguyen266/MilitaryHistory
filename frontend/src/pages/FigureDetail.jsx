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

        {/* Thông tin chính */}
        <div>
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2">
            {name}
          </h1>

          {/* Year */}
          <p className="text-lg text-gray-500 mb-6">{time}</p>

          {/* Content + ảnh float */}
          <div className="text-gray-800 leading-relaxed text-justify">
            {figure.image_url && (
              <figure className="float-left w-full sm:w-[260px] mr-6 mb-4">
                <img
                  src={figure.image_url}
                  alt={name}
                  className="w-full rounded-lg border border-gray-300 shadow-sm object-contain bg-white p-1"
                />
                <figcaption className="text-sm text-gray-500 italic mt-2 text-center">
                  {name}
                </figcaption>
              </figure>
            )}

            <h2 className="text-2xl font-semibold text-navy mb-4">
              {lang === "en" ? "Biography" : "Tiểu sử"}
            </h2>

            <p className="mb-6 whitespace-pre-wrap break-words">
              {content.bio || "Không có tiểu sử"}
            </p>

            <h2 className="text-2xl font-semibold text-navy mb-4">
              {lang === "en" ? "Contributions" : "Đóng góp"}
            </h2>

            <p className="whitespace-pre-wrap break-words">
              {content.contributions || "Không có thông tin"}
            </p>

            <div className="clear-both"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
