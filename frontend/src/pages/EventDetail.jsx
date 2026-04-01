import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function EventDetail() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`/api/timeline/${id}`);
        setEvent(res.data);
      } catch (err) {
        setError(t("error"));
        console.error("Lỗi tải sự kiện:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id, t]);

  if (loading)
    return <div className="text-center py-20 text-xl">{t("loading")}</div>;
  if (error || !event)
    return (
      <div className="text-center py-20 text-red-600 text-xl">
        {error || t("event_not_found")}
      </div>
    );

  const lang = i18n.language;
  const title = lang === "en" ? event.title_en : event.title_vi;
  const desc = lang === "en" ? event.description_en : event.description_vi;
  const year = lang === "en" ? event.year_display_en : event.year_display_vi;

  return (
    <div className="min-h-screen py-16 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-primary hover:text-primary-dark flex items-center gap-2 font-medium transition"
        >
          ← {t("back")}
        </button>

        <div>
          {event.image_url && (
            <img
              src={event.image_url}
              alt={title}
              className="float-left w-full md:w-[55%] mr-6 mb-4 rounded-xl shadow-xl border border-gray-200 object-contain bg-white p-2"
            />
          )}

          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            {title}
          </h1>

          <p className="text-xl text-gray-600 mb-4">{year}</p>

          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
            <p className="whitespace-pre-wrap">
              {desc ||
                (lang === "en"
                  ? "No description available"
                  : "Không có mô tả chi tiết")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
