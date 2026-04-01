// src/pages/Timeline.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Timeline() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("/api/timeline");
        // Sắp xếp tự động theo event_date (tăng dần: cũ → mới)
        const sorted = res.data
          .filter((event) => event.event_year) // Lọc bỏ nếu không có ngày
          .sort((a, b) => new Date(a.event_year) - new Date(b.event_year));
        setEvents(sorted);
      } catch (err) {
        setError(t("error"));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [t]);

  const lang = i18n.language;

  const handleClick = (id) => {
    navigate(`/event/${id}`);
  };

  if (loading)
    return <div className="text-center py-20 text-xl">{t("loading")}</div>;
  if (error)
    return (
      <div className="text-center py-20 text-red-600 text-xl">{error}</div>
    );
  if (events.length === 0)
    return <div className="text-center py-20 text-xl">{t("no_events")}</div>;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-navy mb-4">
          {t("nav.timeline")}
        </h1>

        <div className="relative mt-16">
          {/* Đường timeline chính */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/30 top-0"></div>

          {events.map((event, index) => {
            const title = lang === "en" ? event.title_en : event.title_vi;
            const desc =
              lang === "en" ? event.description_en : event.description_vi;
            const year =
              lang === "en" ? event.year_display_en : event.year_display_vi;

            const isLeft = index % 2 === 0; // Xen kẽ trái-phải

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative mb-24 flex items-center ${isLeft ? "justify-start" : "justify-end"}`}
                onClick={() => handleClick(event.id)}
              >
                {/* Điểm nổi bật trên đường timeline */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-white border-4 border-primary rounded-full z-10 shadow-lg"></div>

                {/* Nội dung sự kiện */}
                <div
                  className={`w-full md:w-5/12 p-6 rounded-xl shadow-lg bg-white hover:shadow-2xl transition-all duration-300 cursor-pointer group ${isLeft ? "mr-auto" : "ml-auto"}`}
                >
                  {/* Năm nổi bật */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-6 py-2 rounded-full font-bold text-xl shadow-md z-20">
                    {year}
                  </div>

                  <h3 className="text-2xl font-semibold text-navy mb-3 mt-8 group-hover:text-primary transition">
                    {title ||
                      (lang === "en"
                        ? "Unnamed Event"
                        : "Sự kiện chưa đặt tên")}
                  </h3>

                  <p className="text-gray-700 line-clamp-4 mb-4 leading-relaxed">
                    {desc ||
                      (lang === "en"
                        ? "No description available"
                        : "Chưa có mô tả")}
                  </p>

                  {event.image_url && (
                    <div className="overflow-hidden rounded-lg mt-4">
                      <img
                        src={event.image_url}
                        alt={title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
