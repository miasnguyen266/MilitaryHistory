// src/pages/Home.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import axios from "axios";
import ArtifactSlider from "../components/ArtifactSlider";
import VideoCarousel from "../components/Caroselvideo/CaroselVideo";

export default function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = i18n.language;

  const [figures, setFigures] = useState([]);
  const [loadingFigures, setLoadingFigures] = useState(true);

  const [timelineEvents, setTimelineEvents] = useState([]);
  const [loadingTimeline, setLoadingTimeline] = useState(true);

  useEffect(() => {
    const fetchFigures = async () => {
      try {
        const res = await axios.get("/api/figures?limit=4");
        const data = res.data.figures || res.data || [];
        setFigures(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Lỗi tải nhân vật:", err);
        setFigures([]);
      } finally {
        setLoadingFigures(false);
      }
    };

    const fetchTimeline = async () => {
      try {
        const res = await axios.get("/api/timeline?limit=4");
        const data = res.data.events || res.data || [];
        const safeData = Array.isArray(data) ? data : [];
        const sorted = safeData.sort(
          (a, b) => new Date(a.event_year) - new Date(b.event_year),
        );
        setTimelineEvents(sorted);
      } catch (err) {
        console.error("Lỗi tải mốc son:", err);
        setTimelineEvents([]);
      } finally {
        setLoadingTimeline(false);
      }
    };

    fetchFigures();
    fetchTimeline();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('/images/baotanglichsu.jpg')" }}
      >
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <div className="inline-block bg-black/40 backdrop-blur-md px-12 py-10 rounded-2xl shadow-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]"
            >
              {t("home.hero.title")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-xl md:text-3xl mb-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            >
              {t("home.hero.description")}
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/timeline"
                className="bg-primary text-white px-10 py-5 rounded-full font-bold hover:bg-primary-dark transition shadow-xl backdrop-blur-sm"
              >
                {t("home.buttons.timeline")}
              </Link>
              <Link
                to="/periods"
                className="bg-white/80 text-navy px-10 py-5 rounded-full font-bold hover:bg-white transition shadow-xl backdrop-blur-sm"
              >
                {t("home.buttons.periods")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-10">
            {t("home.intro.title")}
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {t("home.intro.description")}
          </p>
        </div>
      </section>
      <ArtifactSlider />
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-navy mb-16">
            {t("home.timeline.title")}
          </h2>

          {loadingTimeline ? (
            <p className="text-center text-2xl text-gray-600">{t("loading")}</p>
          ) : Array.isArray(timelineEvents) && timelineEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {timelineEvents.map((event, idx) => {
                const title =
                  lang === "en"
                    ? event.title_en || event.title_vi || "Event"
                    : event.title_vi || event.title || "Sự kiện";
                const desc =
                  lang === "en"
                    ? event.description_en || event.description_vi || ""
                    : event.description_vi || event.description || "";
                const year =
                  lang === "en"
                    ? event.year_display_en ||
                      new Date(event.event_year).getFullYear()
                    : event.year_display_vi ||
                      new Date(event.event_year).getFullYear();

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 cursor-pointer group"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "instant" });
                      navigate(`/event/${event.id}`);
                    }}
                  >
                    {event.image_url && (
                      <img
                        src={event.image_url}
                        alt={title}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="p-8">
                      <div className="text-3xl font-bold text-primary mb-3 group-hover:text-red-600 transition-colors">
                        {year}
                      </div>
                      <h3 className="text-2xl font-semibold text-navy mb-4 group-hover:text-red-600 transition-colors">
                        {title}
                      </h3>
                      <p className="text-gray-700 text-lg leading-relaxed group-hover:text-red-600 transition-colors line-clamp-3">
                        {desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-2xl text-gray-600">
              Chưa có mốc son lịch sử
            </p>
          )}

          <div className="text-center mt-16">
            <Link
              to="/timeline"
              onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
              className="inline-block !bg-[#c8102e] !text-white px-12 py-6 rounded-full font-bold text-lg hover:!bg-[#a00d25] transition shadow-2xl"
            >
              {t("home.timeline.view_all")}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-navy mb-16">
            {lang === "en"
              ? "Some great heroes of the nation"
              : "Một số vị anh hùng vĩ đại của dân tộc"}
          </h2>

          {loadingFigures ? (
            <p className="text-center text-2xl text-gray-600">{t("loading")}</p>
          ) : Array.isArray(figures) && figures.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {figures.map((figure, idx) => {
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
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 cursor-pointer group"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "instant" });
                      navigate(`/figure/${figure.id}`);
                    }}
                  >
                    {figure.image_url && (
                      <img
                        src={figure.image_url}
                        alt={name}
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-navy mb-3 group-hover:text-red-600 transition-colors">
                        {name}
                      </h3>
                      <p className="text-gray-700 text-lg group-hover:text-red-600 transition-colors">
                        {time}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-2xl text-gray-600">
              {lang === "en"
                ? "No historical figures available"
                : "Chưa có dữ liệu nhân vật"}
            </p>
          )}

          <div className="text-center mt-16">
            <Link
              to="/figures"
              onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
              className="inline-block !bg-[#c8102e] !text-white px-12 py-6 rounded-full font-bold text-lg hover:!bg-[#a00d25] transition shadow-2xl"
            >
              {lang === "en"
                ? "View all historical figures →"
                : "Xem tất cả nhân vật lịch sử →"}
            </Link>
          </div>
        </div>
      </section>
      <div className="mb-14">
        <VideoCarousel />
      </div>
    </div>
  );
}
